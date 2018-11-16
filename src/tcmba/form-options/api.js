const axios = require('axios')
const CONSTANTS = require('../constants')
const FormCrawler = require('./crawler')

module.exports = {
  get() {
    return new Promise((resolve, reject) => {
      axios
        .get(CONSTANTS.URLS.SALARIES)
        .then(response => {
          const crawler = new FormCrawler({ raw: response.data })
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
