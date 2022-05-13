import * as React from 'react'
import PropTypes from 'prop-types'

// Styles
import './toggleswitch.scss'

class Toggle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      isChecked: false,
    }
  }

  _handleChange = () => {
    this.setState({ isChecked: !this.state.isChecked })
  }

  render() {
    const { className } = this.props

    return (
      <div className={`switch-container ${className || ''}`}>
        <label>
          <input
            checked={this.state.isChecked}
            onChange={this._handleChange}
            className="switch"
            type="checkbox"
          />
          <div>
            <div />
          </div>
        </label>
      </div>
    )
  }
}

export default Toggle
