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

var a = '100.05'

var b = '200.65'

console.log(_sumTwoSalaries(a, b))
