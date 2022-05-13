import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../Header'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'

class MetamaskAuthPageContent extends React.Component {
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
              <Translate id="metamask_req" />
            </div>
            <div className="m-text">
              <Translate id="almost_done" />
              <br />
              <br />
              <Translate id="connect_zed" />
            </div>
            <div className="btn-content">
              <NavLink to="/metamask-fail" className="next-btn text-uppercase" exact={true}>
                <Translate id="open_metamask" />
              </NavLink>
            </div>
            <div className="m-small-text">
              <Translate id="metamask_wallet" />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withLocalize(MetamaskAuthPageContent)
