import React, { useState, createContext, useContext } from 'react'
import produce from 'immer'
import { isFunction } from '@/common/utils/is-function'
import { useMathUtils } from '@/common/utils/math'
import { fieldConfig } from '../config'

const INITIAL_STATE = {
  inputs: fieldConfig
}

const FireStateContext = createContext()
const FireStateUpdaterContext = createContext()

const FireStateProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE)
  return (
    <FireStateUpdaterContext.Provider value={setState}>
      <FireStateContext.Provider value={state}>
        {children}
      </FireStateContext.Provider>
    </FireStateUpdaterContext.Provider>
  )
}

const useFireCalcManager = () => {
  const state = useContext(FireStateContext)
  const setState = useContext(FireStateUpdaterContext)
  const {
    calculateAge,
    calculateRequiredSavings,
    calculateRequiredRate,
    calcualteFutureValue
  } = useMathUtils()

  if (state == null) {
    throw new Error('useFireCalcManager must be used within a FireStateContext context')
  }

  const setFieldValue = (fieldId, value) => setState(produce(draft => {
    if (draft.inputs[fieldId] == null) return
    if (isFunction(draft.inputs[fieldId].validate)) draft.inputs[fieldId].validate(value)

    if (fieldId === 'annualSavings') {
      draft.inputs.monthlySavings.value = Number(value / 12).toFixed(2)
    }

    if (fieldId === 'monthlySavings') {
      draft.inputs.annualSavings.value = Number(value * 12).toFixed(2)
    }

    draft.inputs[fieldId].value = value
  }))

  const getAge = () => {
    const { birthDate } = state.inputs
    if (!birthDate.value) return 0
    return calculateAge(birthDate.value)
  }

  const getYearsToFire = () => {
    const { retirementAge } = state.inputs
    if (!retirementAge) return 0
    const age = getAge()
    return retirementAge.value - age
  }

  const getRequiredSavings = () => {
    const { annualExpenses, withdrawalRate } = state.inputs
    if (!annualExpenses.isValid || !withdrawalRate.isValid) return 0
    return calculateRequiredSavings({
      annualExpenses: annualExpenses.value,
      withdrawalRate: withdrawalRate.value / 100
    })
  }

  const getRequiredReturn = () => {
    const { annualSavings, currentSavings } = state.inputs
    const nper = getYearsToFire()
    const pmt = -annualSavings.value
    const pv = -currentSavings.value
    const fv = getRequiredSavings()
    return calculateRequiredRate({ nper, pmt, pv, fv })
  }

  const getFutureValue = () => {
    const { rateOfReturn, currentSavings, annualSavings } = state.inputs
    const nper = getYearsToFire()
    if (nper === 0) return 0
    const rate = rateOfReturn.value / 100
    const pmt = annualSavings.value
    const pv = currentSavings.value
    return calcualteFutureValue({ rate, nper, pmt, pv })
  }

  return {
    inputs: state.inputs,
    getAge,
    getYearsToFire,
    getRequiredSavings,
    getRequiredReturn,
    getFutureValue,
    setFieldValue
  }
}

export default FireStateProvider
export { FireStateProvider, useFireCalcManager }
