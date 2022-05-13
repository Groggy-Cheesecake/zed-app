import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../Header'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'

class MetamaskLoginPageContent extends React.Component {
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
            <div className="caption">
              <Translate id="login_to_metamask" />
            </div>
            <div className="m-text">
              <Translate id="logged_out_metamask_short_1" />
              &nbsp;
              <Translate id="logged_out_metamask_short_2" />
            </div>
            <div className="btn-content">
              <NavLink to="/metamask-install" className="next-btn text-uppercase" exact={true}>
                <Translate id="open_metamask" />
              </NavLink>
            </div>
            <div className="m-small-text">
              <Translate id="start_page.more_metamask" />
              &nbsp;
              <b>
                <Translate id="faqs" />{' '}
              </b>
              .
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withLocalize(MetamaskLoginPageContent)
