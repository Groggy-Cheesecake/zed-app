import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../Header'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'

class MetamaskInstallPageContent extends React.Component {
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
              <Translate id="install_metamask" />
            </div>
            <div className="m-text">
              <Translate id="install_metamask_text1" />
              <br />
              <br />
              <Translate id="install_metamask_text2" />
            </div>
            <div className="btn-content">
              <NavLink to="/" className="next-btn text-uppercase" exact={true}>
                <Translate id="download_metamask" />
              </NavLink>
            </div>
            <div className="m-small-text">
              <Translate id="more_metamask" />
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

export default withLocalize(MetamaskInstallPageContent)
