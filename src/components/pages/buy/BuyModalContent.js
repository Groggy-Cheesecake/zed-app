import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import { Translate } from 'react-localize-redux'

import PriceInput from '../../common/_base/PriceInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import IconInfo from '../../../assets/images/icn-info-grey-24.svg';
import WhiteIconInfo from '../../../assets/images/icn-info-24.svg'
import { formatNumber } from '@/utils'

// Styles
import 'rc-tooltip/assets/bootstrap.css'
import LoadingIndicator from '../../shared/LoadingIndicator'
// import PriceInput from '../../common/_base/PriceInput/PriceInput';

class BuyModalContent extends React.Component {
  static propTypes = {
    horse: PropTypes.object,
    horseImg: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    retry: PropTypes.bool,
    currentPrice: PropTypes.number,
    currentBatch: PropTypes.number,
    etherPrice: PropTypes.number,
    gasFee: PropTypes.number,
    closeModal: PropTypes.func,
    onConfirm: PropTypes.func,
    loading: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onConfirm()
  }

  render() {
    const horse = this.props.horse || {}
    const { closeModal, currentPrice, error, etherPrice, gasFee, loading, retry } = this.props

    let ErrorMessage = error ? (
      <span className="text-danger" key="msg">
        {error}
      </span>
    ) : null
    let Button = (
      <button
        className="primary-btn confirm-btn text-uppercase mx-auto"
        disabled={loading}
        onClick={error && !retry ? closeModal : null}
      >
        {error ? (
          retry ? (
            <Translate id="buy_page.retry" />
          ) : (
            <Translate id="buy_page.refresh" />
          )
        ) : (
          <Translate id="buy_page.confirm" />
        )}
      </button>
    )
    if (this.props.error) {
      Button = (
        <button className="green-btn confirm-btn text-uppercase" onClick={this.props.closeModal}>
          <Translate id="buy_page.refresh" />
        </button>
      )
      ErrorMessage = (
        <span className="text-danger" key="msg">
          {this.props.error}
        </span>
      )
    }

    return (
      <div className="buy-modal-content">
        <form className="buy-confirm-form" onSubmit={this.handleSubmit}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={closeModal} />
          {!loading ? (
            <section>
              <div className="section-header">
                <div className="md-text">
                  <Translate id="buy_page.buy_text" />
                </div>
              </div>
              <div className="section-content">
                {ErrorMessage}
                <div className="horse-part">
                  <img className="horse-img" src={horse.img_url} />
                  <div className="horse-info">
                    <div className="primary-text">{horse.name}</div>
                    <div className="overline-text sm text-uppercase genotype">
                      <span>{`Z${this.props.currentBatch}`}</span>
                      <span>{horse.gender}</span>
                    </div>
                  </div>
                </div>
                <div className="note-part">
                  <img className="icon" src={WhiteIconInfo} />
                  <div className="primary-text secondary">
                    You are about to make a request to purchase {horse.name}. During peak
                    transaction periods there is a chance you may receive another racehorse. By
                    pressing CONFIRM, you accept that the racehorse you are purchasing may vary.
                  </div>
                </div>
                <PriceInput
                  label="CURRENT PRICE"
                  ethPrice={formatNumber(currentPrice)}
                  usdPrice={formatNumber(currentPrice * etherPrice)}
                />
                <PriceInput
                  label="ESTIMATED GAS FEE"
                  infoIcon={true}
                  infoText={
                    <div>
                      A fee must be charged to perform transactions on the blockchain. This does not
                      go to ZED. This amount depends on the congestion levels on the blockchain
                      network. This fee is only an estimation and can vary slightly from time to
                      time.
                    </div>
                  }
                  ethPrice={formatNumber(gasFee, 4)}
                  usdPrice={formatNumber(gasFee * etherPrice)}
                />
                <PriceInput
                  label="ESTIMATED TOTAL"
                  ethPrice={formatNumber(currentPrice + gasFee)}
                  usdPrice={formatNumber((currentPrice + gasFee) * etherPrice)}
                />
              </div>
              <div className="section-footer">{Button}</div>
            </section>
          ) : (
            <section className="loading">
              <div className="section-header">
                <div className="md-text">
                  <Translate id="buy_page.buy_tip1" />
                </div>
              </div>
              <div className="section-content">
                <div className="overline-text sm">
                  <Translate id="buy_page.buy_tip2" options={{ renderInnerHtml: true }} />
                </div>
                <div className="loader-content">
                  <LoadingIndicator busy={true} />
                </div>
                <div className="normal-text tip">
                  <Translate id="buy_page.buy_tip3" />
                </div>
              </div>
            </section>
          )}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    address: state.auth.address,
    etherPrice: state.other.etherPrice,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default drizzleConnect(withRouter(BuyModalContent), mapStateToProps, mapDispatchToProps)
