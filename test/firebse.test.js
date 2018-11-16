var assert = require('assert')
require('../src/main')
const Firebase = require('../src/plugins/firebase')

describe('Firebase', function() {
  describe('#set()', function() {
    it('Set key "test" with value "testing"', function(done) {
      ;(async () => {
        await Firebase.set({ path: 'test/testing', data: 'just testing' })
        done()
      })().catch(error => done(error))
    })
  }),
    describe('#get()', function() {
      it('Get value of key "test" and it should be "testing"', function(done) {
        ;(async () => {
          let result = await Firebase.get({ path: 'test/testing' })
          assert.equal(result, 'just testing')
          done()
        })().catch(error => done(error))
      })
    }),
    describe('#update()', function() {
      it('Update key "test" with value "still testing"', function(done) {
        ;(async () => {
          await Firebase.update({
            path: 'test',
            data: { testing: 'still testing' }
          })
          done()
        })().catch(error => done(error))
      })
    }),
    describe('#clear()', function() {
      it('Set key "test" with value null', function(done) {
        ;(async () => {
          await Firebase.set({ path: 'test', data: null })
          done()
        })().catch(error => done(error))
      })
    })
})
