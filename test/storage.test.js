var assert = require('assert')
const fs = require('fs')

require('../src/main')
const Storage = require('../src/plugins/storage')

describe('Storage', function() {
  describe('#addRootToPath()', function() {
    it(`Add root folder to a path named test`, function(done) {
      try {
        const newPath = Storage.addRootToPath('test')
        assert.equal(newPath, 'storage/test/')
        done()
      } catch (error) {
        done(error)
      }
    })
  }),
    describe('#mkdir()', function() {
      it(`Create a dir called "test" if it doesn't exists `, function(done) {
        try {
          Storage.mkdir({ path: 'test' })
          done()
        } catch (error) {
          done(error)
        }
      })
    }),
    describe('#write()', function() {
      it('Create a file called "mytest"', function(done) {
        try {
          Storage.write({
            filename: 'mytest',
            data: 'testing',
            path: 'test'
          })
          done()
        } catch (error) {
          done(error)
        }
      })
    }),
    describe('#listFromDir()', function() {
      it('Read list of files in folder "test"', function(done) {
        try {
          const files = Storage.listFromDir({
            path: 'test'
          })
          assert.deepEqual(files, ['mytest'])
          done()
        } catch (error) {
          done(error)
        }
      })
    }),
    describe('#read()', function() {
      it('Read file "mytest" in folder "test"', function(done) {
        try {
          const content = Storage.read({
            path: 'test',
            filename: 'mytest'
          })
          assert.equal(content, 'testing')
          done()
        } catch (error) {
          done(error)
        }
      })
    }),
    after(function() {
      const path = Storage.addRootToPath('test')
      fs.unlinkSync(path + 'mytest')
      fs.rmdirSync(path)
    })
})
