import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import { Translate } from 'react-localize-redux'

// Components
import PriceInput from '../../common/_base/PriceInput'
import LoadingIndicator from '../../shared/LoadingIndicator'

// Actions
import actions from 'state/actions'

// Utils
import { formatNumber } from '@/utils'

// Styles
import 'rc-tooltip/assets/bootstrap.css'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import IconWarnning from '../../../assets/images/icn-info-warning-24.svg'

class PlaceBidModalContent extends React.Component {
  static propTypes = {
    address: PropTypes.string,
    bidPrice: PropTypes.string,
    createActivity: PropTypes.func,
    closeModal: PropTypes.func,
    error: PropTypes.string,
    history: PropTypes.object,
    horse: PropTypes.object,
    retry: PropTypes.bool,
    etherPrice: PropTypes.number,
    queryPrice: PropTypes.number,
    foundationAuctionBid: PropTypes.func,
    userAuctionBid: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      bidPrice: props.bidPrice || props.horse.minBidPrice,
      isLoading: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  _onChangePrice = obj => {
    this.setState({ bidPrice: obj.value })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { address, closeModal, createActivity, history, horse, foundationAuctionBid } = this.props
    const { bidPrice } = this.state

    this.setState({ isLoading: true }, () => {
      foundationAuctionBid(address, bidPrice, horse.auctionId)
        .then(({ payload: tx_hash, error }) => {
          if (error || !tx_hash) {
            throw 'Something went wrong!'
          } else {
            createActivity({
              params: {
                code: '6',
                horse_list: [horse.name],
                tx_hash,
              },
            }).then(() => {
              this.setState({ isLoading: false }, () => {
                closeModal()
                history.push('/activity')
              })
            })
          }
        })
        .catch(() => {
          this.setState({ isLoading: false })
        })
    })
  }

  render() {
    const { closeModal, error, etherPrice, horse, queryPrice, retry } = this.props
    const { bidPrice, isLoading } = this.state

    const bidPriceNumber = parseFloat(bidPrice)
    const minBidPriceNumber = parseFloat(horse.minBidPrice)
    const fee = bidPriceNumber * 0.08
    const totalPrice = bidPriceNumber + fee + queryPrice

    const ErrorMessage = error ? (
      <span className="text-danger" key="msg">
        {error}
      </span>
    ) : null
    const Button = (
      <div className="handle-btns">
        <button
          className="primary-btn confirm-btn text-uppercase"
          disabled={isLoading || bidPriceNumber < minBidPriceNumber}
          onClick={error && !retry ? closeModal : null}
        >
          {error ? (
            retry ? (
              <Translate id="marketplace_page.retry" />
            ) : (
              <Translate id="marketplace_page.refresh" />
            )
          ) : (
            <Translate id="marketplace_page.confirm" />
          )}
        </button>
      </div>
    )

    return (
      <div className="place-bid-modal-content">
        <form className="place-bid-confirm-form" onSubmit={this.handleSubmit}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={closeModal} />
          {!isLoading ? (
            <section>
              <div className="section-header">
                <div className="md-text">
                  <Translate id="marketplace_page.place_bid_text" />
                </div>
              </div>
              <div className="section-content">
                {ErrorMessage}
                <div className="horse-part">
                  <img className="horse-img" src={horse.img_url} />
                  <div className="horse-info">
                    <div className="primary-text">{horse.name}</div>
                    <div className="overline-text sm text-uppercase genotype">
                      <span>{horse.genotype}</span>
                      <span>{horse.gender}</span>
                    </div>
                  </div>
                </div>
                <div className="note-part">
                  <img className="icon" src={IconWarnning} />
                  <div>
                    <div className="overline-text white">Please take a note</div>
                    <div className="primary-text secondary">
                      This racehorse has <span className="white">19</span> covers left
                    </div>
                  </div>
                </div>
                <PriceInput
                  label="BID PRICE"
                  infoIcon={true}
                  infoText={<div>Minimum price to enter the bid</div>}
                  ethPrice={bidPrice}
                  usdPrice={formatNumber(bidPrice * etherPrice)}
                  minPrice={minBidPriceNumber}
                  onChange={this._onChangePrice}
                />
                <PriceInput
                  label="ZED FEE"
                  infoIcon={true}
                  infoText={
                    <div>
                      A fee must be charged to perform transactions on the blockchain. This does not
                      go to ZED. This amount depends on the congestion levels on the blockchain
                      network. This fee is only an estimation and can vary slightly from time to
                      time.
                    </div>
                  }
                  ethPrice={formatNumber(fee)}
                  usdPrice={formatNumber(fee * etherPrice)}
                />
                <PriceInput
                  label="ESTIMATED TOTAL"
                  ethPrice={totalPrice}
                  usdPrice={formatNumber(totalPrice * etherPrice)}
                />
              </div>
              <div className="section-footer">{Button}</div>
            </section>
          ) : (
            <section className="loading">
              <div className="section-header">
                <div className="md-text">
                  <Translate id="marketplace_page.bid_tip1" />
                </div>
              </div>
              <div className="section-content">
                <div className="overline-text sm">
                  <Translate id="marketplace_page.bid_tip2" options={{ renderInnerHtml: true }} />
                </div>
                <div className="loader-content">
                  <LoadingIndicator busy={true} />
                </div>
                <div className="primary-caption secondary">
                  <Translate id="marketplace_page.bid_tip3" />
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
    error: state.auction.error,
    etherPrice: state.other.etherPrice,
    queryPrice: state.stud.queryPrice,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createActivity: data => dispatch(actions.activity.createItem(data)),
    foundationAuctionBid: (address, amount, auctionId) =>
      dispatch(actions.auction.foundationAuctionBid(address, amount, auctionId)),
    userAuctionBid: (address, amount, auctionId) =>
      dispatch(actions.auction.userAuctionBid(address, amount, auctionId)),
  }
}

export default drizzleConnect(withRouter(PlaceBidModalContent), mapStateToProps, mapDispatchToProps)
