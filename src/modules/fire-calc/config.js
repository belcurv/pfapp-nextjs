import dayjs from 'dayjs'

export const fieldConfig = {
  birthDate: {
    id: 'birthDate',
    label: 'Birth Date',
    type: 'date',
    value: '1980-01-01',
    validate (value) {
      const date = dayjs(value)
      return date.isValid() && !date.isAfter(dayjs, 'date')
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
    validate (value) {
      return Number(value) >= this.min && Number(value) <= this.max
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
    validate (value) {
      return Number(value) >= this.min && Number(value) <= this.max
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
    validate (value) {
      return Number(value) >= this.min && Number(value) <= this.max
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
    validate (value) {
      return Number(value) >= this.min
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
    validate (value) {
      return Number(value) >= this.min && Number(value) <= this.max
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
    validate (value) {
      return Number(value) >= this.min
    }
  },
  monthlySavings: {
    id: 'monthlySavings',
    label: 'Monthly Savings ($)',
    type: 'text',
    value: '0',
    readOnly: true,
    tabIndex: -1
  }
}
