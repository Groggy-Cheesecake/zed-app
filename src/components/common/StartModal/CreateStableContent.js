import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'
import i18n from '@/const/i18n/StartModal'

import actions from '../../../state/actions'

class CreateStableContent extends React.Component {
  static propTypes = {
    setStable: PropTypes.func,
    nextStep: PropTypes.func,
    close: PropTypes.func,
    checkAvailablity: PropTypes.func,
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      stable: '',
      isChecked: false,
      error: {
        stable_name: null,
        rules: null,
      },
    }
    this._onSubmit = this._onSubmit.bind(this)
    this._onStableChange = this._onStableChange.bind(this)
    this._onChecked = this._onChecked.bind(this)
    this.props.addTranslation({ start_modal: i18n })
  }

  get tooltipMessage() {
    return 'Pick a valid stable name and press next'
  }

  _onStableChange(e) {
    this.setState({
      stable: e.target.value,
    })
  }

  _onChecked() {
    this.setState({ isChecked: !this.state.isChecked })
  }

  _onSubmit(e) {
    e.preventDefault()
    let error = {
      stable_name: null,
      rules: null,
    }
    if (!this.state.stable) {
      error.stable_name = 'Stable name is required!'
    }
    if (!this.state.isChecked) {
      error.rules = 'You should read and accept Terms and Privacy Policy to continue!'
    }
    // if (!validateEmail(this.state.email)) {
    //     error = 'Invalid Stable name!';
    // }
    this.setState({ error }, () => {
      if (this.state.error.stable_name || this.state.error.rules) {
        return
      }
      this.props
        .checkAvailablity({
          stable_name: this.state.stable,
        })
        .then(({ error, payload }) => {
          if (error || payload) {
            this.setState({
              error: {
                stable_name: 'Stable name already in use',
                rules: null,
              },
            })
            return
          }
          this.props.setStable(this.state.stable)
          this.props.nextStep()
        })
    })
  }

  render() {
    return (
      <div className="start-modal-content">
        <form className="start-form" onSubmit={this._onSubmit}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.close} />
          <section>
            <div className="caption">
              <Translate id="start_modal.create_stable" />
            </div>
            <div className="m-text">
              <Translate id="create_stable_text_top" />
              <br />
              <Translate id="create_stable_text_bottom" />
            </div>
            <div className="m-small-text">
              <Translate id="account_text" />
            </div>
            <div className="m-input-content">
              <Tooltip
                placement="right"
                visible={true}
                overlay={this.state.error.stable_name || this.tooltipMessage}
              >
                <input
                  className="z-input"
                  type="text"
                  placeholder="Stable name"
                  onChange={this._onStableChange}
                  value={this.state.stable}
                />
              </Tooltip>
            </div>
            <div className="m-input-content checkbox">
              <div className="z-checkbox">
                <input
                  type="checkbox"
                  id="m-checkbox"
                  onChange={this._onChecked}
                  checked={this.state.isChecked}
                />
                <label htmlFor="m-checkbox">
                  <Translate id="by_accaunt" /> &nbsp;
                  <Link className="text-capitalize " to="/terms">
                    <Translate id="terms" />
                  </Link>
                  &nbsp; and &nbsp;
                  <Link className="text-capitalize" to="/privacy">
                    <Translate id="policy" />
                  </Link>
                  .
                </label>
              </div>
            </div>
            <Tooltip
              placement="right"
              trigger={this.state.stable === '' || !this.state.isChecked ? 'hover' : ''}
              overlay="You should read and accept Terms and Privacy Policy to continue"
            >
              <button
                className={`primary-btn md thin ${
                  this.state.stable === '' || !this.state.isChecked ? 'disable' : ''
                } text-uppercase`}
                type="submit"
              >
                <Translate id="next" />
              </button>
            </Tooltip>
          </section>
        </form>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setStable: stable => {
      return dispatch({
        type: 'auth/SET_STABLE_NAME',
        payload: stable,
      })
    },
    checkAvailablity: data => dispatch(actions.auth.checkAvailablity(data)),
  }
}

export default drizzleConnect(
  withLocalize(CreateStableContent),
  mapStateToProps,
  mapDispatchToProps,
)
