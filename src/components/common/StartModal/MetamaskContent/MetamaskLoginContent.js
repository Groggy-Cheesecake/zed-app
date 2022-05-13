import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Translate } from 'react-localize-redux'

class MetamaskLoginContent extends React.Component {
  static propTypes = {
    close: PropTypes.func,
    nextStep: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="start-modal-content">
        <form className="start-form" onSubmit={this.props.nextStep}>
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
          </section>
        </form>
      </div>
    )
  }
}

export default MetamaskLoginContent
