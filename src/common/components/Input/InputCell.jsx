import PropTypes from 'prop-types'

const InputCell = ({ id, label, type, value, ...props }) => {
  return (
    <div className='grid__cell input--add-on'>
      <label
        className='input--add-on-label'
        htmlFor={id}
      >
        {label}
      </label>

      <input
        className='input--add-on-field'
        id={id}
        type={type}
        value={value}
        {...props}
      />
    </div>
  )
}

InputCell.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
}

export default InputCell
