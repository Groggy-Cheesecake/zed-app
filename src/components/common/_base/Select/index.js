import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

// Styles
import './Select.scss'

class CustomSelect extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  }

  render() {
    return (
      <Select
        {...this.props}
        classNamePrefix="z-select"
        className={`z-select ${this.props.className !== '' ? this.props.className : ''}`}
      />
    )
  }
}

export default CustomSelect
