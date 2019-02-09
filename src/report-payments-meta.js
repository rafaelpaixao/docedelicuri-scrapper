require('./main')
const log = require('node-pretty-log')
const Firebase = require('./plugins/firebase')

let total = {}
let entities = {}
const columns = ['DATA_NOT_INFORMED', 'UNKNOWN', 'TABLE_6', 'TABLE_9']

Firebase.get({ path: 'payments_meta' })
  .then(paymentsMeta => {
    log('success', 'Got payments meta from Firebase')
    Object.entries(paymentsMeta).forEach(([key, element]) => {
      if (total[element.model] === undefined) {
        total[element.model] = 0
      }
      total[element.model]++

      const ent = key.split('_')[1]
      if (entities[ent] === undefined) {
        entities[ent] = {}
      }
      if (entities[ent][element.model] === undefined) {
        entities[ent][element.model] = 0
      }
      entities[ent][element.model]++
    })
    console.log('TOTAL')
    Object.entries(total).forEach(([key, element]) => {
      console.log(key + ' - ' + element)
    })
    console.log('---------')

    let header = ''
    columns.forEach(c => {
      header += c + ';'
    })
    console.log(header)
    Object.entries(entities).forEach(([entId, ent]) => {
      let l = entId + ';'
      columns.forEach(c => {
        if (ent[c] === undefined) {
          l += '0;'
        } else {
          l += ent[c] + ';'
        }
      })
      console.log(l)
    })
  })
  .catch(error => log('error', error))
