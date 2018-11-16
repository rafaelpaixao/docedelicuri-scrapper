const admin = require('firebase-admin')
const serviceAccount = require('../../firebase-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
})

const db = admin.database()

module.exports = {
  get({ path }) {
    return new Promise((resolve, reject) => {
      const ref = db.ref(path)
      ref.on(
        'value',
        function(snapshot) {
          resolve(snapshot.val())
        },
        function(error) {
          reject(error)
        }
      )
    })
  },
  set({ path, data }) {
    return new Promise((resolve, reject) => {
      const ref = db.ref(path)
      ref.set(data, function(error) {
        error ? reject(error) : resolve()
      })
    })
  },
  update({ path, data }) {
    return new Promise((resolve, reject) => {
      const ref = db.ref(path)
      ref.update(data, function(error) {
        error ? reject(error) : resolve()
      })
    })
  }
}
