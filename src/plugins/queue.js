const PromiseQueue = require('promise-queue')

var maxConcurrent = 2
var maxQueue = Infinity
var queue = new PromiseQueue(maxConcurrent, maxQueue)

module.exports = queue
