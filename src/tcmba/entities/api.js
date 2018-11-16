const request = require('request-promise')
const CONSTANTS = require('../constants')

const convertResponse = function({ entitiesFromResponse }) {
  let entities = []
  entitiesFromResponse.forEach(item => {
    entities.push({
      name: CONSTANTS.FORM.ENTITY_FIELD_NAME,
      text: item[CONSTANTS.ENTITIES_RESPONSE.KEY_FOR_TEXT],
      value: item[CONSTANTS.ENTITIES_RESPONSE.KEY_FOR_VALUE]
    })
  })
  return entities
}

module.exports = {
  get({ cityKey }) {
    return new Promise((resolve, reject) => {
      request({ uri: CONSTANTS.URLS.ENTITIES + cityKey, json: true })
        .then(response => {
          resolve(convertResponse({ entitiesFromResponse: response }))
        })
        .catch(error => reject(error))
    })
  }
}
