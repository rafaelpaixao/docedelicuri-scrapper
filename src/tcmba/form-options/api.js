const request = require('request-promise')
const Crawler = require('../../plugins/crawler')
const CONSTANTS = require('../constants')

module.exports = {
  get() {
    return new Promise((resolve, reject) => {
      request(CONSTANTS.URLS.SALARIES)
        .then(response => {
          const crawler = new Crawler({ raw: response })
          resolve({
            cities: crawler.extractSelectOptions({
              selector: CONSTANTS.SELECTORS.CITIES
            }),
            months: crawler.extractSelectOptions({
              selector: CONSTANTS.SELECTORS.MONTHS
            }),
            years: crawler.extractSelectOptions({
              selector: CONSTANTS.SELECTORS.YEARS
            })
          })
        })
        .catch(error => reject(error))
    })
  }
}
