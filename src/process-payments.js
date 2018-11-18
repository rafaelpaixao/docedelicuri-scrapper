require('./main')
const log = require('node-pretty-log')
const Validator = require('./payments/validator')
const Firebase = require('./plugins/firebase')
const Cleaner = require('./payments/cleaner')
const MODELS = require('./payments/models')
const Helpers = require('./helpers')
const Queue = require('./plugins/queue')

const paymentsMeta = Validator.getPaymentsMeta()

Firebase.update({ path: 'payments_meta', data: paymentsMeta })
  .then(() => log('success', 'Sended payments meta to Firebase'))
  .catch(error => log('error', error))

Object.entries(paymentsMeta).forEach(([key, element]) => {
  if (
    element.model != MODELS.UNKNOWN &&
    element.model != MODELS.DATA_NOT_INFORMED
  ) {
    log('info', 'Cleaning... ' + key)
    cleanedPayments = Cleaner.cleanPayments({
      filename: key + '.html',
      model: element.model
    })
    const path = 'payments/' + Helpers.convertKeyToPath(key) + '/'
    Queue.add(function() {
      log('info', 'Sending to Firebase... ')
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
log('success', 'Cleanse completed!')
