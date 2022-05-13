import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Translate } from 'react-localize-redux'
import { Link } from 'react-router-dom'

class MetamaskInstallContent extends React.Component {
  static propTypes = {
    close: PropTypes.func,
    nextStep: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form className="start-form" onSubmit={this.props.nextStep}>
        <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.close} />
        <section>
          <div className="caption text-capitalize">
            <Translate id="have_installed_metamask" />
          </div>
          <div className="m-text">
            <Translate id="install_metamask_text1" />
            <br />
            <Translate id="install_metamask_text2" />
          </div>
          <div className="m-small-text">
            <Translate id="what_is_metamask" /> &nbsp;
            <Link to="/faq">
              <Translate id="faqs" />
            </Link>
            .
          </div>
          <a
            className="primary-btn md thin text-capitalize"
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Translate id="install_metamask" />
          </a>
        </section>
      </form>
    )
  }
}

export default MetamaskInstallContent
