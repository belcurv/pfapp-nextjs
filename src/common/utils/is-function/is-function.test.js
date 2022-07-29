import isFunction from './is-function'

describe('isFunction()', () => {
  it('should return true for function declarations', () => {
    function fn () {}
    expect(isFunction(fn)).toBe(true)
  })

  it('should return true for function expressions', () => {
    const fn = function () {}
    expect(isFunction(fn)).toBe(true)
  })

  it('should return true for arrow functions', () => {
    const fn = () => {}
    expect(isFunction(fn)).toBe(true)
  })

  it('should return false for noon-functions', () => {
    expect(isFunction('fn')).toBe(false)
    expect(isFunction('0')).toBe(false)
    expect(isFunction('1')).toBe(false)
    expect(isFunction([1])).toBe(false)
    expect(isFunction({ not: 'fn' })).toBe(false)
    expect(isFunction()).toBe(false)
    expect(isFunction(null)).toBe(false)
  })
})
