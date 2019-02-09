/*
  Extract payment data and save to local disk
*/

require('./main')
const log = require('node-pretty-log')
const Firebase = require('./plugins/firebase')
const LocalStorage = require('./plugins/storage')
const Queue = require('./plugins/queue')
const Payments = require('./tcmba/payments/api')
const Helpers = require('./helpers')

const paymentPath = process.env.PATH_PAYMENTS_RAW

LocalStorage.mkdir({ path: paymentPath })

const getPaymentRawContent = function({ city, entity, year, month }) {
  const filename =
    Helpers.makePaymentKey({
      city,
      entity,
      year,
      month
    }) + '.html'

  if (LocalStorage.exists({ path: paymentPath, filename: filename })) {
    log('info', 'Already exists ' + filename)
  } else {
    Queue.add(function() {
      return Payments.getRaw({ city, entity, year, month })
        .then(rawContent => {
          log('success', 'Got payment raw content')
          LocalStorage.write({
            filename,
            data: rawContent,
            path: paymentPath
          })
          log('success', 'Wrote payment raw content to ' + filename)
        })
        .catch(error => log('error', error))
    })
  }
}

const getForManyYears = function({ city, entity, year, months }) {
  Object.entries(months).forEach(([monthKey, month]) => {
    getPaymentRawContent({ city, entity, year, month })
  })
}

const getForEntity = function({ city, entity, years, months }) {
  Object.entries(years).forEach(([yearKey, year]) => {
    getForManyYears({
      city,
      entity,
      year,
      months
    })
  })
}

const getForManyEntities = function({ city, entities, years, months }) {
  Object.entries(entities).forEach(([entityKey, entity]) => {
    getForEntity({
      city,
      entity,
      years,
      months
    })
  })
}

// Main
Firebase.get({ path: 'options' })
  .then(options => {
    log('success', 'Got options from Firebase')
    if (process.argv[2] != undefined) {
      const cityKey = process.argv[2]
      log('info', 'Extracting payments of city ' + options.cities[cityKey].text)
      getForManyEntities({
        city: options.cities[cityKey],
        entities: options.entities[cityKey],
        years: options.years,
        months: options.months
      })
    } else {
      log('info', 'Extracting payments of all cities')
      Object.entries(options.cities).forEach(([cityKey, city]) => {
        getForManyEntities({
          city,
          entities: options.entities[cityKey],
          years: options.years,
          months: options.months
        })
      })
    }
  })
  .catch(error => log('error', error))
