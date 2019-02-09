const Slug = require('slug')

const _makeSlug = function(value) {
  return Slug(value, { lower: true, replacement: '_' })
}

const _salaryToInt = function(s) {
  return parseInt(
    parseFloat(s)
      .toFixed(2)
      .replace('.', '')
  )
}

const _sumTwoSalaries = function(s1, s2) {
  let sum = '' + (_salaryToInt(s1) + _salaryToInt(s2))
  return parseFloat(
    sum.substr(0, sum.length - 2) + '.' + sum.substr(sum.length - 2)
  )
}

const baseComposition = function() {
  return {
    base: 0.0,
    total: 0.0,
    count: 0
  }
}

const expandedComposition = function() {
  let c = baseComposition()
  c.bonus = 0.0
  c.benefits = 0.0
  return c
}

const getElementKey = function({ text, ref, atr, expanded = false }) {
  const elementKey = text === '' ? _makeSlug('Não informado') : _makeSlug(text)
  if (ref[atr][elementKey] === undefined) {
    ref[atr][elementKey] = {
      text,
      composition: expanded ? expandedComposition() : baseComposition()
    }
  }
  return elementKey
}

const makeMonthlyReportForTable6 = function({ payments }) {
  let ma = {
    salariesTotal: baseComposition(),
    salariesByType: {},
    salariesByPosition: {}
  }

  payments.forEach(entry => {
    // Entry
    const base = entry.salaryBase

    // Salary Total
    ma.salariesTotal.base = _sumTwoSalaries(ma.salariesTotal.base, base)
    ma.salariesTotal.total = ma.salariesTotal.base
    ma.salariesTotal.count++

    // Salary By Type
    const entryTypeKey = getElementKey({
      text: entry.type,
      ref: ma,
      atr: 'salariesByType'
    })
    ma.salariesByType[entryTypeKey].composition.base = _sumTwoSalaries(
      ma.salariesByType[entryTypeKey].composition.base,
      base
    )
    ma.salariesByType[entryTypeKey].composition.total =
      ma.salariesByType[entryTypeKey].composition.base
    ma.salariesByType[entryTypeKey].composition.count++

    // Salary By Position
    const entryPositionKey = getElementKey({
      text: entry.position,
      ref: ma,
      atr: 'salariesByPosition'
    })
    ma.salariesByPosition[entryPositionKey].composition.base = _sumTwoSalaries(
      ma.salariesByPosition[entryPositionKey].composition.base,
      base
    )
    ma.salariesByPosition[entryPositionKey].composition.total =
      ma.salariesByPosition[entryPositionKey].composition.base
    ma.salariesByPosition[entryPositionKey].composition.count++
  })

  return ma
}

const makeMonthlyReportForTable9 = function({ payments }) {
  let ma = {
    salariesTotal: expandedComposition(),
    salariesByType: {},
    salariesByPosition: {}
  }

  payments.forEach(entry => {
    // Entry
    const base = entry.salaryBase
    const benefits = entry.salaryBenefits
    const bonus = entry.salaryBonus

    // Salary Total
    ma.salariesTotal.base = _sumTwoSalaries(ma.salariesTotal.base, base)
    ma.salariesTotal.benefits = _sumTwoSalaries(
      ma.salariesTotal.benefits,
      benefits
    )
    ma.salariesTotal.bonus = _sumTwoSalaries(ma.salariesTotal.bonus, bonus)
    ma.salariesTotal.total = _sumTwoSalaries(
      ma.salariesTotal.total,
      _sumTwoSalaries(base, _sumTwoSalaries(benefits, bonus))
    )

    ma.salariesTotal.count++

    // Salary By Type
    const entryTypeKey = getElementKey({
      text: entry.type,
      ref: ma,
      atr: 'salariesByType',
      expanded: true
    })
    ma.salariesByType[entryTypeKey].composition.base = _sumTwoSalaries(
      ma.salariesByType[entryTypeKey].composition.base,
      base
    )
    ma.salariesByType[entryTypeKey].composition.benefits = _sumTwoSalaries(
      ma.salariesByType[entryTypeKey].composition.benefits,
      benefits
    )
    ma.salariesByType[entryTypeKey].composition.bonus = _sumTwoSalaries(
      ma.salariesByType[entryTypeKey].composition.bonus,
      bonus
    )
    ma.salariesByType[entryTypeKey].composition.total = _sumTwoSalaries(
      ma.salariesByType[entryTypeKey].composition.total,
      _sumTwoSalaries(base, _sumTwoSalaries(benefits, bonus))
    )
    ma.salariesByType[entryTypeKey].composition.count++

    // Salary By Position
    const entryPositionKey = getElementKey({
      text: entry.position,
      ref: ma,
      atr: 'salariesByPosition',
      expanded: true
    })
    ma.salariesByPosition[entryPositionKey].composition.base = _sumTwoSalaries(
      ma.salariesByPosition[entryPositionKey].composition.base,
      base
    )
    ma.salariesByPosition[
      entryPositionKey
    ].composition.benefits = _sumTwoSalaries(
      ma.salariesByPosition[entryPositionKey].composition.benefits,
      benefits
    )
    ma.salariesByPosition[entryPositionKey].composition.bonus = _sumTwoSalaries(
      ma.salariesByPosition[entryPositionKey].composition.bonus,
      bonus
    )
    ma.salariesByPosition[entryPositionKey].composition.total = _sumTwoSalaries(
      ma.salariesByPosition[entryPositionKey].composition.total,
      _sumTwoSalaries(base, _sumTwoSalaries(benefits, bonus))
    )
    ma.salariesByPosition[entryPositionKey].composition.count++
  })

  return ma
}

module.exports = {
  makeMonthlyReportForTable6,
  makeMonthlyReportForTable9
}
