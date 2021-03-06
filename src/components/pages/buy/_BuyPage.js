import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import Tooltip from 'rc-tooltip'
import Modal from 'react-modal'
import { Translate, withLocalize } from 'react-localize-redux'
import { withRouter } from 'react-router'
import { detect } from 'detect-browser'

// Constants
import i18n from '@/const/i18n/BuyPage'
// import { SUPPORTED_BROWSERS } from '@/const/GlobalData';

// Actions
import actions from 'state/actions'

// Components
import BuyModalContent from './BuyModalContent.js'
import SupportBrowserContent from '../../common/SupportBrowser'

// Images
import Horse from '../../../assets/images/icn-horse-24.svg'
import Dna from '../../../assets/images/icn-dna-24.svg'
import Cube from '../../../assets/images/icn-cube-24.svg'
import Coat from '../../../assets/images/icn-bann-24.svg'
import Dots from '../../../assets/images/icn-dots-24.svg'
import Info from '../../../assets/images/icn-info-24.svg'

class BuyPageContent extends React.Component {
  static propTypes = {
    nextHorse: PropTypes.object,
    address: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    nextHorsePrice: PropTypes.number,
    nextHorsePriceUSD: PropTypes.number,
    socketLobbyChannel: PropTypes.object,
    releaseNumber: PropTypes.number,
    currentBatch: PropTypes.number,
    currentBloodline: PropTypes.string,
    getHorsesRemaining: PropTypes.func,
    estimateFee: PropTypes.func,
    createActivity: PropTypes.func,
    getEtherPrice: PropTypes.func,
    buyHorse: PropTypes.func,
    addTranslation: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      buyModalIsOpen: false,
      gasFee: 0,
      browser: null,
      browserModal: false,
      error: null,
      currentHorse: props.nextHorse,
    }
    this._handleBuyClick = this._handleBuyClick.bind(this)
    this.openBuyModal = this.openBuyModal.bind(this)
    this.closeBuyModal = this.closeBuyModal.bind(this)
    this.closeBrowserModal = this.closeBrowserModal.bind(this)

    this.props.addTranslation({ buy_page: i18n })
  }

  componentDidMount() {
    this.setState({ browser: detect().name })
  }

  componentDidUpdate() {
    const { currentHorse } = this.state
    const { nextHorse } = this.props
    if (
      !this.state.buyModalIsOpen &&
      this.props.nextHorse &&
      (!currentHorse || currentHorse.name !== nextHorse.name)
    ) {
      this.setState({
        currentHorse: this.props.nextHorse,
      })
    }
  }

  openBuyModal() {
    // if (!this.props.isLoggedIn) {
    //     this.props.history.push('/buy/start');
    //     return;
    // }

    // if (SUPPORTED_BROWSERS.indexOf(this.state.browser) === -1) {
    this.setState({ browserModal: true })
    // return;
    // }
    //
    // this.props.getEtherPrice().then(() => {
    //     this.props.estimateFee(this.props.address, this.props.nextHorsePrice)
    //         .then(({payload, error, isLoading}) => {
    //             this.setState({
    //                 buyModalIsOpen: true,
    //                 gasFee: (!error && !isLoading) ? payload : 0,
    //             });
    //         });
    // });
  }

  closeBuyModal() {
    this.setState({ buyModalIsOpen: false, error: null })
  }

  closeBrowserModal() {
    this.setState({ browserModal: false })
  }

  _handleBuyClick() {
    const horse = JSON.parse(JSON.stringify(this.state.currentHorse))
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props.socketLobbyChannel
          .push('buy_horse', {
            horse_name: horse.name,
          })
          .receive('ok', () => {
            this.props
              .buyHorse(horse, this.props.address, this.props.nextHorsePrice)
              .then(({ payload: tx_hash, error }) => {
                if (error || !tx_hash) {
                  this.setState({
                    loading: false,
                    error: <Translate id="something_went_wrong" />,
                  })
                } else {
                  this.props.socketLobbyChannel.push('horse_bought', {
                    horse_name: horse.name,
                    tx_hash,
                  })
                  return this.props
                    .createActivity({
                      params: {
                        code: '1',
                        horse_list: [horse.name],
                        tx_hash,
                      },
                    })
                    .then(() => {
                      this.setState(
                        {
                          loading: false,
                          buyModalIsOpen: false,
                        },
                        () => this.props.history.push('/activity'),
                      )
                    })
                }
              })
              .catch(() => {
                this.setState({
                  loading: false,
                })
              })
          })
          .receive('error', () => {
            this.setState({
              error: <Translate id="buy_page.horse_bought" />,
              loading: false,
            })
          })
      },
    )
  }

  render() {
    const nextHorse = this.state.currentHorse || {}

    return (
      <div className="page-content buy mobile">
        <main>
          <section className="top-section">
            <div className="horse-introduction">
              <div className={`title ${(this.props.currentBloodline || '').toLowerCase()}`}>
                <div className="text-uppercase now-selling">
                  <Translate id="now_selling" />
                </div>
                <h2 className="lg-text horse-name">{nextHorse.name}</h2>
              </div>
              <div className="normal-text">
                {nextHorse.name} <Translate id="buy_page.horse_intro" />
              </div>
            </div>
            <div className="horse-img-part">
              <img className="horse-img" src={nextHorse.img_url} />
            </div>
          </section>

          <section className="main-section">
            <div className="buy-horse">
              <div className="buy-horse-part">
                <div className="buy-horse-content">
                  <div className="horse-properties">
                    <div className="property">
                      <img className="property-img" src={Horse} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="bloodline" />
                        </div>
                        <div className="normal-text">{this.props.currentBloodline}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Dna} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="gen" />
                        </div>
                        <div className="normal-text">
                          Z {this.props.currentBatch}
                          <Tooltip placement="bottom" overlay={`Zed ${this.props.currentBatch}`}>
                            <img className="icn-info" src={Info} />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Cube} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="gender" />
                        </div>
                        <div className="normal-text">{nextHorse.gender}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Coat} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="coat" />
                        </div>
                        <div className="normal-text">{nextHorse.color}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Dots} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="release_no" />
                        </div>
                        <div className="normal-text">
                          {this.props.releaseNumber}/1000
                          <Tooltip
                            placement="bottom"
                            overlay={`Number ${this.props.releaseNumber} of ZED ${this.props.currentBatch}`}
                          >
                            <img className="icn-info" src={Info} />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="handle-btns">
                    <button className="green-btn disable price-btn">
                      {this.props.nextHorsePrice}
                      <span className="symbol">??</span>
                    </button>
                    <div className="grey-text price-text">
                      {this.props.nextHorsePrice} ETHER (${this.props.nextHorsePriceUSD.toFixed(2)}{' '}
                      USD)
                    </div>
                    {this.props.isLoggedIn ? (
                      <button className="primary-btn text-uppercase" onClick={this.openBuyModal}>
                        <Translate id="buy_now" />
                      </button>
                    ) : (
                      <button className="primary-btn text-uppercase" onClick={this.openBuyModal}>
                        <Translate id="login_to_buy" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Modal
          key="modal-buy"
          className="buy-confirm-modal"
          isOpen={this.state.buyModalIsOpen}
          onRequestClose={this.closeBuyModal}
          ariaHideApp={false}
        >
          <BuyModalContent
            horseImg={nextHorse.img_url}
            currentPrice={this.props.nextHorsePrice}
            horse={this.state.currentHorse}
            gasFee={this.state.gasFee}
            closeModal={this.closeBuyModal}
            onConfirm={this._handleBuyClick}
            loading={this.state.loading}
            error={this.state.error}
          />
        </Modal>

        <Modal
          key="modal-browser"
          className="support-browser-modal mobile"
          isOpen={this.state.browserModal}
          onRequestClose={this.closeBrowserModal}
          ariaHideApp={false}
        >
          <SupportBrowserContent closeModal={this.closeBrowserModal} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.completed,
    address: state.auth.address,
    nextHorsePrice: state.market.nextHorsePrice,
    nextHorsePriceUSD: state.market.nextHorsePrice * state.other.etherPrice,
    socketLobbyChannel: state.market.socketLobbyChannel,
    nextHorse: state.market.nextHorse,
    releaseNumber: state.market.releaseNumber,
    currentBatch: state.market.currentBatch,
    currentBloodline: state.market.currentBloodline,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentBatch: () => dispatch(actions.market.getCurrentBatch()),
    getHorsesRemaining: gen => dispatch(actions.market.getRemaining(gen)),
    estimateFee: (address, price) => dispatch(actions.market.estimateFee(address, price)),
    buyHorse: (horse, address, price) => dispatch(actions.market.buyHorse(horse, address, price)),
    getEtherPrice: () => dispatch(actions.getEtherPrice()),
    createActivity: data => dispatch(actions.activity.createItem(data)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(BuyPageContent)),
  mapStateToProps,
  mapDispatchToProps,
)
