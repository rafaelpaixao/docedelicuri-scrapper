var assert = require('assert')
const FormOptions = require('../src/tcmba/form-options/api')

describe('Form Options', function() {
  describe('#get()', function() {
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
