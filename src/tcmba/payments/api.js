const request = require('request-promise')
const CONSTANTS = require('../constants')
const Crawler = require('../../plugins/crawler')

module.exports = {
  getRaw({ city, entity, year, month }) {
    return new Promise((resolve, reject) => {
      const formData = {
        [city.name]: city.value,
        [entity.name]: entity.value,
        [year.name]: year.value,
        [month.name]: month.value,
        txtEntidade: entity.text,
        tipoRegime: '',
        pesquisar: 'Pesquisar'
      }
      request({
        uri: CONSTANTS.URLS.SALARIES,
        method: 'POST',
        formData
      })
        .then(response => {
          let crawler = new Crawler({ raw: response })
          resolve(
            crawler.extractContent({
              selector: CONSTANTS.SELECTORS.SALARIES_CONTENT
            })
          )
        })
        .catch(error => reject(error))
    })
  }
}
