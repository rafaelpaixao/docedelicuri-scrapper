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
  makePaymentKey({ city, entity, year, month }) {
    return (
      this.removeWhiteSpace(city.value) +
      '_' +
      entity.value +
      '_' +
      year.value +
      '_' +
      month.value
    )
  },
  removeWhiteSpace(value) {
    return value.replace(/ /g, '')
  }
}
