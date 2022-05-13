import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'

import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../Header'

class MetamaskFailPageContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="start-content metamask">
        <Header />
        <main>
          <div className="start-page-content">
            <div className="caption text-capitalize">
              <Translate id="oops" />
            </div>
            <div className="m-text">
              <Translate id="wrong_network_text" />
              &nbsp;
              <b className="text-capitalize">
                <Translate id="main_ethereum" />
              </b>
              .
            </div>
            <div className="btn-content">
              <NavLink to="/metamask-login" className="next-btn text-uppercase" exact={true}>
                <Translate id="open_metamask" />
              </NavLink>
            </div>
            <div className="m-small-text">
              <Translate id="more_metamask" />
              &nbsp;
              <b>
                <Translate id="faqs" />
              </b>
              .
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withLocalize(MetamaskFailPageContent)
