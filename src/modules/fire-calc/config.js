import dayjs from 'dayjs'
import { isNumber } from '@/common/utils/is-number'

export const fieldConfig = {
  birthDate: {
    id: 'birthDate',
    label: 'Birth Date',
    type: 'date',
    value: '1980-01-01',
    isValid: true,
    validate (value) {
      const date = dayjs(value)
      this.isValid = date.isValid() && !date.isAfter(dayjs, 'date')
      return this.isValid
    }
  },
  retirementAge: {
    id: 'retirementAge',
    label: 'FIRE Age (Years)',
    type: 'number',
    value: 65,
    placeholder: 'ex: 50',
    min: 1,
    max: 100,
    step: 1,
    isValid: true,
    validate (value) {
      this.isValid = isNumber(value) && Number(value) >= this.min && Number(value) <= this.max
      return this.isValid
    }
  },
  annualExpenses: {
    id: 'annualExpenses',
    label: 'Annual Expenses ($)',
    type: 'number',
    value: 30000,
    placeholder: 'ex: 30000',
    min: 1,
    max: 1000000,
    step: 1,
    isValid: true,
    validate (value) {
      this.isValid = isNumber(value) && Number(value) >= this.min && Number(value) <= this.max
      return this.isValid
    }
  },
  withdrawalRate: {
    id: 'withdrawalRate',
    label: 'Withdrawal Rate (%)',
    type: 'number',
    value: 4,
    placeholder: 'ex: 4',
    min: 0.5,
    max: 10,
    step: 0.1,
    isValid: true,
    validate (value) {
      this.isValid = isNumber(value) && Number(value) >= this.min && Number(value) <= this.max
      return this.isValid
    }
  },
  currentSavings: {
    id: 'currentSavings',
    label: 'Total Existing Savings ($)',
    type: 'number',
    value: 250000,
    placeholder: 'ex 250000',
    min: 0,
    step: 0.01,
    isValid: true,
    validate (value) {
      this.isValid = isNumber(value) && Number(value) >= this.min
      return this.isValid
    }
  },
  rateOfReturn: {
    id: 'rateOfReturn',
    label: 'Rate of Return (%)',
    type: 'number',
    value: 7,
    placeholder: 'ex: 7',
    min: 0.05,
    max: 100,
    step: 0.01,
    isValid: true,
    validate (value) {
      this.isValid = isNumber(value) && Number(value) >= this.min && Number(value) <= this.max
      return this.isValid
    }
  },
  annualSavings: {
    id: 'annualSavings',
    label: 'Annual Savings ($)',
    type: 'number',
    value: 10000,
    placeholder: 'ex: 25000',
    min: 0,
    step: 0.01,
    isValid: true,
    validate (value) {
      this.isValid = isNumber(value) && Number(value) >= this.min
      return this.isValid
    }
  },
  monthlySavings: {
    id: 'monthlySavings',
    label: 'Monthly Savings ($)',
    type: 'number',
    value: '',
    placeholder: 'ex: 2000',
    min: 0,
    step: 0.01,
    isValid: true,
    validate (value) {
      this.isValid = isNumber(value) && Number(value) >= this.min
      return this.isValid
    }
  }
}
