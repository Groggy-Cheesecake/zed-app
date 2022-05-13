import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './support_browser.scss'
import { Translate } from 'react-localize-redux'
import Chrome from '../../../assets/images/img-chrome.png'
import Firefox from '../../../assets/images/img-firefox.png'

class SupportBrowserContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="support-browser-content mobile">
        <form className="buy-confirm-form">
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
          <section>
            <div className="md-text">
              <Translate id="want_to_play" />
            </div>
            <div className="normal-text">
              <Translate id="use_desktop_browser" />
              <br />
              (<Translate id="firefox_or_chrome" />)
            </div>
            <div className="browsers-note">
              <div className="browsers">
                <img className="bro-img" src={Firefox} />
                <span className="normal-text or">
                  <Translate id="or" />
                </span>
                <img className="bro-img chrome" src={Chrome} />
              </div>
              <div className="note">
                <Translate id="browser_note_mobile" />
              </div>
            </div>
            <button
              className="primary-btn mobile got-it text-uppercase"
              onClick={this.props.closeModal}
            >
              <Translate id="got_it" />
            </button>
          </section>
        </form>
      </div>
    )
  }
}

export default SupportBrowserContent
