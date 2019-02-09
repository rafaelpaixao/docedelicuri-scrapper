require('./main')
const log = require('node-pretty-log')
const Validator = require('./payments/validator')
const Firebase = require('./plugins/firebase')

const paymentsMeta = Validator.getPaymentsMeta()

Firebase.update({ path: 'payments_meta', data: paymentsMeta })
  .then(() => log('success', 'Sended payments meta to Firebase'))
  .catch(error => log('error', error))
