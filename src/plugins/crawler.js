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
  extractTableRows({ selector }) {
    selector += ' tbody tr'
    let rows = []
    const $ = this.$
    $(selector).each(function() {
      let cells = []
      $(this)
        .find('td')
        .each(function() {
          cells.push($(this).text())
        })
      rows.push(cells)
    })
    return rows
  }
  howMany({ selector }) {
    return this.$(selector).length
  }
}

module.exports = Crawler
