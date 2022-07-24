import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputCell from './InputCell'

describe('<InputCell />', () => {
  function renderInputCell (props) {
    const mockOnChange = jest.fn()

    const result = render(
      <InputCell onChange={mockOnChange} {...props} />
    )

    const InputByLabelText = (labelText) => result.getByLabelText(labelText)

    return {
      InputByLabelText,
      mockOnChange,
      debug: result.debug
    }
  }

  it('should render a numeric input with correct properties', async () => {
    const id = 'test'
    const type = 'number'
    const label = 'Test Input'
    const value = 42
    const user = userEvent.setup()

    const {
      InputByLabelText,
      mockOnChange
    } = renderInputCell({ id, type, label, value })

    expect(InputByLabelText(label)).toBeInTheDocument()
    expect(InputByLabelText(label)).toHaveAttribute('id', id)
    expect(InputByLabelText(label)).toHaveAttribute('type', type)
    expect(InputByLabelText(label)).toHaveValue(value)
    expect(InputByLabelText(label)).not.toHaveAttribute('readOnly')

    await user.type(InputByLabelText(label), '1')
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('should render a read-only input with correct properties', async () => {
    const id = 'test'
    const type = 'number'
    const label = 'Test Input'
    const value = 42
    const readOnly = true
    const user = userEvent.setup()

    const {
      InputByLabelText,
      mockOnChange
    } = renderInputCell({ id, type, label, value, readOnly })

    expect(InputByLabelText(label)).toBeInTheDocument()
    expect(InputByLabelText(label)).toHaveAttribute('id', id)
    expect(InputByLabelText(label)).toHaveAttribute('type', type)
    expect(InputByLabelText(label)).toHaveAttribute('readOnly')
    expect(InputByLabelText(label)).toHaveValue(value)

    await user.type(InputByLabelText(label), '1')
    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
