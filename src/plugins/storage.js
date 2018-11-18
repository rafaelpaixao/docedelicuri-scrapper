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
  exists({ path, filename = null }) {
    path = this.addRootToPath(path)
    if (filename != null) {
      path += filename
    }
    return fs.existsSync(path)
  },
  mkdir({ path }) {
    const exists = this.exists({ path })
    path = this.addRootToPath(path)
    return exists ? exists : fs.mkdirSync(path)
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
