import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { drizzleConnect } from 'drizzle-react'
import { Translate, withLocalize } from 'react-localize-redux'
import { withRouter } from 'react-router'

// Actions
import actions from 'state/actions'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import i18n from '@/const/i18n/StablePage'

// Components
import Checkbox from '../../common/_base/Checkbox'
import PriceInput from '../../common/_base/PriceInput'
import SelectField from '../../common/_base/SelectField'
import LoadingIndicator from '../../shared/LoadingIndicator'

import Info from '../../../assets/images/icn-info-white-24.svg'

const options = [
  {
    value: '1',
    label: '1 Day',
  },
  {
    value: '3',
    label: '3 Days',
  },
  {
    value: '5',
    label: '5 Days',
  },
  {
    value: '9',
    label: '9 Days',
  },
  {
    value: '21',
    label: '21 Days',
  },
]

// Minimum price to sell for in ETH
const minPrice = 0.01

class SellModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    history: PropTypes.object,
    addTranslation: PropTypes.func,
    error: PropTypes.string,
    createAuction: PropTypes.func,
    createActivity: PropTypes.func,
    address: PropTypes.string,
    etherPrice: PropTypes.number,
    queryPrice: PropTypes.number,
    horse: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      reservedPrice: '',
      termsChecked: false,
      duration: null,
      step: 1,
    }

    this._onTermsCheck = this._onTermsCheck.bind(this)
    this._onChangeDuration = this._onChangeDuration.bind(this)
    this.props.addTranslation({ stable_page: i18n })
  }

  _onTermsCheck(e) {
    this.setState({ termsChecked: e.target.checked })
  }

  _onChangeDuration(duration) {
    this.setState({ duration })
  }

  _onChangePrice = obj => {
    this.setState({ reservedPrice: obj.value })
  }

  _onStartAuction = () => {
    const {
      address,
      closeModal,
      createAuction,
      createActivity,
      history,
      horse,
      queryPrice,
    } = this.props
    const { duration, reservedPrice } = this.state

    this.setState({ isLoading: true }, () => {
      createAuction(address, queryPrice, duration.value, horse.horse_id, parseFloat(reservedPrice))
        .then(({ payload: tx_hash, error }) => {
          if (error || !tx_hash) {
            throw 'Something went wrong!'
          } else {
            createActivity({
              params: {
                code: '4',
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
    const { duration, isLoading, reservedPrice, termsChecked } = this.state
    const { closeModal, error, etherPrice, horse } = this.props
    const ErrorMessage = error ? (
      <span className="text-danger" key="msg">
        {error}
      </span>
    ) : null

    return (
      <div className="breed-content">
        <form className="breed-form">
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={closeModal} />
          {!isLoading ? (
            <section>
              <div className="section-header">
                <div className="md-text title">
                  <Translate id="stable_page.sell_modal_title" />
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
                      <span>{horse.horse_type}</span>
                    </div>
                  </div>
                </div>
                {this.state.step === 1 ? (
                  <React.Fragment>
                    <PriceInput
                      label="RESERVE PRICE"
                      infoIcon={true}
                      infoText={
                        <div>A fee must be charged to perform transactions on the blockchain</div>
                      }
                      ethPrice={reservedPrice}
                      usdPrice={reservedPrice * etherPrice}
                      minPrice={minPrice}
                      onChange={this._onChangePrice}
                    />
                    <PriceInput
                      label="ZED FEE"
                      infoIcon={true}
                      infoText={
                        <div>
                          A fee must be charged to perform transactions on the blockchain. This does
                          not go to ZED. This amount depends on the congestion levels on the
                          blockchain network. This fee is only an estimation and can vary slightly
                          from time to time.
                        </div>
                      }
                      ethPrice={reservedPrice * 0.08}
                      usdPrice={reservedPrice * etherPrice * 0.08}
                    />
                    <SelectField
                      label="AUCTION DURATION"
                      options={options}
                      value={duration}
                      onChange={this._onChangeDuration}
                      errorMsg="You must set the auction length"
                      placeholder="Set duration"
                    />
                    <div className="grey-text note">
                      <Translate id="stable_page.sell_modal_text" />
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="note-part">
                      <img className="icon" src={Info} />
                      <div className="primary-text secondary">
                        <Translate id="stable_page.warning_text" />
                      </div>
                    </div>
                    <div className="auction-info">
                      <div className="info-item">
                        <div className="primary-text secondary">
                          <Translate id="stable_page.auction_length" />
                        </div>
                        <div className="primary-text">{`${duration.value} days`}</div>
                      </div>
                      <div className="info-item">
                        <div className="primary-text secondary">
                          <Translate id="stable_page.auction_price" />
                        </div>
                        <div className="primary-text">
                          {reservedPrice}&nbsp;<span className="symbol">Ξ</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <div className="primary-text secondary">
                          <Translate id="stable_page.auction_zed_fee" />
                        </div>
                        <div className="primary-text">
                          {reservedPrice * 0.08}&nbsp;<span className="symbol">Ξ</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/about">
                      <div className="primary-text green learn-more">
                        <Translate id="stable_page.learn_more" />
                      </div>
                    </Link>
                  </React.Fragment>
                )}
              </div>
              {this.state.step === 1 ? (
                <div className="section-footer">
                  <Checkbox
                    className="terms"
                    checked={termsChecked}
                    onChange={this._onTermsCheck}
                    label={
                      'I agree to the &nbsp;<a href="/terms" target="_blank">terms and conditions</a>&nbsp; provided by the ZED'
                    }
                    tooltip="You should accept ZED terms and conditions to proceed"
                  />
                  <div className="handle-btns">
                    <button className="outline-btn md thin text-capitalize" onClick={closeModal}>
                      <Translate id="cancel" />
                    </button>
                    <button
                      className="primary-btn md thin text-capitalize"
                      disabled={
                        reservedPrice === '' ||
                        reservedPrice < minPrice ||
                        !termsChecked ||
                        this.state.duration === null
                      }
                      onClick={() => this.setState({ step: 2 })}
                    >
                      <Translate id="stable_page.button_start_auction" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="section-footer">
                  <div className="handle-btns">
                    <button
                      className="outline-btn md thin text-capitalize"
                      onClick={() => this.setState({ step: 1 })}
                    >
                      <Translate id="back" />
                    </button>
                    <button
                      className="primary-btn md thin text-capitalize"
                      disabled={
                        reservedPrice === '' ||
                        reservedPrice < minPrice ||
                        !termsChecked ||
                        this.state.duration === null
                      }
                      onClick={this._onStartAuction}
                    >
                      <Translate id="stable_page.confirm" />
                    </button>
                  </div>
                </div>
              )}
            </section>
          ) : (
            <section className="loading">
              <div className="section-header">
                <div className="md-text">
                  <Translate id="stable_page.sell_tip1" />
                </div>
              </div>
              <div className="section-content">
                <div className="grey-text">
                  <Translate id="stable_page.sell_tip2" options={{ renderInnerHtml: true }} />
                </div>
                <div className="loader-content">
                  <LoadingIndicator busy={true} />
                </div>
                <div className="normal-text tip">
                  <Translate id="stable_page.sell_tip3" />
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
    queryPrice: state.stud.queryPrice,
    etherPrice: state.other.etherPrice,
    error: state.auction.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createActivity: data => dispatch(actions.activity.createItem(data)),
    createAuction: (address, queryPrice, duration, horseId, minimum) =>
      dispatch(actions.auction.createAuction(address, queryPrice, duration, horseId, minimum)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(SellModalContent)),
  mapStateToProps,
  mapDispatchToProps,
)
