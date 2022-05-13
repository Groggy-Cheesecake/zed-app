import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

// Styles
import './checkbox.scss'

class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.any,
    id: PropTypes.string,
    tooltip: PropTypes.string,
  }

  render() {
    const content = (
      <div className={`z-checkbox ${this.props.className || ''}`}>
        <input
          id={this.props.id || 'm-checkbox'}
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <label
          className="primary-text secondary"
          htmlFor={this.props.id || 'm-checkbox'}
          dangerouslySetInnerHTML={{ __html: this.props.label }}
        />
      </div>
    )

    if (this.props.tooltip) {
      return (
        <Tooltip
          placement="right"
          overlayStyle={{ maxWidth: '250px' }}
          overlay={this.props.tooltip}
        >
          {content}
        </Tooltip>
      )
    } else {
      return content
    }
  }
}

export default Checkbox
