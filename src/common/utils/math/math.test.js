import {
  useMathUtils,
  formatAsCurrency,
  formatAsPercentage,
  calculateRequiredSavings,
  calculateAge,
  calcualteFutureValue,
  calculateRequiredRate
} from './math'

describe('math utilities', () => {
  describe('useMathUtils hook', () => {
    it('should return an object of specific functions', () => {
      const actual = useMathUtils()
      expect(actual).toEqual({
        calculateRequiredSavings: expect.any(Function),
        calculateAge: expect.any(Function),
        calcualteFutureValue: expect.any(Function),
        calculateRequiredRate: expect.any(Function),
        formatAsCurrency: expect.any(Function),
        formatAsPercentage: expect.any(Function)
      })
    })
  })

  describe('formatAsCurrency', () => {
    it('should format number inputs as USD with 2 decimals', () => {
      const actual = formatAsCurrency(20)
      expect(actual).toBe('$20.00')
    })

    it('should format string inputs as USD with 2 decimals', () => {
      const actual = formatAsCurrency('20')
      expect(actual).toBe('$20.00')
    })
  })

  describe('formatAsPercentage', () => {
    it('should format number inputs as percentage with 3 decimals', () => {
      const actual = formatAsPercentage(0.05)
      expect(actual).toBe('5.000%')
    })

    it('should format string inputs as percentage with 3 decimals', () => {
      const actual = formatAsPercentage('0.12345')
      expect(actual).toBe('12.345%')
    })
  })

  describe('calculateRequiredSavings', () => {
    it('should return $750k given $30k annual expenses and 4% SWR', () => {
      const actual = calculateRequiredSavings({ annualExpenses: 30000, withdrawalRate: 0.04 })
      expect(actual).toBe(750000)
    })

    it('should return $1 million given $30k annual expenses and 3% SWR', () => {
      const actual = calculateRequiredSavings({ annualExpenses: 30000, withdrawalRate: 0.03 })
      expect(actual).toBe(1000000)
    })
  })

  describe('calculateAge', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date(2022, 0, 2, 0, 0, 0, 0))
    })

    afterEach(() => jest.useRealTimers())

    it('should return 22 when birthdate = yesterday', () => {
      const actual = calculateAge('2000-01-01')
      expect(actual).toBe(22)
    })

    it('should return 22 when birthdate = todays date', () => {
      const actual = calculateAge('2000-01-02')
      expect(actual).toBe(22)
    })

    it('should return 21 when birthdate = tomorrow', () => {
      const actual = calculateAge('2000-01-03')
      expect(actual).toBe(21)
    })
  })

  describe('calcualteFutureValue', () => {
    it('should return approx 111 given given $100 initial value, 1 year, 10% rate, $1 payment', () => {
      const actual = calcualteFutureValue({ rate: 0.1, pmt: 1, pv: 100, nper: 1 })
      expect(actual).toBeCloseTo(111, 5)
    })

    it('should return approx 15528.23 given given $0 initial value, 10 years, 5% rate, $100 payment', () => {
      const actual = calcualteFutureValue({ rate: 0.05 / 12, pmt: -100, pv: 0, nper: 10 * 12 })
      expect(actual).toBeCloseTo(15528.23)
    })
  })

  describe('calculateRequiredRate', () => {
    it('should return approx 0.1011 given 25 years, $0 present value, $1000 payments, $100,000 goal', () => {
      const actual = calculateRequiredRate({ nper: 25, pmt: -1000, pv: 0, fv: 100000, type: 0, guess: 0.01 })
      expect(actual).toBeCloseTo(0.1011, 4)
    })

    it('should return approx 0.4938 given 10 years, $0 present value, $10 payments, $1,100 goal', () => {
      const actual = calculateRequiredRate({ nper: 10, pmt: -10, pv: 0, fv: 1100, type: 0, guess: 0.01 })
      expect(actual).toBeCloseTo(0.4938, 4)
    })
  })
})
