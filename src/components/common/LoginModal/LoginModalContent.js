import React from 'react'
import Horse from '../../../assets/images/horse_white.png'
import { NavLink } from 'react-router-dom'
import Logo from '../../../assets/images/zed_logo_wht.svg'
import Info from '../../../assets/images/rounded-info-grey.svg'

import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/LoginModal'
import PropTypes from 'prop-types'

class LoginModalContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ login_modal: i18n })
  }

  render() {
    return (
      <div className="login-modal-content">
        <div className="top-text-content">
          <h2 className="top-title text-uppercase">
            <Translate id="release" />
          </h2>
          <div className="top-text">
            <Translate id="login_modal.release_text1" />
            <br />
            <br />
            <Translate id="login_modal.release_text2" />
            <br />
            <br />
            <Translate id="login_modal.release_text3" />
          </div>
        </div>
        <form className="login-form">
          <div className="caption">
            <Translate id="login_modal.hurry_stable" />
          </div>
          <section>
            <div className="horse-name text-uppercase">
              <Translate id="login_modal.little_tokyo" />
            </div>
            <div className="horse-perform">
              <div>983/1000</div>
              <img src={Info} />
            </div>
            <div className="horse-img">
              <div className="horse-shadow">
                <img className="horse" src={Horse} />
              </div>
            </div>
            <div className="items-content">
              <div className="inner-item">
                <div className="key text-uppercase">
                  <Translate id="gen" />
                </div>
                <div className="value">Z1</div>
              </div>
              <div className="inner-item">
                <div className="key text-uppercase">
                  <Translate id="bloodline" />
                </div>
                <div className="value text-uppercase">
                  <Translate id="nakamoto" />
                </div>
              </div>
              <div className="inner-item">
                <div className="key text-uppercase">
                  <Translate id="coat" />
                </div>
                <div className="value text-uppercase">
                  <Translate id="login_modal.chost_white" />
                </div>
              </div>
              <div className="inner-item">
                <div className="key text-uppercase">
                  <Translate id="gender" />
                </div>
                <div className="value text-uppercase">
                  <Translate id="colt" />
                </div>
              </div>
            </div>
          </section>
          <div className="modal-footer">
            <div className="left">
              <NavLink to="/" exact={true}>
                <img src={Logo} />
              </NavLink>
              <NavLink
                to="/about"
                className="text-uppercase"
                activeClassName="menu selected"
                exact={true}
              >
                <Translate id="menu_items.about" />
              </NavLink>
              <NavLink
                to="/faq"
                className="text-uppercase"
                activeClassName="menu selected"
                exact={true}
              >
                <Translate id="faq" />
              </NavLink>
              <NavLink
                to="/bloodline"
                className="text-uppercase"
                activeClassName="menu selected"
                exact={true}
              >
                <Translate id="bloodline" />
              </NavLink>
              <NavLink
                to="/reddit"
                className="text-uppercase"
                activeClassName="menu selected"
                exact={true}
              >
                <Translate id="menu_items.reddit" />
              </NavLink>
              <NavLink
                to="/medium"
                className="text-uppercase"
                activeClassName="menu selected"
                exact={true}
              >
                <Translate id="menu_items.medium" />
              </NavLink>
              <NavLink
                to="/discord"
                classname="text-uppercase"
                activeClassName="menu selected"
                exact={true}
              >
                <Translate id="menu_items.discord" />
              </NavLink>
            </div>
            <div className="right">
              <div className="price">1.26Ξ</div>
              <button className="green-btn login-btn text-uppercase" type="submit">
                <Translate id="login_in_buy" />
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withLocalize(LoginModalContent)
