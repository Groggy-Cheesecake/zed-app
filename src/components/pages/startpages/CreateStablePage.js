import React from 'react'
import { NavLink } from 'react-router-dom'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'

class WelcomePageContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="page-content start create-stable">
        <main>
          <div className="start-page-content">
            <div className="caption">
              <Translate id="create_stable" />
            </div>
            <div className="m-text">
              <Translate id="create_stable_text_top" />
              &nbsp;
              <Translate id="create_stable_text_bottom" />
            </div>
            <div className="m-input-content">
              <input type="text" placeholder="Stable name" />
            </div>
            <div className="m-input-content checkbox">
              <div className="z-checkbox">
                <input type="checkbox" id="m-checkbox" />
                <label htmlFor="m-checkbox">
                  <Translate id="by_account" />
                  <a className="text-capitalize">
                    {' '}
                    <Translate id="terms" />
                  </a>
                  &nbsp;and&nbsp;
                  <a className="text-capitalize">
                    {' '}
                    <Translate id="policy" />
                  </a>
                  .
                </label>
              </div>
            </div>
            <div className="btn-content">
              <NavLink to="/metamask-auth" className="next-btn text-uppercase" exact={true}>
                <Translate id="start_page.next" />
              </NavLink>
            </div>
            <div className="m-small-text">
              <Translate id="account_text" />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withLocalize(WelcomePageContent)
