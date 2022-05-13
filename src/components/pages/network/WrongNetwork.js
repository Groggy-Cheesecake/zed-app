import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { Translate, withLocalize } from 'react-localize-redux'

// Constants
import { CURRENT_NETWORK } from '@/const/GlobalData'
import i18n from '@/const/i18n/WrongNetwork'

// Images
import MetaMask from '../../../assets/images/img-metamask-wrong-network.png'

class WrongNetwork extends React.Component {
  static propTypes = {
    isWeb3Connected: PropTypes.bool,
    history: PropTypes.object,
    networkId: PropTypes.number,
    addTranslation: PropTypes.func,
  }

  componentDidMount() {
    if (this.props.networkId === CURRENT_NETWORK.id || !this.props.isWeb3Connected) {
      this.props.history.push('/home/start')
    }
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ wrong_network: i18n })
  }

  render() {
    return (
      <div className="page-content wrong-network">
        <main>
          <div className="left">
            <div className="oops text-uppercase">
              <Translate id="oops" />
            </div>
            <div className="lg-text">
              <Translate id="wrong_network.subtitle" />
            </div>
            <div className="grey-text">
              <Translate id="wrong_network.text" /> <br />
              <span>{CURRENT_NETWORK.name}</span>
            </div>
          </div>
          <div className="right">
            <div className="video-content">
              <img src={MetaMask} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    networkId: state.other.networkId,
    isWeb3Connected: state.other.isWeb3Connected,
  }
}

export default drizzleConnect(withRouter(withLocalize(WrongNetwork)), mapStateToProps)
