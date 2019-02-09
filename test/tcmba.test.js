var assert = require('assert')
const FormOptions = require('../src/tcmba/form-options/api')
const Entities = require('../src/tcmba/entities/api')
const Payments = require('../src/tcmba/payments/api')
const MockOptions = require('./mock-options')

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
      ;(async () => {
        let result = await Entities.get({ cityKey: MockOptions.city.value })
        assert.equal(result.length, 9)
        done()
      })().catch(error => done(error))
    })
  })
})

describe('Payments', function() {
  describe('#api.getRaw()', function() {
    it('Get content of payments page for a combination of city, entity, year and month', function(done) {
      ;(async () => {
        let result = await Payments.getRaw({
          city: MockOptions.city,
          entity: MockOptions.entity,
          year: MockOptions.year,
          month: MockOptions.month
        })
        assert.ok(result.length > 0)
        done()
      })().catch(error => done(error))
    })
  })
})
