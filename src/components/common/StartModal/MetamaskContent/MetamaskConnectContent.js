import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import { Link } from 'react-router-dom'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class MetamaskConnectContent extends React.Component {
  static propTypes = {
    close: PropTypes.func,
    nextStep: PropTypes.func,
    metamaskAuth: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this._onSubmit = this._onSubmit.bind(this)
  }

  _onSubmit(e) {
    e.preventDefault()
    this.props.metamaskAuth()
  }

  render() {
    return (
      <form className="start-form" onSubmit={this._onSubmit}>
        <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.close} />
        <section>
          <div className="caption text-capitalize">
            <Translate id="login_to_metamask" />
          </div>
          <div className="m-text">
            <Translate id="logged_out_metamask_short_1" />
            <br />
            <Translate id="logged_out_metamask_short_2" />
          </div>
          <div className="m-small-text">
            <Translate id="what_is_metamask" /> &nbsp;
            <Link to="/faq">
              <Translate id="faqs" />
            </Link>
            .
          </div>
          <button className="primary-btn md thin text-capitalize" type="submit">
            <Translate id="connect" />
          </button>
        </section>
      </form>
    )
  }
}

export default MetamaskConnectContent
