import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import Modal from 'react-modal'
import { Translate, withLocalize } from 'react-localize-redux'

// Components
import BidsModalContent from './BidsModalContent'
import PlaceBidModalContent from './PlaceBidModalContent'
import OffspringPerformanceModalContent from './OffspringPerformanceModalContent'
// import SearchFiltersBar from '../../common/SearchFiltersBar/SearchFiltersBar.js';
import LoadingIndicator from 'components/shared/LoadingIndicator'
import Accordion from 'components/common/Accordion/marketplace/Accordion'

// Actions
import actions from 'state/actions'

// Constants
import i18n from '@/const/i18n/MarketplacePage'

// Images
import GlowImg from '../../../assets/images/bkg-oval-top-bottom.svg'
import IconTime from '../../../assets/images/icn-time-24.svg'
import IconTrophy from '../../../assets/images/icn-trophy-24.svg'

class MarketplacePageContent extends React.Component {
  static propTypes = {
    address: PropTypes.string,
    isLoading: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    location: PropTypes.object,
    history: PropTypes.object,
    addTranslation: PropTypes.func,
    etherPrice: PropTypes.number,
    queryPrice: PropTypes.number,
    getEtherPrice: PropTypes.func,
    getQueryPrice: PropTypes.func,
    getOpenAuctions: PropTypes.func,
    loadMoreAuctions: PropTypes.func,
    auctions: PropTypes.array,
  }

  constructor(props) {
    super(props)

    this.state = {
      bidHistoryModal: false,
      offspringModal: false,
      placeBidModal: false,
      bidHorse: null,
      bidPrice: null,
    }

    this.openBidHistoryModal = this.openBidHistoryModal.bind(this)
    this.openPlaceBidModal = this.openPlaceBidModal.bind(this)

    this.props.addTranslation({ marketplace_page: i18n })
  }

  componentDidMount() {
    this.props.getEtherPrice()
    this.props.getQueryPrice()
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { etherPrice } = this.props

    if (etherPrice && etherPrice !== prevProps.etherPrice) {
      this.props.getOpenAuctions(etherPrice)
    }
  }

  get lastHorse() {
    return this.props.auctions[this.props.auctions.length - 1]
  }

  get hasMore() {
    return !this.props.isLoadingMore && this.lastHorse && !!this.lastHorse.horse_id
  }

  _loadMoreAuctions = () => {
    this.props.loadMoreAuctions(this.lastHorse.horse_id)
  }

  openModal = type => {
    this.setState({ [type]: true })
  }

  closeModal = type => {
    this.setState({ [type]: false })
  }

  openPlaceBidModal(bidHorse, bidPrice) {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/marketplace/start')
      return
    }

    this.setState({ bidHorse, bidPrice }, () => this.openModal('placeBidModal'))
  }

  openBidHistoryModal(auctionId, bidders) {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/marketplace/start')
      return
    }

    this.setState(
      {
        auctionId,
        bidders,
      },
      () => this.openModal('bidHistoryModal'),
    )
  }

  render() {
    const path = this.props.location.pathname

    return (
      <div className="page-content marketplace">
        <div className="tab-watch">
          <div className="tab-content">
            <div className="tab-list">
              <div
                className={`tab-item ${path === '/marketplace' ? 'active' : ''}`}
                onClick={() => this.props.history.push('/marketplace')}
              >
                <div className="item-content">
                  <img className="icon" src={IconTime} />
                  <div className="primary-text text-capitalize">
                    <Translate id="menu_items.auctions" />
                  </div>
                </div>
              </div>
              <div
                className={`tab-item ${path === '/stud' ? 'active' : ''}`}
                onClick={() => this.props.history.push('/stud')}
              >
                <div className="item-content">
                  <img className="icon" src={IconTrophy} />
                  <div className="primary-text text-capitalize">
                    <Translate id="stud" />
                  </div>
                </div>
              </div>
            </div>
            <div className="watch-status">
              <div className="watch-icon-wrapper">
                <div className="play-icon" />
              </div>
              <span className="primary-text secondary text-capitalize">
                <Translate id="watch" />
              </span>
              &nbsp;
              <span className="primary-text secondary text-uppercase">
                <Translate id="live" />
              </span>
            </div>
          </div>
        </div>

        <main>
          <section className="main-section">
            <img className="glow-bg" src={GlowImg} />
            <div className="marketplace">
              {/*<SearchFiltersBar/>*/}
              <div className="marketplace-content">
                <div className="accordion-label">
                  <div className="grey-text text-uppercase">
                    <Translate id="thoroughbred" />
                  </div>
                  <div className="right">
                    <div className="grey-text text-uppercase stable">
                      <Translate id="owner_stable" />
                    </div>
                    <div className="grey-text key text-uppercase">
                      <Translate id="time_left" />
                    </div>
                    <div className="grey-text bid text-uppercase">
                      <Translate id="bid" />
                    </div>
                  </div>
                </div>
                <div className="accordion-content">
                  <div className="accordion" role="tablist">
                    {this.props.isLoading && !this.props.auctions.length ? (
                      <div style={{ minHeight: '300px', position: 'relative' }}>
                        <LoadingIndicator busy={this.props.isLoading} />
                      </div>
                    ) : (
                      <Accordion
                        loadMore={this._loadMoreAuctions}
                        hasMore={this.hasMore}
                        panels={this.props.auctions}
                        openOffspringModal={() => this.openModal('offspringModal')}
                        openBidHistoryModal={this.openBidHistoryModal}
                        openPlaceBidModal={this.openPlaceBidModal}
                        activeTab={-1}
                      />
                    )}
                    {this.props.isLoadingMore && (
                      <div style={{ marginTop: '50px', position: 'relative' }}>
                        <LoadingIndicator busy={this.props.isLoadingMore} relative />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Modal
          key="modal-offspring"
          className="offspring-performance-modal"
          isOpen={this.state.offspringModal}
          onRequestClose={() => this.closeModal('offspringModal')}
          ariaHideApp={false}
        >
          <OffspringPerformanceModalContent closeModal={() => this.closeModal('offspringModal')} />
        </Modal>

        <Modal
          key="modal-place-bid"
          className="place-bid-confirm-modal"
          isOpen={this.state.placeBidModal}
          onRequestClose={() => this.closeModal('placeBidModal')}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <PlaceBidModalContent
            closeModal={() => this.closeModal('placeBidModal')}
            horse={this.state.bidHorse}
            bidPrice={this.state.bidPrice}
          />
        </Modal>

        <Modal
          key="modal-bids"
          className="bids-history-modal"
          isOpen={this.state.bidHistoryModal}
          onRequestClose={() => this.closeModal('bidHistoryModal')}
          ariaHideApp={false}
        >
          <BidsModalContent
            closeModal={() => this.closeModal('bidHistoryModal')}
            auctionId={this.state.auctionId}
            bidders={this.state.bidders}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    address: state.auth.address,
    isLoggedIn: state.auth.completed,
    queryPrice: state.stud.queryPrice,
    etherPrice: state.other.etherPrice,
    ...state.auction,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEtherPrice: () => dispatch(actions.getEtherPrice()),
    getQueryPrice: () => dispatch(actions.stud.getQueryPrice()),
    getOpenAuctions: etherPrice => dispatch(actions.auction.getOpenAuctions(etherPrice)),
    // loadMoreAuctions: () => dispatch(actions.auction.getOpenAuctions()),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(MarketplacePageContent)),
  mapStateToProps,
  mapDispatchToProps,
)
