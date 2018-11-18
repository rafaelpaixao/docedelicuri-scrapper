var assert = require('assert')
const Helpers = require('../src/helpers')
const MockOptions = require('./mock-options')

describe('Helpers', function() {
  describe('#convertToRef()', function() {
    it(`Create a new object with a single attribute that points to the given object`, function(done) {
      const newObj = Helpers.convertToRef({ obj: MockOptions.year })
      assert.deepEqual(newObj[MockOptions.year.value], MockOptions.year)
      done()
    })
  }),
    describe('#convertArrayToObj()', function() {
      it(`Convert all elements from array to attributes of a object`, function(done) {
        const testArray = [MockOptions.year, MockOptions.month]
        const expectedResult = {
          [MockOptions.year.value]: MockOptions.year,
          [MockOptions.month.value]: MockOptions.month
        }
        const result = Helpers.convertArrayToObj({
          array: testArray
        })
        assert.deepEqual(result, expectedResult)
        done()
      })
    }),
    describe('#getChildrenIfExists()', function() {
      it(`Get children of object`, function(done) {
        const testObj = {
          test: {
            test2: 'testing'
          }
        }

        const result1 = Helpers.getChildrenIfExists(testObj, 'test')
        assert.deepEqual(result1, testObj['test'])

        const result2 = Helpers.getChildrenIfExists(testObj, 'test123')
        assert.equal(result2, null)

        done()
      })
    }),
    describe('#convertToRef()', function() {
      it(`Create a new object with a single attribute that points to the given object`, function(done) {
        const newObj = Helpers.convertToRef({ obj: MockOptions.year })
        assert.deepEqual(newObj[MockOptions.year.value], MockOptions.year)
        done()
      })
    }),
    describe('#makePaymentKey()', function() {
      it(`Create a payment key`, function(done) {
        const paymentKey = Helpers.makePaymentKey({
          city: MockOptions.city,
          entity: MockOptions.entity,
          year: MockOptions.year,
          month: MockOptions.month
        })
        assert.equal(paymentKey, MockOptions.paymentKey)
        done()
      })
    }),
    describe('#removeWhiteSpace()', function() {
      it(`Remove all whitespaces from a string`, function(done) {
        const s = 'test 1    2   3'
        const newS = Helpers.removeWhiteSpace(s)
        assert.equal(newS, 'test123')
        done()
      })
    }),
    describe('#removeExtensionFromFilename()', function() {
      it(`Remove extension from a file name`, function(done) {
        const filename = 'test.html'
        const name = Helpers.removeExtensionFromFilename(filename)
        assert.equal(name, 'test')
        done()
      })
    })
})
