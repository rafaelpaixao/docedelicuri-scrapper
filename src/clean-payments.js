require('./main')
const log = require('node-pretty-log')
const Firebase = require('./plugins/firebase')
const Cleaner = require('./payments/cleaner')
const MODELS = require('./payments/models')
const Helpers = require('./helpers')
const Queue = require('./plugins/queue')

Firebase.get({ path: 'payments_meta' })
  .then(paymentsMeta => {
    log('success', 'Got payments meta from Firebase')
    Object.entries(paymentsMeta).forEach(([key, element]) => {
      if (
        element.model === MODELS.TABLE_6 ||
        element.model === MODELS.TABLE_9
      ) {
        Queue.add(function() {
          log('info', 'Cleaning... ' + key)
          const cleanedPayments = Cleaner.cleanPayments({
            filename: key + '.html',
            model: element.model
          })
          log('info', 'Sending to Firebase... ')
          const path = 'payments/' + Helpers.convertKeyToPath(key) + '/'
          return Firebase.set({
            path,
            data: cleanedPayments
          })
            .then(() =>
              log('success', 'Sended to Firebase, cleaned payments... ' + key)
            )
            .catch(error => log('error', error))
        })
      }
    })
  })
  .catch(error => log('error', error))
