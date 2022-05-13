import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import { Translate, withLocalize } from 'react-localize-redux'
import Modal from 'react-modal'
import moment from 'moment'

// Constants
import i18n from '@/const/i18n/DedicatedPage'
import breedTypeIcons from '../../static/gender.js'

// Actions
import actions from 'state/actions'

// Components
// import OffspringTree from './OffspringTree';
import ShareModalContent from './ShareModalContent'
// import ToggleSwtich from '../../common/_base/ToggleSwitch/ToggleSwitch';
import LoadingIndicator from 'components/shared/LoadingIndicator'
import IconText from '../../common/_base/IconText'

// Images
import Horse from '../../../assets/images/icn-horse-24.svg'
import Dna from '../../../assets/images/icn-dna-24.svg'
import Cube from '../../../assets/images/icn-cube-24.svg'
// import Coat from '../../../assets/images/icn-bann-24.svg'
import Career from '../../../assets/images/icn-career.svg'
import Winrate from '../../../assets/images/icn-trophy-24.svg'
import Offspring from '../../../assets/images/icn-offspring-24.svg'
import Share from '../../../assets/images/icn-share-24.svg'
import Back from '../../../assets/images/icn-arrow-back-24.svg'
// import Edit from '../../../assets/images/icn-pencil-24.svg';
import Info from '../../../assets/images/icn-info-24.svg'
import Stud from '../../../assets/images/icn-stud-24.svg'
import Auction from '../../../assets/images/icn-auction-24.svg'
import Race from '../../../assets/images/icn-race-24.svg'
import BreedModalContent from '../stable/BreedModalContent'

class DedicatedPageContent extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    addTranslation: PropTypes.func,
    loadHorse: PropTypes.func,
    currentHorse: PropTypes.object,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    match: PropTypes.object,
    history: PropTypes.object,
    isOwner: PropTypes.bool,
    putHorseInStud: PropTypes.func,
    address: PropTypes.string,
    getQueryPrice: PropTypes.func,
    queryPrice: PropTypes.number,
    etherPrice: PropTypes.number,
    createActivity: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      shareModalIsOpen: false,
      breedModalIsOpen: false,
      hasOffspring: false,
    }

    this.openShareModal = this.openShareModal.bind(this)
    this.closeShareModal = this.closeShareModal.bind(this)
    this.openBreedModal = this.openBreedModal.bind(this)
    this.handlePlaceInStud = this.handlePlaceInStud.bind(this)
    this.selectMatePage = this.selectMatePage.bind(this)

    this.props.addTranslation({ dedicated_page: i18n })
  }

  componentDidMount() {
    this.props.loadHorse(this.props.match.params.horseId)
  }

  openShareModal() {
    this.setState({ shareModalIsOpen: true })
  }

  closeShareModal() {
    this.setState({ shareModalIsOpen: false })
  }

  selectMatePage() {
    this.props.history.push({
      pathname: `/${this.props.currentHorse.horse_id}/select-mate`,
    })
  }

  openBreedModal(data) {
    this.setState(
      {
        breedingHorse: data,
      },
      () => {
        if (['Colt', 'Stallion'].indexOf(this.props.currentHorse.horse_type) !== -1) {
          this.props.getQueryPrice()
          this.setState({ breedModalIsOpen: true })
        } else {
          this.props.history.push('/stud', { horseToBreeding: data })
        }
      },
    )
  }

  closeBreedModal() {
    this.setState({ breedModalIsOpen: false })
  }

  handlePlaceInStud(price, duration) {
    this.props
      .putHorseInStud(
        this.props.address,
        this.props.queryPrice,
        this.state.breedingHorse.horse_id.toString(),
        price,
        duration,
      )
      .then(({ payload: tx_hash, error }) => {
        if (error || !tx_hash) {
          throw 'Something went wrong!'
        } else {
          return this.props
            .createActivity({
              params: {
                code: '2',
                horse_list: [this.state.breedingHorse.name],
                tx_hash,
              },
            })
            .then(() => {
              this.closeBreedModal()
              this.props.history.push('/activity')
            })
        }
      })
  }

  render() {
    const { currentHorse, isLoading, isOwner } = this.props

    if (!currentHorse || isLoading) {
      return <LoadingIndicator busy fixed />
    }

    const { in_stud, on_sale } = currentHorse
    const isBreedingLimitReached = currentHorse.breeding_counter === 0

    return (
      <div className="page-content dedicate">
        <main>
          <section className="top-section">
            <div className="horse-introduction">
              <div className={`title ${currentHorse.bloodline.toLowerCase()}`}>
                <div className="left">
                  <div className="icn-part" onClick={() => this.props.history.goBack()}>
                    <img className="icon" src={Back} />
                    <div className="primary-text text-capitalize">
                      <Translate id="dedicated_page.back" />
                    </div>
                  </div>
                </div>

                {(!in_stud || isBreedingLimitReached) && !on_sale && (
                  <h2 className="lg-text horse-name">{currentHorse.name}</h2>
                )}
                {in_stud && !isBreedingLimitReached && (
                  <h2 className="lg-text horse-name in-stud">{currentHorse.name}</h2>
                )}
                {on_sale && <h2 className="lg-text horse-name on-sale">{currentHorse.name}</h2>}

                <div className="right">
                  {/*<div className="icn-part">
                    <img className="icon" src={Edit}/>
                    <div className="primary-text text-capitalize">
                      <Translate id="edit"/>
                    </div>
                  </div>*/}
                  <div className="icn-part" onClick={this.openShareModal}>
                    <img className="icon" src={Share} />
                    <div className="primary-text text-capitalize">
                      <Translate id="dedicated_page.share" />
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className="primary-text secondary description">
                <Translate id="dedicated_page.description"/>
              </div>*/}
            </div>
            <div className="horse-img-part">
              <img className="horse-img" src={currentHorse.img_url} />
            </div>
          </section>

          <section className="main-section">
            {// (isOwner && !in_stud && !on_sale) &&
            isOwner && !in_stud && (
              <div className="other-infos default">
                <div className="left">
                  <IconText
                    isDisabled={true}
                    icon={Auction}
                    translateId="sell"
                    onClick={null}
                    overlayText="Auctions coming soon"
                    data={null}
                  />
                  <IconText
                    isDisabled={isBreedingLimitReached}
                    icon={Stud}
                    translateId="breed"
                    onClick={isBreedingLimitReached ? null : this.openBreedModal}
                    overlayText={isBreedingLimitReached ? 'Breeding limit reached' : ''}
                    data={currentHorse}
                  />
                  <IconText
                    isDisabled={true}
                    icon={Race}
                    translateId="menu_items.racing"
                    onClick={null}
                    overlayText="Racing coming soon"
                    data={null}
                  />
                </div>
                <div className="right">
                  {/*<div className="toggle-part">
                    <div className="icon-text">
                      <img className="icon" src={Info}/>
                      <div className="primary-text secondary text-capitalize">
                        <Translate id="make_offer"/>
                      </div>
                    </div>
                    <ToggleSwtich className="toggle"/>
                    <div className="icon-text">
                      <img className="icon" src={Info}/>
                      <div className="primary-text secondary text-capitalize">
                        <Translate id="racing_lottery"/>
                      </div>
                    </div>
                    <ToggleSwtich className="toggle"/>
                  </div>*/}
                </div>
              </div>
            )}
            {isOwner && in_stud && (
              <div>
                <div className="other-infos">
                  <div className="left">
                    <div className="icon-text">
                      <img className="icon" src={Stud} />
                      <div className="primary-text helpful">
                        {currentHorse.name} is not eligible for stud duties until end.
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="label-text">
                      <div className="overline-text sm text-uppercase time-left">
                        <Translate id="time_left" />
                      </div>
                      <div className="primary-text">
                        {moment
                          .duration(currentHorse.time_left, 'seconds')
                          .format('d[d] h[h] m[m]')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="primary-text note-text">
                  {currentHorse.name} is available for breeding until{' '}
                  {moment()
                    .add(currentHorse.time_left, 'seconds')
                    .format('Do MMM YYYY')}
                </div>
              </div>
            )}
            {/*{
              (isOwner && on_sale) &&
              <div>
                <div className="other-infos">
                  <div className="left">
                    <div className="icon-text">
                      <img className="icon" src={Auction}/>
                      <div className="primary-text helpful">
                        {currentHorse.name} is not eligible for racing until sold. If racehorse is not sold, it will be
                        placed back into your stable.
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="label-text">
                      <div className="overline-text sm text-uppercase time-left">
                        <Translate id="time_left"/>
                      </div>
                      <div className="primary-text">2h 55m</div>
                    </div>
                  </div>
                </div>
                <div className="primary-text note-text">
                  This horse is being auctioned on the <span className="green">ZED Marketplace</span> The auction ends
                  on <b>Dec 12 2018</b>.
                </div>
              </div>
            }*/}
            {// (!isOwner && !in_stud && !on_sale) &&
            !isOwner && !in_stud && (
              <div className="other-infos">
                <div className="left">
                  <div className="label-text">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="owner_stable" />
                    </div>
                    <div className="primary-text helpful">{currentHorse.owner_stable}</div>
                  </div>
                </div>
                <div className="right">
                  {/*<button className="primary-btn md thin text-capitalize">
                    <Translate id="make_offer"/>
                  </button>*/}
                </div>
              </div>
            )}
            {!isOwner && in_stud && (
              <div>
                <div className="other-infos">
                  <div className="left">
                    <div className="label-text-right">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="owner_stable" />
                      </div>
                      <div className="primary-text">{currentHorse.owner_stable}</div>
                    </div>
                    <div className="label-text-right">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="time_left" />
                      </div>
                      <div className="primary-text">
                        {moment
                          .duration(currentHorse.time_left, 'seconds')
                          .format('d[d] h[h] m[m]')}
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="stud_fee" />
                    </div>
                    <img className="icon info" src={Info} />
                    <div className="fee-price">
                      <div className="primary-text">
                        {currentHorse.mating_price}&nbsp;<span className="symbol">Ξ</span>
                      </div>
                    </div>
                    <button
                      className="primary-btn md thin text-capitalize"
                      onClick={this.selectMatePage}
                    >
                      <Translate id="select_mate" />
                    </button>
                  </div>
                </div>
                <div className="primary-text note-text">
                  {currentHorse.name} is available for breeding until{' '}
                  {moment()
                    .add(currentHorse.time_left, 'seconds')
                    .format('Do MMM YYYY')}
                </div>
              </div>
            )}
            {/*{
              (!isOwner && on_sale) &&
              <div>
                <div className="other-infos">
                  <div className="left">
                    <div className="label-text">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="owner_stable"/>
                      </div>
                      <div className="primary-text helpful">{currentHorse.owner_stable}</div>
                    </div>
                    <div className="label-text">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="time_left"/>
                      </div>
                      <div className="primary-text">2h 55m</div>
                    </div>
                    <div className="label-text">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="last_bid"/>
                      </div>
                      <div className="primary-text last-bid">
                        1.26&nbsp;<span className="symbol">Ξ</span>
                        <div className="primary-caption helpful">21</div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="your_bid"/>:
                    </div>
                    <div className="fee-price">
                      <div className="primary-text">1.28&nbsp;<span className="symbol">Ξ</span></div>
                    </div>
                    <button className="primary-btn md thin text-capitalize">
                      <Translate id="place_bid"/>
                    </button>
                  </div>
                </div>
                <div className="primary-text note-text">
                  This horse is being auctioned on the <span className="green">ZED Marketplace</span> The auction ends
                  on <b>Dec 12 2018</b>.
                </div>
              </div>
            }*/}
            <div className="horse">
              <div className="dedicate-horse">
                <div className="dedicate-horse-part">
                  <div className="dedicate-horse-content">
                    <div className="horse-properties">
                      <div className="property">
                        <img className="icon property-img" src={Horse} />
                        <div className="property-text">
                          <div className="grey-text text-uppercase">
                            <Translate id="bloodline" />
                          </div>
                          <div className="primary-text">{currentHorse.bloodline}</div>
                        </div>
                      </div>
                      <div className="property">
                        {breedTypeIcons[currentHorse.breed_type] ? (
                          <img
                            className="icon property-img gen"
                            src={breedTypeIcons[currentHorse.breed_type]}
                          />
                        ) : (
                          <img className="icon property-img" src={Dna} />
                        )}
                        <div className="property-text">
                          <div className="grey-text text-uppercase">
                            <Translate id="gen" />
                          </div>
                          <span className="primary-text gen">{currentHorse.genotype}</span>
                          <span className="primary-text helpful breed-type">
                            {currentHorse.breed_type.capitalize()}
                          </span>
                        </div>
                      </div>
                      <div className="property">
                        <img className="icon property-img" src={Cube} />
                        <div className="property-text">
                          <div className="grey-text text-uppercase">
                            <Translate id="gender" />
                          </div>
                          <div className="primary-text">{currentHorse.horse_type}</div>
                        </div>
                      </div>
                      <div className="property">
                        <div
                          className={`property-img-coat ${currentHorse.super_coat && 'super'}`}
                          style={{ backgroundColor: `#${currentHorse.hex_code}` }}
                        />
                        <div className="property-text">
                          <div className="grey-text text-uppercase">
                            <Translate id="coat" />
                          </div>
                          <span className="primary-text">{currentHorse.color}</span>
                          {currentHorse.super_coat && (
                            <span className="primary-text helpful super-coat">Super</span>
                          )}
                        </div>
                      </div>
                      <div className="property">
                        <img className="icon property-img" src={Race} />
                        <div className="property-text">
                          <div className="grey-text text-uppercase">
                            <Translate id="races" />
                          </div>
                          <div className="primary-text">{currentHorse.races}</div>
                        </div>
                      </div>
                      <div className="property">
                        <img className="icon property-img" src={Career} />
                        <div className="property-text">
                          <div className="grey-text text-uppercase">
                            <Translate id="career" />
                          </div>
                          <div className="primary-text">{currentHorse.career}</div>
                        </div>
                      </div>
                      <div className="property">
                        <img className="icon property-img" src={Winrate} />
                        <div className="property-text">
                          <div className="grey-text text-uppercase">
                            <Translate id="win_rate" />
                          </div>
                          <div className="primary-text">{currentHorse.winrate}%</div>
                        </div>
                      </div>
                      <div className="property">
                        <img className="icon property-img" src={Offspring} />
                        <div className="property-text">
                          <div className="grey-text text-uppercase">
                            <Translate id="offspring" />
                          </div>
                          <div className="primary-text offspring">{currentHorse.offspring}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*{
                  this.state.hasOffspring ?
                    <div className="offspring-part">
                      <div className="overline-text text-uppercase offspring-title">
                        Offspring Performance
                      </div>
                      <div className="offspring-infos">
                        <div className="part">
                          <div className="property">
                            <img className="icon property-img" src={Horse}/>
                            <div className="property-text">
                              <div className="grey-text text-uppercase">
                                <Translate id="born"/>
                              </div>
                              <div className="normal-text">389</div>
                            </div>
                          </div>
                          <div className="property">
                            <img className="icon property-img" src={Race}/>
                            <div className="property-text">
                              <div className="grey-text text-uppercase">
                                <Translate id="progeny_result"/>
                              </div>
                              <div className="normal-text">1/0/0/0</div>
                            </div>
                          </div>
                        </div>
                        <div className="part">
                          <div className="property">
                            <img className="icon property-img" src={Dna}/>
                            <div className="property-text">
                              <div className="grey-text text-uppercase">
                                <Translate id="colt"/>
                              </div>
                              <div className="normal-text">190</div>
                            </div>
                          </div>
                          <div className="property">
                            <img className="icon property-img" src={Career}/>
                            <div className="property-text">
                              <div className="grey-text text-uppercase">
                                <Translate id="place"/>
                              </div>
                              <div className="normal-text">0%</div>
                            </div>
                          </div>
                        </div>
                        <div className="part">
                          <div className="property">
                            <img className="icon property-img" src={Cube}/>
                            <div className="property-text">
                              <div className="grey-text text-uppercase">
                                <Translate id="filly"/>
                              </div>
                              <div className="normal-text">190</div>
                            </div>
                          </div>
                          <div className="property">
                            <img className="icon property-img" src={Winrate}/>
                            <div className="property-text">
                              <div className="grey-text text-uppercase">
                                <Translate id="win_rate"/>
                              </div>
                              <div className="normal-text">1.2%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <OffspringTree/>
                    </div>
                    :
                    <div className="offspring-part">
                      <div className="overline-text text-uppercase offspring-title">
                        no offspring
                      </div>
                    </div>
                }*/}
              </div>
            </div>
          </section>
        </main>

        <Modal
          key="modal-share"
          className="share-horse-modal"
          isOpen={this.state.shareModalIsOpen}
          onRequestClose={this.closeShareModal}
          ariaHideApp={false}
        >
          <ShareModalContent closeModal={this.closeShareModal} horse={this.props.currentHorse} />
        </Modal>

        <Modal
          key="breed"
          className="breed-modal"
          isOpen={this.state.breedModalIsOpen}
          onRequestClose={() => this.closeBreedModal('breedModalIsOpen')}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <BreedModalContent
            horse={this.state.breedingHorse}
            etherPrice={this.props.etherPrice}
            onSubmit={this.handlePlaceInStud}
            closeModal={() => this.closeBreedModal('breedModalIsOpen')}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isOwner:
      state.dedicate.currentHorse && state.auth.address === state.dedicate.currentHorse.owner,
    currentHorse: state.dedicate.currentHorse,
    isLoading: state.dedicate.isLoading,
    error: state.dedicate.error,
    address: state.auth.address,
    queryPrice: state.stud.queryPrice,
    etherPrice: state.other.etherPrice,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadHorse: id => {
      return dispatch(actions.stable.loadHorseById(id))
    },
    putHorseInStud: (address, queryPrice, horseId, price, duration) => {
      return dispatch(actions.stud.putHorseInStud(address, queryPrice, horseId, price, duration))
    },
    getQueryPrice: () => dispatch(actions.stud.getQueryPrice()),
    createActivity: data => dispatch(actions.activity.createItem(data)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(DedicatedPageContent)),
  mapStateToProps,
  mapDispatchToProps,
)
