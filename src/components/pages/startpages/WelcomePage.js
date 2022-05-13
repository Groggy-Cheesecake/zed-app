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
      <div className="page-content start welcome">
        <main>
          <div className="start-page-content">
            <div className="caption">
              <Translate id="welcome_to" /> Z<span className="symbol">Ξ</span>D
            </div>
            <div className="m-text">
              <Translate id="email_started" />
              <br />
              <Translate id="email_thoroghbred" />
            </div>
            <div className="m-input-content">
              <input type="text" placeholder="Email address" />
            </div>
            <div className="m-input-content checkbox">
              <input type="checkbox" id="m-checkbox" />
              <label htmlFor="m-checkbox">
                <Translate id="newsletter" />
              </label>
            </div>
            <div className="btn-content">
              <NavLink to="/create-stable" className="next-btn text-uppercase" exact={true}>
                <Translate id="next" />
              </NavLink>
            </div>
            <div className="m-small-text">
              <Translate id="auctions" />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withLocalize(WelcomePageContent)
