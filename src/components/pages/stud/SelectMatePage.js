import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import Modal from 'react-modal'
import { withRouter } from 'react-router'
import { Translate, withLocalize } from 'react-localize-redux'
import Tooltip from 'rc-tooltip'
import moment from 'moment'

// Constants
import i18n from '@/const/i18n/SelectMatePage'
import { ERROR_MESSAGES, UNNAMED_FOAL } from '@/const/GlobalData'
import breedTypeIcons from '../../static/gender'

// Actions
import actions from 'state/actions'

// Utils
import { formatNumber } from '@/utils'

// Services
import { areHorsesRelated } from '@/services/ContractsService'

// Components
import FemaleSelectModalContent from './FemaleSelectModalContent.js'
import BreedingConfirmModalContent from './BreedingConfirmModalContent.js'
import LoadingIndicator from 'components/shared/LoadingIndicator'

// Images
import NoHorseImg from '../../../assets/images/img-no-horse.png'
import IconStud from '../../../assets/images/icn-stud-24.svg'
import IconStudActive from '../../../assets/images/icn-stud-color-24.svg'
import Back from '../../../assets/images/icn-arrow-back-24.svg'
import Horse from '../../../assets/images/icn-horse-24.svg'
import Cube from '../../../assets/images/icn-cube-24.svg'
import Coat from '../../../assets/images/icn-bann-24.svg'
import Career from '../../../assets/images/icn-career.svg'
import Dna from '../../../assets/images/icn-dna-24.svg'
import Offspring from '../../../assets/images/icn-offspring-24.svg'
import InfoWarning from '../../../assets/images/icn-info-warning-24.svg'
import Info from '../../../assets/images/icn-info-white-24.svg'

class SelectMatePage extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
    match: PropTypes.object,
    mintingHorse: PropTypes.object,
    loadMintingHorse: PropTypes.func,
    femaleHorses: PropTypes.array,
    loadFemaleHorses: PropTypes.func,
    address: PropTypes.string,
    breedHorse: PropTypes.func,
    history: PropTypes.shape({
      goBack: PropTypes.func,
      location: PropTypes.object,
      push: PropTypes.func,
    }),
    createActivity: PropTypes.func,
    isMintingHorseLoading: PropTypes.bool,
    isStableLoading: PropTypes.bool,
    etherPrice: PropTypes.number,
    socketBreedingChannel: PropTypes.object,
    isRelated: PropTypes.bool,

    // Auth check
    isWeb3Connected: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      breedingConfirmModal: false,
      femaleSelectModal: false,
      selectedMate: {},
      isLoadingBreeding: false,
      error: null,
    }

    this._onChangeMate = this._onChangeMate.bind(this)
    this._breedHorse = this._breedHorse.bind(this)
    this._checkActivity = this._checkActivity.bind(this)

    this.props.addTranslation({ select_mate: i18n })
  }

  componentDidMount() {
    const { history, loadMintingHorse, match } = this.props

    loadMintingHorse(match.params.horseId)

    if (history.location.state && history.location.state.horseToBreeding) {
      this.setState({
        selectedMate: history.location.state.horseToBreeding,
      })
    }
  }

  componentDidUpdate() {
    const { history, isWeb3Connected } = this.props

    if (isWeb3Connected !== null && !isWeb3Connected) {
      history.push('/home/start')
    }
  }

  _onChangeMate(selectedMate) {
    this.setState({ selectedMate })
  }

  _checkActivity() {
    this.props.history.push('/activity')
  }

  _breedHorse() {
    const { address, breedHorse, createActivity, mintingHorse, socketBreedingChannel } = this.props
    const { selectedMate } = this.state

    const parents = {
      father: Number.parseInt(mintingHorse.horse_id),
      mother: Number.parseInt(selectedMate.horse_id),
    }

    this.setState({
      isLoadingBreeding: true,
    })

    areHorsesRelated(parents).then(data => {
      if (data.isRelated) {
        this.setState({
          isLoadingBreeding: false,
          error: ERROR_MESSAGES.HORSES_RELATED,
        })
      } else {
        const promise = new Promise((resolve, reject) => {
          socketBreedingChannel.push('new_offspring_data', parents).receive('error', reject)

          socketBreedingChannel.on('phx_reply', data => {
            if (data.status === 'ok') {
              resolve(data.response)
            } else {
              reject(data)
            }
          })
        })

        return promise
          .then(({ offspring_data }) => {
            // Add `0.0001` ETH to avoid rounding issue for values less than `0.00005` ETH
            const mating_price =
              address === mintingHorse.owner
                ? Number((mintingHorse.mating_price * 0.65).toFixed(4)) + 0.0001
                : mintingHorse.mating_price

            return breedHorse(parents, address, mating_price, offspring_data)
              .then(({ payload: tx_hash, error }) => {
                if (error || !tx_hash) {
                  this.setState({
                    isLoadingBreeding: false,
                    error: <Translate id="something_went_wrong" />,
                  })
                } else {
                  socketBreedingChannel.push('confirm')

                  return createActivity({
                    params: {
                      code: '3',
                      horse_list: [selectedMate.name, mintingHorse.name],
                      mating_horse: mintingHorse.name,
                      tx_hash,
                    },
                  }).then(() => {
                    this.setState({
                      isLoadingBreeding: false,
                      error: null,
                    })
                  })
                }
              })
              .catch(() => {
                this.setState({
                  isLoadingBreeding: false,
                  error: <Translate id="something_went_wrong" />,
                })
              })
          })
          .catch(err => {
            this.setState({
              isLoadingBreeding: false,
              error: err.error ? err.error : <Translate id="something_went_wrong" />,
            })
          })
      }
    })
  }

  openBreedingConfirmModal = () => {
    this.setState({ breedingConfirmModal: true }, this._breedHorse)
  }

  closeBreedingConfirmModal = () => {
    // Fetch the latest `breeding_counter` of the minting horse
    const { mintingHorse, loadMintingHorse } = this.props
    this.setState({ breedingConfirmModal: false, error: null, selectedMate: {} }, () =>
      loadMintingHorse(mintingHorse.horse_id),
    )
  }

  openFemaleSelectModal = () => {
    // Fetch the female horses of the owner stable to have latest `breeding_counter` value
    this.setState({ femaleSelectModal: true }, () =>
      this.props.loadFemaleHorses(this.props.address),
    )
  }

  closeFemaleSelectModal = () => {
    this.setState({ femaleSelectModal: false })
  }

  render() {
    const { address, isMintingHorseLoading, mintingHorse } = this.props
    const { selectedMate } = this.state

    if (!mintingHorse || isMintingHorseLoading) {
      return <LoadingIndicator busy fixed />
    }

    const mating_price =
      address === mintingHorse.owner
        ? mintingHorse.mating_price * 0.65
        : parseFloat(mintingHorse.mating_price)

    return (
      <div className="page-content select-mate">
        <main>
          <section className="top-section">
            <div className="title">
              <div className="back-part" onClick={() => this.props.history.goBack()}>
                <img className="icon" src={Back} />
                <div className="primary-text text-capitalize">
                  <Translate id="back" />
                </div>
              </div>
              <h2 className="lg-text text-capitalize">
                <Translate id="select_mate.breeding" />
              </h2>
            </div>
            <div className="select-mate-part">
              <div className="female-part">
                <div className="overline-text sm text-uppercase female-text">
                  <Translate id="select_mate.female" />
                </div>
                {Object.keys(selectedMate).length !== 0 ? (
                  <div className="female-content selected" onClick={this.openFemaleSelectModal}>
                    <div className="overline-text bold text-capitalize">
                      {selectedMate.name || UNNAMED_FOAL}
                    </div>
                    <Translate>
                      {({ translate }) => (
                        <div
                          className="primary-caption secondary"
                          dangerouslySetInnerHTML={{
                            __html: translate('select_mate.selected_mate', {
                              horse: selectedMate.name || UNNAMED_FOAL,
                            }),
                          }}
                        />
                      )}
                    </Translate>
                  </div>
                ) : (
                  <div className="female-content" onClick={this.openFemaleSelectModal}>
                    <div className="overline-text text-capitalize green">
                      <Translate id="select_mate.select_female" />
                    </div>
                  </div>
                )}
              </div>
              {Object.keys(selectedMate).length !== 0 ? (
                <img className="icon-stud" src={IconStudActive} />
              ) : (
                <img className="icon-stud deactive" src={IconStud} />
              )}
              <div className="stud-part">
                <div className="overline-text sm text-uppercase stud-text">
                  <Translate id="stud" />
                </div>
                <div className="stud-content">
                  <div className="overline-text bold text-capitalize">
                    {mintingHorse.name || UNNAMED_FOAL}
                  </div>
                  <Translate>
                    {({ translate }) => (
                      <div
                        className="primary-caption secondary"
                        dangerouslySetInnerHTML={{
                          __html: translate('select_mate.breed_text', {
                            horse: mintingHorse.name || UNNAMED_FOAL,
                          }),
                        }}
                      />
                    )}
                  </Translate>
                </div>
              </div>
            </div>
            <div className="horse-img-part">
              <div className="mate-horse">
                <img
                  className="horse-img"
                  src={
                    Object.keys(selectedMate).length !== 0
                      ? `https://cdn.zed.run/images/${this.state.selectedMate.hex_code}.svg`
                      : NoHorseImg
                  }
                />
              </div>
              <div className="male-horse">
                <img
                  className="horse-img"
                  src={`https://cdn.zed.run/images/${mintingHorse.hex_code}.svg`}
                />
              </div>
              <div className="stud-properties">
                <div className="property">
                  <img className="icon property-img" src={Horse} />
                  <div className="primary-text secondary">{mintingHorse.bloodline}</div>
                </div>
                <div className="property">
                  {breedTypeIcons[mintingHorse.breed_type] ? (
                    <img
                      className="icon property-img gen"
                      src={breedTypeIcons[mintingHorse.breed_type]}
                    />
                  ) : (
                    <img className="icon property-img" src={Dna} />
                  )}
                  <div className="primary-text secondary">
                    {mintingHorse.genotype}
                    <span className="primary-text helpful breed-type">
                      {mintingHorse.breed_type.capitalize()}
                    </span>
                  </div>
                </div>
                <div className="property">
                  <img className="icon property-img" src={Cube} />
                  <div className="primary-text secondary">{mintingHorse.horse_type}</div>
                </div>
                <div className="property">
                  {mintingHorse.hex_code ? (
                    <div
                      className="property-img-coat"
                      style={{ backgroundColor: `#${mintingHorse.hex_code}` }}
                    />
                  ) : (
                    <img className="icon property-img" src={Coat} />
                  )}
                  <div className="primary-text secondary">{mintingHorse.color}</div>
                </div>
              </div>
              {Object.keys(selectedMate).length !== 0 ? (
                <div className="female-properties">
                  <div className="property">
                    <img className="icon property-img" src={Horse} />
                    <div className="primary-text secondary">{selectedMate.bloodline}</div>
                  </div>
                  <div className="property">
                    {breedTypeIcons[selectedMate.breed_type] ? (
                      <img
                        className="icon property-img gen"
                        src={breedTypeIcons[selectedMate.breed_type]}
                      />
                    ) : (
                      <img className="icon property-img" src={Dna} />
                    )}
                    <div className="primary-text secondary">
                      {selectedMate.genotype}
                      <span className="primary-text helpful breed-type">
                        {selectedMate.breed_type && selectedMate.breed_type.capitalize()}
                      </span>
                    </div>
                  </div>
                  <div className="property">
                    <img className="icon property-img" src={Cube} />
                    <div className="primary-text secondary">{selectedMate.horse_type}</div>
                  </div>
                  <div className="property">
                    {selectedMate.hex_code ? (
                      <div
                        className="property-img-coat"
                        style={{ backgroundColor: `#${selectedMate.hex_code}` }}
                      />
                    ) : (
                      <img className="icon property-img" src={Coat} />
                    )}
                    <div className="primary-text secondary">{selectedMate.color}</div>
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className={`performance-part ${
                Object.keys(selectedMate).length !== 0 ? 'selected' : ''
              }`}
            >
              {Object.keys(selectedMate).length !== 0 ? (
                <div className="performance-content">
                  <div className="overline-text sm text-uppercase">
                    <Translate id="select_mate.performance" />
                  </div>
                  <div className="property">
                    <img className="icon property-img" src={Career} />
                    <div className="primary-text">{selectedMate.career}</div>
                  </div>
                  <div className="property">
                    <img className="icon property-img" src={Offspring} />
                    <div className="primary-text offspring">
                      {selectedMate.offspring}
                      <span className="amber">{selectedMate.breeding_counter} of 2 left</span>
                      <Tooltip
                        overlayClassName="offspring-tooltip"
                        placement="bottom"
                        overlay={
                          <div className="offspring-content">
                            <img className="icon" src={InfoWarning} />
                            <div className="">
                              <div className="overline-text white">
                                {selectedMate.breeding_counter} more breed(s) left
                              </div>
                              <div className="primary-text secondary note">
                                Your <span className="white">{selectedMate.horse_type}</span> can
                                breed two more times during the current breeding cycle. Your next
                                breeding cycle will commence on{' '}
                                {moment(selectedMate.tx_date)
                                  .add(1, 'M')
                                  .format('Do MMMM')}
                                .
                              </div>
                              {/*<div className="primary-text amber">Learn more</div>*/}
                            </div>
                          </div>
                        }
                      >
                        <img className="icon" src={InfoWarning} />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="performance-content">
                <div className="overline-text sm text-uppercase">
                  <Translate id="select_mate.performance" />
                </div>
                <div className="property">
                  <img className="icon property-img" src={Career} />
                  <div className="primary-text">{mintingHorse.career}</div>
                </div>
                <div className="property">
                  <img className="icon property-img" src={Offspring} />
                  <div className="primary-text offspring">
                    {mintingHorse.offspring}
                    <span className="primary-text helpful">
                      {mintingHorse.breeding_counter} of 7 left
                    </span>
                    <Tooltip
                      placement="bottom"
                      overlayStyle={{ maxWidth: '35rem' }}
                      overlay={
                        <div className="primary-text">
                          This {mintingHorse.horse_type} can breed {mintingHorse.breeding_counter}{' '}
                          times during their breeding cycle.
                        </div>
                      }
                    >
                      <img className="icon stud" src={Info} />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="main-section">
            <div className="breeding">
              <div className="breeding-content">
                {Object.keys(selectedMate).length !== 0 ? (
                  <div className="breeding-part">
                    <Translate>
                      {({ translate }) => (
                        <div
                          className="primary-text secondary breeding-note"
                          dangerouslySetInnerHTML={{
                            __html: translate('select_mate.breeding_note', {
                              horse1: mintingHorse.name,
                              horse2: selectedMate.name,
                            }),
                          }}
                        />
                      )}
                    </Translate>
                    <div className="confirm-part">
                      {address === mintingHorse.owner ? (
                        <React.Fragment>
                          <div className="grey-text price-text old">
                            {mintingHorse.mating_price} ETHER ($
                            {formatNumber(mintingHorse.mating_price * this.props.etherPrice)} USD)
                          </div>
                          <div className="discount-percent">
                            <Translate id="select_mate.discount_percent" />
                          </div>
                          <div className="grey-text price-text">
                            {formatNumber(mating_price)} ETHER ($
                            {formatNumber(mating_price * this.props.etherPrice)} USD)
                          </div>
                        </React.Fragment>
                      ) : (
                        <div className="grey-text price-text">
                          {formatNumber(mating_price)} ETHER ($
                          {formatNumber(mating_price * this.props.etherPrice)} USD)
                        </div>
                      )}
                      <div className="breeding-btns">
                        <button className="green-btn disable price-btn">
                          {formatNumber(mating_price)}&nbsp;<span className="symbol">Ξ</span>
                        </button>
                        <button
                          className="primary-btn buy-cover-btn text-uppercase"
                          onClick={this.openBreedingConfirmModal}
                          disabled={!selectedMate}
                        >
                          <Translate id="select_mate.buy_cover" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="breeding-part">
                    <div className="primary-text secondary">
                      <Translate id="select_mate.to_proceed" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        {this.state.isLoadingBreeding ? (
          <LoadingIndicator fixed busy />
        ) : (
          <Modal
            key="modal-breeding"
            className="breeding-confirm-modal"
            isOpen={this.state.breedingConfirmModal}
            onRequestClose={this.closeBreedingConfirmModal}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
          >
            <BreedingConfirmModalContent
              closeModal={this.closeBreedingConfirmModal}
              father={mintingHorse}
              mother={selectedMate}
              onSubmit={this._checkActivity}
              error={this.state.error}
            />
          </Modal>
        )}

        <Modal
          key="female-select"
          className="female-select-modal"
          isOpen={this.state.femaleSelectModal}
          onRequestClose={this.closeFemaleSelectModal}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <FemaleSelectModalContent
            closeModal={this.closeFemaleSelectModal}
            options={this.props.femaleHorses}
            isStableLoading={this.props.isStableLoading}
            onChangeMate={this._onChangeMate}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mintingHorse: state.stud.currentItem,
    address: state.auth.address,
    femaleHorses: state.stable.femaleHorses,
    isMintingHorseLoading: state.stud.isLoading,
    isStableLoading: state.stable.isLoading,
    etherPrice: state.other.etherPrice,
    socketBreedingChannel: state.market.socketBreedingChannel,
    isRelated: state.stud.isRelated,

    // Auth check
    isWeb3Connected: state.other.isWeb3Connected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    areHorsesRelated: parents => dispatch(actions.stud.areHorsesRelated(parents)),
    breedHorse: (fatherId, motherId, address, price, hash) =>
      dispatch(actions.stud.breedHorse(fatherId, motherId, address, price, hash)),
    createActivity: data => dispatch(actions.activity.createItem(data)),
    loadFemaleHorses: address => dispatch(actions.stable.loadFemaleHorses(address)),
    loadMintingHorse: id => dispatch(actions.stud.loadCurrentItem(id)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(SelectMatePage)),
  mapStateToProps,
  mapDispatchToProps,
)
