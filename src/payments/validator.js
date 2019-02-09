require('../main')
const log = require('node-pretty-log')
const LocalStorage = require('../plugins/storage')
const Crawler = require('../plugins/crawler')
const CONSTANTS = require('../tcmba/constants')
const MODELS = require('./models')
const Helpers = require('../helpers')

const paymentPath = process.env.PATH_PAYMENTS_RAW

const _identifyPaymentModel = function({ filename, path }) {
  const raw = LocalStorage.read({ filename, path })
  const crawler = new Crawler({ raw })
  const selectorTable = CONSTANTS.SELECTORS.SALARIES_TABLE
  const selectorAlert = CONSTANTS.SELECTORS.SALARIES_ALERT

  const hasTable = crawler.howMany({ selector: selectorTable }) > 0

  if (hasTable) {
    const columns = crawler.howMany({
      selector: selectorTable + ' thead tr th'
    })
    switch (columns) {
      case 6:
        return MODELS.TABLE_6
      case 9:
        return MODELS.TABLE_9
      default:
    }
  } else {
    const hasAlert = crawler.howMany({ selector: selectorAlert }) > 0
    if (hasAlert) {
      const alertContent = crawler.extractContent({ selector: selectorAlert })
      if (alertContent === CONSTANTS.ALERTS_CONTENT.DATA_NOT_INFORMED) {
        return MODELS.DATA_NOT_INFORMED
      }
    }
  }

  return MODELS.UNKNOWN
}

const _getModifiedDateISO = function({ filename, path }) {
  const stats = LocalStorage.stats({ filename, path })
  return stats.mtime.toISOString()
}

const getPaymentsMeta = function() {
  log('info', 'Starting validation...')

  let paymentsMeta = {}
  const listOfFiles = LocalStorage.listFromDir({ path: paymentPath })

  listOfFiles.forEach(filename => {
    log('info', 'Validating... ' + filename)
    const key = Helpers.removeExtensionFromFilename(filename)
    paymentsMeta[key] = {
      model: _identifyPaymentModel({ filename, path: paymentPath }),
      modified_date: _getModifiedDateISO({ filename, path: paymentPath })
    }
  })

  log('success', 'Validation completed!')
  return paymentsMeta
}

module.exports = {
  getPaymentsMeta
}
