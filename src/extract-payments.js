require('./main')
const log = require('node-pretty-log')
const Firebase = require('./plugins/firebase')
const LocalStorage = require('./plugins/storage')
const Queue = require('./plugins/queue')
const Payments = require('./tcmba/payments/api')
const Helpers = require('./helpers')

LocalStorage.mkdir({ path: 'raw_payments_content' })

const getPaymentRawContent = function({ city, entity, year, month }) {
  Queue.add(function() {
    return Payments.getRaw({ city, entity, year, month })
      .then(rawContent => {
        log('success', 'Got payment raw content')
        const paymentKey = Helpers.makePaymentKey({
          city,
          entity,
          year,
          month
        })
        Firebase.update({
          path: 'raw_payments_content',
          data: { [paymentKey]: rawContent }
        })
          .then(() => {
            log(
              'success',
              'Sended to firebase, payment content of ' + paymentKey
            )
            Firebase.update({
              path: 'payments_meta',
              data: {
                [paymentKey]: { hasContent: true }
              }
            })
              .then(() => {
                log(
                  'success',
                  'Sended to firebase, payment meta of ' + paymentKey
                )
                LocalStorage.write({
                  filename: paymentKey + '.html',
                  data: rawContent,
                  path: 'raw_payments_content'
                })
              })
              .catch(error => log('error', error))
          })
          .catch(error => log('error', error))
      })
      .catch(error => log('error', error))
  })
}

const getForManyYears = function({ city, entity, year, months }) {
  Object.entries(months).forEach(([monthKey, month]) => {
    getPaymentRawContent({ city, entity, year, month })
  })
}

const getForEntity = function({ city, entity, years, months }) {
  Object.entries(years).forEach(([yearKey, year]) => {
    getForManyYears({ city, entity, year, months })
  })
}

const getForManyEntities = function({ city, entities, years, months }) {
  Object.entries(entities).forEach(([entityKey, entity]) => {
    getForEntity({ city, entity, years, months })
  })
}

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
