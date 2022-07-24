import { SectionContainer, SectionHeader, SubSectionHeader } from '@/common/components/Section'

const InputCell = ({ label, ...props }) => (
  <div className='grid__cell input--add-on'>
    <span className='input--add-on-label'>{label}</span>
    {(props.onChange
      ? <input className='input--add-on-field' {...props} />
      : <span className='input--add-on-field'>{props.value}</span>
    )}
  </div>
)

export default function FireCalc () {
  const inputConfig = [
    {
      id: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      onChange: (e) => console.log('birthDate changed: ' + e.target.value)
    },
    {
      id: 'retirementAge',
      label: 'FIRE Age',
      type: 'number',
      min: 1,
      max: 100,
      step: 1,
      onChange: (e) => console.log('retirementAge changed: ' + e.target.value)
    },
    {
      id: 'annualExpenses',
      label: 'Annual Expenses ($)',
      type: 'number',
      min: 1,
      max: 1000000,
      step: 1,
      onChange: (e) => console.log('annualExpenses changed: ' + e.target.value)
    },
    {
      id: 'withdrawalRate',
      label: 'Withdrawal Rate (%)',
      type: 'number',
      min: 0.5,
      max: 10,
      step: 0.1,
      onChange: (e) => console.log('withdrawalRate changed: ' + e.target.value)
    },
    {
      id: 'FVpv',
      label: 'Total Existing Savings ($)',
      type: 'number',
      min: 0,
      step: 0.01,
      onChange: (e) => console.log('FVpv changed: ' + e.target.value)
    },
    {
      id: 'FVrate',
      label: 'Rate of Return (%)',
      type: 'number',
      min: 0.05,
      max: 100,
      step: 0.01,
      onChange: (e) => console.log('FVrate changed: ' + e.target.value)
    },
    {
      id: 'FVpmt',
      label: 'Annual Savings ($)',
      type: 'number',
      min: 0,
      step: 0.01,
      onChange: (e) => console.log('FVpmt changed: ' + e.target.value)
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Savings ($)',
      tabIndex: -1,
      value: '100'
    }
  ]

  function handleSaveClick () {
    console.log('SaveClick!')
  }

  function handleDeleteSaveClick () {
    console.log('DeleteSaveClick!')
  }

  return (
    <>
      <SectionContainer>
        <SectionHeader
          title='FIRE Calculator'
          onSaveClick={handleSaveClick}
          onDeleteClick={handleDeleteSaveClick}
        />
      </SectionContainer>

      <SectionContainer>
        <SubSectionHeader title='INPUTS'>
          <h4 title='Help' className='icon-button'>
            <span className='glyphicon glyphicon-question-sign'>halp</span>
          </h4>
        </SubSectionHeader>

        <div className='grid grid--gutters grid--full med-grid--1of2 large-grid--1of3'>
          {inputConfig.map((field, i) => (
            <InputCell key={i} tabIndex={i + 1} {...field} />
          ))}
        </div>
      </SectionContainer>
    </>
  )
}
