import isNumber from './is-number'

describe('isNumber()', () => {
  it('should return true for numbers', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(-1)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber('0')).toBe(true)
    expect(isNumber('1')).toBe(true)
    expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true)
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true)
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(true)
  })

  it('should return false for non-numbers', () => {
    expect(isNumber('nope')).toBe(false)
    expect(isNumber([1])).toBe(false)
    expect(isNumber({ not: 'number' })).toBe(false)
    expect(isNumber()).toBe(false)
    expect(isNumber(null)).toBe(false)
  })
})
