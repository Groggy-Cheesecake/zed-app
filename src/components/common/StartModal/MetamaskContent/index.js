import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'

import MetamaskAuthContent from './MetamaskAuthContent'
import MetamaskConnectContent from './MetamaskConnectContent' // If new metamask
import MetamaskInstallContent from './MetamaskInstallContent' // If no metamask
import MetamaskLoginContent from './MetamaskLoginContent' // If logged out metamask

import Error from '../../../shared/Error'

const STEPS = [
  MetamaskInstallContent,
  MetamaskLoginContent,
  MetamaskConnectContent,
  MetamaskAuthContent,
]

class MetamaskContent extends React.Component {
  static propTypes = {
    isWeb3Connected: PropTypes.bool,
    public_address: PropTypes.string,
    close: PropTypes.func,
    nextStep: PropTypes.func,
    error: PropTypes.string,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      networkId: null,
    }
  }

  get step() {
    if (!this.props.isWeb3Connected) {
      return 0
    }

    let step = 3
    if (!this.props.public_address) {
      if (!window.ethereum) {
        step = 1
      } else {
        step = 2
      }
    }

    return step
  }

  _metamaskAuth() {
    if (window.ethereum) {
      window.ethereum.enable()
    }
  }

  render() {
    const Step = STEPS[this.step]

    let error
    if (this.props.error) {
      error = <Error message={this.props.error} />
    }

    return (
      <div className="start-modal-content">
        {error}
        <Step
          metamaskAuth={this._metamaskAuth}
          close={this.props.close}
          nextStep={this.props.nextStep}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    public_address: state.auth.address,
    isWeb3Connected: state.other.isWeb3Connected,
  }
}

export default drizzleConnect(withRouter(MetamaskContent), mapStateToProps)
