module.exports = {
  convertToRef({ obj, key = 'value' }) {
    return { [this.removeWhiteSpace(obj[key])]: obj }
  },
  convertArrayToObj({ array, key = 'value' }) {
    newObj = {}
    array.forEach(element => {
      newObj[this.removeWhiteSpace(element[key])] = element
    })
    return newObj
  },
  removeWhiteSpace(value) {
    return value.replace(/ /g, '')
  }
}
