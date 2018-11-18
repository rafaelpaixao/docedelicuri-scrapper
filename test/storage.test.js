var assert = require('assert')
const fs = require('fs')

require('../src/main')
const Storage = require('../src/plugins/storage')
const testPath = 'test'
const testFile = 'mytest'
const testContent = 'testing'

describe('Storage', function() {
  describe('#addRootToPath()', function() {
    it(`Add root folder to a path named test`, function(done) {
      try {
        const newPath = Storage.addRootToPath(testPath)
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
          Storage.mkdir({ path: testPath })
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
            filename: testFile,
            data: testContent,
            path: testPath
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
            path: testPath
          })
          assert.deepEqual(files, [testFile])
          done()
        } catch (error) {
          done(error)
        }
      })
    }),
    describe('#exists()', function() {
      it('Test if file "mytest" exists in folder "test"', function(done) {
        try {
          const exists = Storage.exists({
            path: testPath,
            filename: testFile
          })
          assert.equal(exists, true)
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
            path: testPath,
            filename: testFile
          })
          assert.equal(content, testContent)
          done()
        } catch (error) {
          done(error)
        }
      })
    }),
    after(function() {
      const path = Storage.addRootToPath(testPath)
      fs.unlinkSync(path + testFile)
      fs.rmdirSync(path)
    })
})
