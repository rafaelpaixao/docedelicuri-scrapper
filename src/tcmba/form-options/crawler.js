const cheerio = require('cheerio')

class FormCrawler {
  constructor({ raw }) {
    this.$ = cheerio.load(raw)
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
}

module.exports = FormCrawler
