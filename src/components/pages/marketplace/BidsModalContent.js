import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import moment from 'moment'

// Components
import LoadingIndicator from '../../shared/LoadingIndicator'

// Actions
import actions from 'state/actions'

// Constants
import i18n from '@/const/i18n/MarketplacePage'

// Images
import IcnClose from '../../../assets/images/icn-close-24.svg'

class BidsModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
    getAuctionBids: PropTypes.func,
    bids: PropTypes.array,
    auctionId: PropTypes.number,
    bidders: PropTypes.array,
    isLoading: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ marketplace: i18n })
  }

  componentDidMount() {
    this.props.getAuctionBids(this.props.auctionId, this.props.bidders)
  }

  render() {
    const { bids, isLoading } = this.props

    return (
      <div className="bids-modal-content">
        <div className="bids-history-form">
          <img className="icon close-icon" src={IcnClose} onClick={this.props.closeModal} />
          <section>
            <div className="section-header">
              <div className="md-text text-capitalize title">
                <Translate id="marketplace.bid_history" />
              </div>
            </div>
            <div className="section-content">
              {!isLoading ? (
                <div className="history-list">
                  <div className="list-item label">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="marketplace.from" />
                    </div>
                    <div className="overline-text sm text-uppercase date-field">
                      <Translate id="date" />
                    </div>
                    <div className="overline-text sm text-uppercase">
                      <Translate id="bid" />
                    </div>
                  </div>
                  {bids &&
                    bids.map((a, index) => (
                      <div className="list-item" key={index}>
                        <div className="primary-text text-capitalize green">
                          {a.bidderStableName}
                        </div>
                        <div className="primary-text text-capitalize date-field">
                          {moment.unix(a.bidTime).format('MMM D, YYYY - HH:mm')}
                        </div>
                        <div className="primary-text helpful text-capitalize details-field">
                          Details: <span className="green">0x9e68a5bdae1deea300b8…</span>
                        </div>
                        <div className="primary-text text-capitalize">
                          {a.bidVal} <span className="symbol">Ξ</span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="loader-content">
                  <LoadingIndicator busy={true} />
                </div>
              )}
            </div>
            <div className="section-footer">
              <button className="outline-btn md close-btn" onClick={this.props.closeModal}>
                <Translate id="marketplace.close" />
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bids: state.auction.bids,
    isLoading: state.auction.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuctionBids: (auctionId, bidders) =>
      dispatch(actions.auction.getAuctionBids(auctionId, bidders)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(BidsModalContent)),
  mapStateToProps,
  mapDispatchToProps,
)
