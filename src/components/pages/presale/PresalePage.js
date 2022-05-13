import React from 'react'
import Horse from '../../../assets/images/horse_white.png'
import { NavLink } from 'react-router-dom'
import Info from '../../../assets/images/rounded-info-grey.svg'
import Header from '../../Header'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'
import i18n from '@/const/i18n/PresalePage'

class PresalePage extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ presale_page: i18n })
  }

  render() {
    return (
      <div className="presale-content">
        <Header />

        <main>
          <div className="caption">
            <Translate id="presale_page.caption_text" />
          </div>
          <section>
            <div className="horse-name text-uppercase">
              <Translate id="presale_page.little_tokyo" />
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
                  <Translate id="presale_page.nakamoto" />
                </div>
              </div>
              <div className="inner-item">
                <div className="key">
                  <Translate id="coat" />
                </div>
                <div className="value text-uppercase">
                  <Translate id="presale_page.chost_white" />
                </div>
              </div>
              <div className="inner-item">
                <div className="key text-uppercase">
                  <Translate id="gender" />
                </div>
                <div className="value text-uppercase">
                  <Translate id="presale_page.colt" />
                </div>
              </div>
            </div>
          </section>
          <div className="price-login">
            <div className="price">1.26Ξ</div>
            <div className="login-btn text-uppercase">
              <Translate id="login_to_buy" />
            </div>
          </div>
          <div className="early-release">
            <h2 className="rel-title text-uppercase">
              <Translate id="release" />
            </h2>
            <div className="rel-text">
              <Translate id="presale_page.release_text1" />
              <br />
              <br />
              <Translate id="presale_page.release_text2" />
              <br />
              <br />
              <Translate id="presale_page.release_text3" />
            </div>
            <div className="learn-more">
              <div className="learn-btn text-uppercase">
                <Translate id="presale_page.learn_more" />
              </div>
            </div>
            <div className="pre-footer">
              <NavLink
                to="/about"
                activeClassName="menu selected"
                className="text-uppercase"
                exact={true}
              >
                <Translate id="menu_items.about" />
              </NavLink>
              <NavLink
                to="/faq"
                activeClassName="menu selected"
                className="text-uppercase"
                exact={true}
              >
                <Translate id="faq" />
              </NavLink>
              <NavLink
                to="/bloodline"
                activeClassName="menu selected"
                className="text-uppercase"
                exact={true}
              >
                <Translate id="bloodline" />
              </NavLink>
              <NavLink
                to="/reddit"
                activeClassName="menu selected"
                className="text-uppercase"
                exact={true}
              >
                <Translate id="menu_items.reddit" />
              </NavLink>
              <NavLink
                to="/medium"
                activeClassName="menu selected"
                className="text-uppercase"
                exact={true}
              >
                <Translate id="menu_items.medium" />
              </NavLink>
              <NavLink
                to="/discord"
                activeClassName="menu selected"
                className="text-uppercase"
                exact={true}
              >
                <Translate id="menu_items.discord" />
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withLocalize(PresalePage)
