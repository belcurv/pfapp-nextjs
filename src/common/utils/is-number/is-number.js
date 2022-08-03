
function isNumber (value) {
  if (value == null) return false
  if (typeof value === 'string') return /[0-9]+/.test(value)
  if (typeof value === 'number') return !Number.isNaN(value)
  return false
}

export default isNumber
