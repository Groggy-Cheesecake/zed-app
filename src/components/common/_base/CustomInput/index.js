import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './custominput.scss'

class CustomInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    note: PropTypes.string,
  }

  render() {
    const { className, label, note, value } = this.props

    return (
      <div className={`custom-field ${className || ''}`}>
        <div className="grey-text text-uppercase info-label">{label}</div>
        <div className="custom-content">
          <input className="z-input sm-input" type="text" value={value} readOnly />
          {note && <div className="note">{note}</div>}
        </div>
      </div>
    )
  }
}

export default CustomInput
