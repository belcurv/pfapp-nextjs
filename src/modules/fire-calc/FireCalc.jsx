import { SectionContainer, SectionHeader, SubSectionHeader } from '@/common/components/Section'
import { InputCell } from '@/common/components/Input'
import { formatAsCurrency, formatAsPercentage } from '@/common/utils/math'
import { useFireCalcManager } from './Providers/ContextProvider'
import Chart from './Components/Chart'

export default function FireCalc ({ onSaveClick, onDeleteClick }) {
  const {
    inputs,
    setFieldValue,
    getAge,
    getYearsToFire,
    getRequiredSavings,
    getRequiredReturn,
    getFutureValue
  } = useFireCalcManager()

  return (
    <>
      <SectionContainer>
        <SectionHeader
          title='FIRE Calculator'
          onSaveClick={onSaveClick}
          onDeleteClick={onDeleteClick}
        />
      </SectionContainer>

      <SectionContainer>
        <SubSectionHeader title='INPUTS'>
          <h4 title='Help' className='icon-button'>
            <span className='glyphicon glyphicon-question-sign'>halp</span>
          </h4>
        </SubSectionHeader>

        <form className='grid grid--gutters grid--full med-grid--1of2 large-grid--1of3'>
          {Object.values(inputs).map((field, i) => (
            <InputCell
              key={i}
              tabIndex={i + 1}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              min={field.min}
              max={field.max}
              step={field.step}
              readOnly={field.readOnly}
              onChange={event => setFieldValue(event.target.id, event.target.value)}
            />
          ))}
        </form>
      </SectionContainer>

      <SectionContainer>
        <SubSectionHeader title='results'>
          <h4 title='Help' className='icon-button'>
            <span className='glyphicon glyphicon-question-sign'>halp</span>
          </h4>
        </SubSectionHeader>

        <div className='grid grid--gutters grid--full large-grid--1of2-30-70'>
          <div className='grid__cell'>
            <div className='grid grid--gutters grid--full med-grid--1of2 large-grid--full'>
              <InputCell
                readOnly
                id='calculatedAge'
                type='text'
                label='Calculated Age'
                value={getAge()}
              />
              <InputCell
                readOnly
                id='yearsToFire'
                type='text'
                label='Years to FIRE'
                value={getYearsToFire()}
              />
              <InputCell
                readOnly
                id='requiredSavings'
                type='text'
                label='Required Savings'
                value={formatAsCurrency(getRequiredSavings())}
              />
            </div>

            <p>Given your expected annual retirement expenses ({formatAsCurrency(inputs.annualExpenses.value)})
              and Safe Withdrawal Rate ({inputs.withdrawalRate.value}%), you will need a total
              of {formatAsCurrency(getRequiredSavings())} to FIRE.
            </p>

            <div className='grid grid--gutters grid--full med-grid--1of2 large-grid--full'>
              <InputCell
                readOnly
                id='requiredReturn'
                type='text'
                label='Required Return'
                value={formatAsPercentage(getRequiredReturn())}
              />
            </div>

            <p>
              Given annual contributions of {formatAsCurrency(inputs.annualSavings.value)}, to achieve your
              required savings in {getYearsToFire()} years you need to earn an average return
              of {formatAsPercentage(getRequiredReturn())}.
            </p>

            <div className='grid grid--gutters grid--full med-grid--1of2 large-grid--full'>
              <InputCell
                readOnly
                id='futureValue'
                type='text'
                label='Future Value'
                value={formatAsCurrency(getFutureValue())}
              />
            </div>

            <p>
              Given your initial savings of {formatAsCurrency(inputs.currentSavings.value)}, plus annual
              contributions of {formatAsCurrency(inputs.annualSavings.value)}, earning {formatAsPercentage(inputs.rateOfReturn.value)},
              your savings will total {formatAsCurrency(getFutureValue())} after {getYearsToFire()} years.
            </p>

          </div>

          <div className='grid__cell'>
            <Chart
              requiredSavings={getRequiredSavings()}
              rateOfReturn={inputs.rateOfReturn.value}
              timeHorizon={getYearsToFire()}
              annualSavings={inputs.annualSavings.value}
              currentSavings={inputs.currentSavings.value}
            />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
