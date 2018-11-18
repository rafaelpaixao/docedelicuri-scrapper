require('./main')
const log = require('node-pretty-log')
const Firebase = require('./plugins/firebase')
const MODELS = require('./payments/models')
const Helpers = require('./helpers')
const Queue = require('./plugins/queue')
const Report = require('./payments/report')

// Main
Firebase.get({ path: 'payments_meta' })
  .then(paymentsMeta => {
    log('success', 'Got payments meta from Firebase')
    Object.entries(paymentsMeta).forEach(([metaKey, meta]) => {
      if (meta.model === MODELS.TABLE_6 || meta.model === MODELS.TABLE_9) {
        const path = 'payments/' + Helpers.convertKeyToPath(metaKey)
        Queue.add(function() {
          return Firebase.get({ path })
            .then(payments => {
              log('success', 'Got from Firebase, payment ' + metaKey)
              const report =
                meta.model === MODELS.TABLE_6
                  ? Report.makeMonthlyReportForTable6({ payments })
                  : meta.model === MODELS.TABLE_9
                  ? Report.makeMonthlyReportForTable9({ payments })
                  : null
              const reportPath =
                'payments_reports_month/' +
                Helpers.convertKeyToPath(metaKey) +
                '/'
              Firebase.set({
                path: reportPath,
                data: report
              })
                .then(() =>
                  log('success', 'Sended to Firebase, report... ' + metaKey)
                )
                .catch(error => log('error', error))
            })
            .catch(error => log('error', error))
        })
      }
    })
  })
  .catch(error => log('error', error))
