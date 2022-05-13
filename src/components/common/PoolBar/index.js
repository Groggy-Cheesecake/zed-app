import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withLocalize, Translate } from 'react-localize-redux'
import web3 from '@/services/clients/Web3Client'

// Constants
import { CURRENT_NETWORK } from '../../../const/GlobalData'

// Components
import LoadingIndicator from '../../shared/LoadingIndicator'

// Styles
import './_pool_bar.scss'

class PoolBar extends React.Component {
  static propTypes = {
    etherPrice: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      ether: null,
      racingPoolAddr: null,
    }

    this.pullBalance = this.pullBalance.bind(this)
  }

  componentDidMount() {
    this.setState({ racingPoolAddr: CURRENT_NETWORK.CONTRACT_ADDRESSES.RACING }, () => {
      setInterval(this.pullBalance, 5000)
    })
  }

  pullBalance() {
    web3.eth.getBalance(this.state.racingPoolAddr).then(wei => {
      const ether = web3.utils.fromWei(wei)
      this.setState({ ether: parseFloat(ether).toFixed(4) })
    })
  }

  render() {
    return (
      <div className="pool-bar">
        {this.state.ether ? (
          <div className="pool-bar-content">
            <div className="left">
              <div className="primary-caption text-uppercase pool-label">RACING PRIZE POOL</div>
              <div className="primary-caption secondary pool-eth">
                {this.state.ether} <span className="symbol">Ξ</span>
              </div>
              <a href={`https://etherscan.io/address/${this.state.racingPoolAddr}`} target="_blank">
                <div className="primary-caption helpful pool-addr">
                  {this.state.racingPoolAddr.substr(0, 15)}...
                </div>
              </a>
            </div>
            <div className="right">
              <div className="primary-caption secondary">
                $ {(this.state.ether * this.props.etherPrice).toFixed(2)} USD
              </div>
            </div>
          </div>
        ) : (
          <div className="pool-bar-content loader">
            <LoadingIndicator busy={!this.state.ether} relative={true} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    etherPrice: state.other.etherPrice,
  }
}

export default drizzleConnect(withLocalize(PoolBar), mapStateToProps)
