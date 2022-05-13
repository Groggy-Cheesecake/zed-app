import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './radiobox-group.scss'

class RadioboxGroup extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        checked: PropTypes.bool,
      }),
    ),
    onUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = { value: this.props.value }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const value = e.target.value
    this.setState({ value }, () =>
      typeof this.props.onUpdate === 'function' ? this.props.onUpdate(value) : null,
    )
  }

  get value() {
    return this.state.value
  }

  render() {
    return (
      <div className="radio-group">
        {this.props.items.map(item => {
          return (
            <label key={item.value} className="z-radiobox">
              <input
                type="radio"
                checked={this.state.value === item.value}
                disabled={item.disabled}
                value={item.value}
                name={this.props.name}
                onChange={this.onChange}
              />
              <span className="primary-text text-capitalize">{item.label}</span>
            </label>
          )
        })}
      </div>
    )
  }
}

export default RadioboxGroup
