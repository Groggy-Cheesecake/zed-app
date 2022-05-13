import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './support_browser.scss'
import { Translate } from 'react-localize-redux'
import Chrome from '../../../assets/images/img-chrome.png'
import Firefox from '../../../assets/images/img-firefox.png'
import Opera from '../../../assets/images/img-opera.png'
import Safari from '../../../assets/images/img-safari.png'
import Edge from '../../../assets/images/img-edge.png'
import IconOpen from '../../../assets/images/icn-open-new-24.svg'

class SupportBrowserContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="support-browser-content">
        <form className="buy-confirm-form">
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
          <section>
            <div className="md-text">
              <Translate id="want_to_play" />
            </div>
            <div className="normal-text">
              <Translate id="want_to_play" />
            </div>
            <div className="browsers-note">
              <div className="browsers">
                <div className="supported-browsers">
                  <div className="grey-text text-uppercase">
                    <Translate id="supported" />
                  </div>
                  <div className="browser-content">
                    <div className="browser">
                      <img className="bro-img chrome" src={Chrome} />
                      <div className="normal-text">
                        Chrome
                        <img className="icon-open" src={IconOpen} />
                      </div>
                    </div>
                    <div className="browser">
                      <img className="bro-img" src={Firefox} />
                      <div className="normal-text">
                        Firefox
                        <img className="icon-open" src={IconOpen} />
                      </div>
                    </div>
                    <div className="browser">
                      <img className="bro-img" src={Opera} />
                      <div className="normal-text">
                        Opera
                        <img className="icon-open" src={IconOpen} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="unsupported-browsers">
                  <div className="grey-text text-uppercase">
                    <Translate id="unsupported" />
                  </div>
                  <div className="browser-content">
                    <div className="browser">
                      <img className="bro-img" src={Safari} />
                      <div className="normal-text">Safari</div>
                    </div>
                    <div className="browser">
                      <img className="bro-img" src={Edge} />
                      <div className="normal-text">Edge</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="note">
                <Translate id="browser_note" />
              </div>
            </div>
            <button className="primary-btn got-it text-uppercase">
              <Translate id="got_it" />
            </button>
          </section>
        </form>
      </div>
    )
  }
}

export default SupportBrowserContent
