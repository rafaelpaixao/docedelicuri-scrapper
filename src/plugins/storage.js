const fs = require('fs')

const root = 'storage/'

module.exports = {
  addRootToPath(path) {
    if (path != undefined) {
      if (!path.endsWith('/')) {
        path += '/'
      }
      if (path.startsWith('/')) {
        path = path.substr(1)
      }
    } else {
      path = ''
    }
    return root + path
  },
  mkdir({ path }) {
    path = this.addRootToPath(path)
    if (!fs.existsSync(path)) {
      return fs.mkdirSync(path)
    }
    return fs.existsSync(path)
  },
  listFromDir({ path }) {
    path = this.addRootToPath(path)
    return fs.readdirSync(path)
  },
  read({ filename, path = '' }) {
    path = this.addRootToPath(path)
    return fs.readFileSync(path + filename, 'utf8')
  },
  write({ filename, data, path }) {
    path = this.addRootToPath(path)
    fs.writeFileSync(path + filename, data)
  }
}
