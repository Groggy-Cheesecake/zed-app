import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import actions from '../../../state/actions'
import { validateEmail } from '../../../utils'
import { Translate } from 'react-localize-redux'

class WelcomeContent extends React.Component {
  static propTypes = {
    setEmail: PropTypes.func,
    nextStep: PropTypes.func,
    close: PropTypes.func,
    checkAvailablity: PropTypes.func,
    error: PropTypes.string,
    email: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      email: props.email || '',
      subscribe: false,
      error: null,
    }
    this._onSubmit = this._onSubmit.bind(this)
    this._onEmailChange = this._onEmailChange.bind(this)
    this._onSubscribeChange = this._onSubscribeChange.bind(this)
  }

  get tooltipMessage() {
    return 'Enter a valid email address and press next'
  }

  _onSubmit(e) {
    e.preventDefault()
    let error
    if (!this.state.email) {
      error = 'Email is required!'
    }
    if (!validateEmail(this.state.email)) {
      error = 'Invalid Email address!'
    }
    this.setState({ error }, () => {
      if (this.state.error) {
        return
      }
      this.props
        .checkAvailablity({
          email: this.state.email,
        })
        .then(({ error, payload }) => {
          if (error || payload) {
            this.setState({
              error: 'Email address already in use!',
            })
            return
          }
          this.props.setEmail({
            email: this.state.email,
            subscribe: this.state.subscribe,
          })
          this.props.nextStep()
        })
    })
  }

  _onEmailChange(e) {
    this.setState({
      email: e.target.value,
    })
  }

  _onSubscribeChange(e) {
    this.setState({
      subscribe: e.target.checked,
    })
  }

  componentDidMount() {
    if (this.props.email) {
      this.props.nextStep()
    }
  }

  render() {
    return (
      <div className="start-modal-content">
        <form className="start-form" onSubmit={this._onSubmit}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.close} />
          <section>
            <div className="text-capitalize caption">
              <Translate id="welcome_to" /> Z<span className="symbol">Ξ</span>D
            </div>
            <div className="m-text">
              <Translate id="email_started" />
              <br />
              <Translate id="email_thoroghbred" />
            </div>
            <div className="m-small-text">
              <Translate id="auctions" />
            </div>
            <div className="m-input-content">
              <Tooltip
                placement="right"
                overlay={this.state.error || this.tooltipMessage}
                visible={!!this.state.error}
              >
                <input
                  type="text"
                  className="z-input"
                  placeholder="Email address"
                  value={this.state.email}
                  onChange={this._onEmailChange}
                />
              </Tooltip>
            </div>
            <div className="m-input-content checkbox">
              <div className="z-checkbox">
                <input
                  id="m-checkbox"
                  type="checkbox"
                  checked={this.state.subscribe}
                  onChange={this._onSubscribeChange}
                />
                <label htmlFor="m-checkbox">
                  <Translate id="newsletter" />
                </label>
              </div>
            </div>
            <button className="primary-btn md thin text-uppercase" type="submit">
              <Translate id="next" />
            </button>
          </section>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error.signup,
    email: state.auth.email,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setEmail: ({ email, subscribe }) => {
      return dispatch({
        type: 'auth/SET_EMAIL',
        payload: { email, subscribe },
      })
    },
    checkAvailablity: data => dispatch(actions.auth.checkAvailablity(data)),
  }
}

export default drizzleConnect(WelcomeContent, mapStateToProps, mapDispatchToProps)
