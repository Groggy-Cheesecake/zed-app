import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

// Components
import Select from '../Select'

// Styles
import './selectfield.scss'

// Images
import IconInfo from '../../../../assets/images/icn-info-white-24.svg'

class SelectField extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.any,
    options: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    note: PropTypes.string,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
    infoIcon: PropTypes.bool,
    infoContent: PropTypes.object,
  }

  render() {
    const {
      style,
      className,
      label,
      value,
      onChange,
      options,
      placeholder,
      note,
      errorMsg,
      infoIcon,
      infoContent,
    } = this.props

    return (
      <div className={`select-field ${className || ''}`} style={style}>
        <div className="grey-text text-uppercase info-label">
          {label}
          {infoIcon ? (
            <Tooltip placement="right" overlayStyle={{ maxWidth: '27rem' }} overlay={infoContent}>
              <img className="icon-info" src={IconInfo} />
            </Tooltip>
          ) : null}
        </div>
        <div className="select-content">
          <Tooltip
            placement="right"
            overlayStyle={{ maxWidth: '25rem' }}
            visible={value === null}
            overlay={errorMsg ? errorMsg : ''}
          >
            <Select
              className={value === null ? ' has-error' : ''}
              value={value}
              onChange={onChange}
              options={options}
              isSearchable={false}
              placeholder={placeholder}
            />
          </Tooltip>
          {note ? <div className="note">{note}</div> : null}
        </div>
      </div>
    )
  }
}

export default SelectField
