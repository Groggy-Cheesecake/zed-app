import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/zed_logo_wht.svg'

import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/Footer'
import PropTypes from 'prop-types'

import Reddit from '../../assets/images/icn-reddit-24.svg'
import Medium from '../../assets/images/icn-medium-24.svg'
import Discord from '../../assets/images/icn-discord-24.svg'

class Footer extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      storedCookieSetting: null,
    }
    this.storeCookieSetting = this.storeCookieSetting.bind(this)
    this.props.addTranslation({ footer: i18n })
  }

  UNSAFE_componentWillMount() {
    this.setState({ storedCookieSetting: localStorage.getItem('storedCookieSetting') })
  }

  storeCookieSetting() {
    localStorage.setItem('storedCookieSetting', '1')
    this.setState({ storedCookieSetting: localStorage.getItem('storedCookieSetting') })
  }

  render() {
    return (
      <footer
        className={`app-footer mobile ${
          this.state.storedCookieSetting !== '1' ? 'opened-cookie' : ''
        }`}
      >
        <div className="footer-content">
          <img className="footer-logo" src={Logo} />
          <div className="footer-bar">
            <div className="nav-part">
              <NavLink
                to="/terms"
                className="text-capitalize"
                activeClassName="menu selected"
                exact={true}
              >
                <Translate id="terms" />
              </NavLink>
              <NavLink
                to="/privacy"
                className="text-capitalize"
                activeClassName="menu selected"
                exact={true}
              >
                <Translate id="privacy" />
              </NavLink>
            </div>
            <div className="icons-part">
              <div className="icon-part">
                <img className="icon" src={Reddit} />
                <a className="text-capitalize" href="https://www.reddit.com/user/zed_run">
                  <Translate id="menu_items.reddit" />
                </a>
              </div>
              <div className="icon-part">
                <img className="icon" src={Medium} />
                <a className="text-capitalize" href="https://www.medium.com/@zed_run">
                  <Translate id="menu_items.medium" />
                </a>
              </div>
              <div className="icon-part">
                <img className="icon" src={Discord} />
                <a className="text-capitalize" href="https://discord.gg/sNgA5Zu">
                  <Translate id="menu_items.discord" />
                </a>
              </div>
            </div>
            <div className="copy-right">
              <Translate id="footer.copyright" /> © Z<span className="symbol">Ξ</span>D Labs
            </div>
          </div>
        </div>
        {this.state.storedCookieSetting !== '1' ? (
          <div className="cookie-content">
            <div>
              <Translate id="footer.policy_text" />
            </div>
            <button onClick={this.storeCookieSetting} className="text-capitalize">
              <Translate id="got_it" />
            </button>
          </div>
        ) : null}
      </footer>
    )
  }
}

export default withLocalize(Footer)
