require('../main')
const LocalStorage = require('../plugins/storage')
const Crawler = require('../plugins/crawler')
const CONSTANTS = require('../tcmba/constants')
const MODELS = require('./models')

const _getFileContent = function({ filename }) {
  return LocalStorage.read({ filename, path: process.env.PATH_PAYMENTS_RAW })
}

const _convertMoneyStringToFloat = function(moneyString) {
  moneyString = moneyString.replace('R$', '')
  moneyString = moneyString.replace(/ /g, '')
  moneyString = moneyString.replace('.', '')
  moneyString = moneyString.replace(',', '.')
  return parseFloat(moneyString)
}

const _convertHoursStringToInt = function(hoursString) {
  hoursString = hoursString.replace('h', '').replace(/ /g, '')
  return hoursString.length > 0 ? parseInt(hoursString) : ''
}

const _fixCase = function(phrase) {
  const words = phrase.split(' ')
  let result = []
  words.forEach(word => {
    word = word.toLowerCase()
    word = word.charAt(0).toUpperCase() + word.substr(1)
    result.push(word)
  })
  return result.join(' ')
}

const _isInteger = function(value) {
  return /^\d+$/.test(value)
}

const _cleanValue = function(value) {
  if (value === undefined) {
    return null
  } else if (value.includes('R$')) {
    return _convertMoneyStringToFloat(value)
  } else if (value.length < 5 && value.endsWith('h')) {
    return _convertHoursStringToInt(value)
  } else if (_isInteger(value)) {
    return parseInt(value.replace(/ /g, ''))
  } else {
    return _fixCase(value)
  }
}

const _makeBaseTable = function(row, rowIndex) {
  return {
    rowIndex: rowIndex,
    name: _cleanValue(row[0]),
    registration: _cleanValue(row[1]),
    type: _cleanValue(row[2]),
    position: _cleanValue(row[3]),
    salaryBase: _cleanValue(row[4])
  }
}

const _makeTable6 = function(row, rowIndex) {
  let obj = _makeBaseTable(row, rowIndex)
  obj.hours = _cleanValue(row[5])
  return obj
}

const _makeTable9 = function(row, rowIndex) {
  let obj = _makeBaseTable(row, rowIndex)
  obj.salaryBenefits = _cleanValue(row[5])
  obj.salaryBonus = _cleanValue(row[6])
  obj.salary13 = _cleanValue(row[7])
  obj.hours = _cleanValue(row[8])
  return obj
}

const cleanPayments = function({ filename, model }) {
  const cleanedPayments = {}
  const raw = _getFileContent({ filename })
  const crawler = new Crawler({ raw })
  const rows = crawler.extractTableRows({
    selector: CONSTANTS.SELECTORS.SALARIES_TABLE
  })

  rows.forEach((row, rowIndex) => {
    cleanedRow =
      model === MODELS.TABLE_6
        ? _makeTable6(row, rowIndex)
        : model === MODELS.TABLE_9
        ? _makeTable9(row, rowIndex)
        : null
    cleanedPayments[rowIndex] = cleanedRow
  })

  return cleanedPayments
}

module.exports = {
  cleanPayments
}
