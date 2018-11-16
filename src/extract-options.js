require('./main')
const log = require('node-pretty-log')
const Firebase = require('./plugins/firebase')
const Queue = require('./plugins/queue')
const FormOptions = require('./tcmba/form-options/api')
const Entities = require('./tcmba/entities/api')
const Helpers = require('./helpers')

FormOptions.get().then(options => {
  log('success', 'Got form options')
  Firebase.update({
    path: 'options',
    data: {
      cities: Helpers.convertArrayToObj({ array: options.cities }),
      years: Helpers.convertArrayToObj({ array: options.years }),
      months: Helpers.convertArrayToObj({ array: options.months })
    }
  })
    .then(() => log('success', 'Sended form options to Firebase'))
    .catch(error => log('error', error))
  options.cities.forEach(city => {
    Queue.add(function() {
      return Entities.get({ cityKey: city.value })
        .then(entities => {
          log('success', 'Got entities of city ' + city.text)
          Firebase.update({
            path: 'options/entities',
            data: {
              [Helpers.removeWhiteSpace(city.value)]: Helpers.convertArrayToObj(
                { array: entities }
              )
            }
          })
            .then(() =>
              log(
                'success',
                'Sended to Firebase, entities of city ' + city.text
              )
            )
            .catch(error => log('error', error))
        })
        .catch(error => log('error', error))
    })
  })
})
