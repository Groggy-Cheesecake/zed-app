import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/Footer'
import Twitter from '../../assets/images/icn-twitter-24.svg'
import Telegram from '../../assets/images/icn-telegram-24.svg'
import Facebook from '../../assets/images/icn-facebook-24.svg'
import Instagram from '../../assets/images/icn-instagram-24.svg'
import Youtube from '../../assets/images/icn-youtube-24.svg'
// import Reddit from '../../assets/images/icn-reddit-24.svg';
import Medium from '../../assets/images/icn-medium-24.svg'
import Discord from '../../assets/images/icn-discord-24.svg'
import './footer.scss'

class Footer extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
    location: PropTypes.object,
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
    const pathname = this.props.location.pathname
    const darkFooterPages = ['/stud', '/roster', '/faq', '/activity', '/stable', '/marketplace']
    const footerStyle =
      darkFooterPages.indexOf(pathname) !== -1 || pathname.search('/racehorse/') !== -1

    return (
      <footer
        className={`footer ${this.state.storedCookieSetting !== '1' ? 'opened-cookie' : ''} ${
          footerStyle ? 'dark' : ''
        }`}
      >
        <div className="footer-content">
          <div className="nav-part">
            <div className="primary-text helpful">
              <Translate id="copyright" /> ©Z<span className="symbol">Ξ</span>D
            </div>
            <NavLink
              to="/terms"
              className="primary-text secondary text-capitalize"
              activeClassName="menu selected"
              exact={true}
            >
              <Translate id="terms" />
            </NavLink>
            <NavLink
              to="/privacy"
              className="primary-text secondary text-capitalize"
              activeClassName="menu selected"
              exact={true}
            >
              <Translate id="privacy" />
            </NavLink>
          </div>
          <div className="icons-part">
            <a
              className="icon-part"
              target="_blank"
              href="https://twitter.com/zed_run"
              rel="noopener noreferrer"
            >
              <div className="icon-sm">
                <img className="icon" src={Twitter} />
              </div>
            </a>
            <a
              className="icon-part"
              target="_blank"
              href="https://discord.gg/sNgA5Zu"
              rel="noopener noreferrer"
            >
              <div className="icon-sm">
                <img className="icon" src={Discord} />
              </div>
            </a>
            <a
              className="icon-part"
              target="_blank"
              href="https://t.me/runzedrun"
              rel="noopener noreferrer"
            >
              <div className="icon-sm">
                <img className="icon" src={Telegram} />
              </div>
            </a>
            <a
              className="icon-part"
              target="_blank"
              href="https://www.youtube.com/channel/UCJ8lTFHpvsT2pJHaZk8942Q"
              rel="noopener noreferrer"
            >
              <div className="icon-sm">
                <img className="icon" src={Youtube} />
              </div>
            </a>
            <a
              className="icon-part"
              target="_blank"
              href="https://www.medium.com/@zed_run"
              rel="noopener noreferrer"
            >
              <div className="icon-sm">
                <img className="icon" src={Medium} />
              </div>
            </a>
            <a
              className="icon-part"
              target="_blank"
              href="https://www.facebook.com/runzedrun/"
              rel="noopener noreferrer"
            >
              <div className="icon-sm">
                <img className="icon" src={Facebook} />
              </div>
            </a>
            <a
              className="icon-part"
              target="_blank"
              href="https://www.instagram.com/zed.run"
              rel="noopener noreferrer"
            >
              <div className="icon-sm">
                <img className="icon" src={Instagram} />
              </div>
            </a>
            {/*<a className="icon-part" target"_blank href="https://www.reddit.com/user/zed_run" rel="noopener noreferrer">
                            <div className="icon-sm" >
                                <img className="icon" src={Reddit} />
                            </div>
                        </a>*/}
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

export default withRouter(withLocalize(Footer))
