import React from 'react'

import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import ismobile from 'is-mobile'

import HeaderDesktop from './Header.js'
import HeaderMobile from './_Header.js'
import PoolBar from '../common/PoolBar'
import PropTypes from 'prop-types'

class Header extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    if (ismobile()) {
      return (
        <HeaderMobile
          menuOpen={this.props.menuOpen}
          handleMenuClick={this.props.handleMenuClick}
          handleLinkClick={this.props.handleLinkClick}
        />
      )
    } else {
      return (
        <>
          <HeaderDesktop />
          <PoolBar />
        </>
      )
    }
  }
}

Header.propTypes = {
  menuOpen: PropTypes.bool,
  handleMenuClick: PropTypes.func,
  handleLinkClick: PropTypes.func,
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default withRouter(drizzleConnect(Header, mapStateToProps, mapDispatchToProps))
