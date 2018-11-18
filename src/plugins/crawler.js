const cheerio = require('cheerio')

class Crawler {
  constructor({ raw }) {
    this.$ = cheerio.load(raw)
  }
  extractContent({ selector }) {
    return this.$(selector).html()
  }
  extractSelectOptions({ selector }) {
    let $ = this.$
    let items = []
    const name = $(selector).attr('name')
    $(selector)
      .children()
      .each(function() {
        if ($(this).val().length > 0) {
          items.push({
            name: name,
            text: $(this).text(),
            value: $(this).val()
          })
        }
      })
    return items
  }
  howMany({ selector }) {
    return this.$(selector).length
  }
}

module.exports = Crawler
