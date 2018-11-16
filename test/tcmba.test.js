var assert = require('assert')
const FormOptions = require('../src/tcmba/form-options/api')
const Entities = require('../src/tcmba/entities/api')

describe('Form Options', function() {
  describe('#api.get()', function() {
    it('Get options from static form in payments page of TCM-BA', function(done) {
      ;(async () => {
        let result = await FormOptions.get()
        assert.equal(result.cities.length, 417)
        assert.equal(result.months.length, 12)
        assert.equal(result.years.length, 19)
        done()
      })().catch(error => done(error))
    })
  })
})

describe('Entities', function() {
  describe('#api.get()', function() {
    it('Get all entities from a given city', function(done) {
      const cityKey = '2910800' //Feira de Santana
      ;(async () => {
        let result = await Entities.get({ cityKey })
        assert.equal(result.length, 9)
        done()
      })().catch(error => done(error))
    })
  })
})
