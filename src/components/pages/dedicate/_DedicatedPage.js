import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import { Translate, withLocalize } from 'react-localize-redux'
import Modal from 'react-modal'

// Constants
import i18n from '@/const/i18n/DedicatedPage'

// Actions
import actions from 'state/actions'

// Components
import Header from '../../Header/index.js'
import Footer from '../../Footer/index.js'
import ShareModalContent from './ShareModalContent'
import LoadingIndicator from 'components/shared/LoadingIndicator'

// Images
import Horse from '../../../assets/images/icn-horse-24.svg'
import Dna from '../../../assets/images/icn-dna-24.svg'
import Cube from '../../../assets/images/icn-cube-24.svg'
import Coat from '../../../assets/images/icn-bann-24.svg'
import Races from '../../../assets/images/icn-race-24.svg'
import Career from '../../../assets/images/icn-career.svg'
import Winrate from '../../../assets/images/icn-trophy-24.svg'
import Offspring from '../../../assets/images/icn-offspring-24.svg'
import Info from '../../../assets/images/icn-info-24.svg'
import Share from '../../../assets/images/icn-share-24.svg'

class DedicatedPageContent extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    addTranslation: PropTypes.func,
    loadHorse: PropTypes.func,
    currentHorse: PropTypes.object,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    match: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      shareModalIsOpen: false,
    }

    this.openShareModal = this.openShareModal.bind(this)
    this.closeShareModal = this.closeShareModal.bind(this)

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

  render() {
    if (this.props.isLoading) {
      return <LoadingIndicator busy fixed />
    }

    if (!this.props.currentHorse) {
      return <LoadingIndicator busy fixed />
    }

    const data = this.props.currentHorse

    return (
      <div className="page-content dedicate mobile">
        <main>
          <section className="top-section">
            <div className="horse-introduction">
              <div className={`title ${data.bloodline.toLowerCase()}`}>
                <span className="lg-text">{data.name}</span>
                <img className="share-icon" src={Share} onClick={this.openShareModal} />
              </div>
            </div>
            <div className="horse-img-part">
              <img className="horse-img" src={data.img_url} />
            </div>
          </section>

          <section className="main-section">
            <div className="dedicate-horse">
              <div className="dedicate-horse-part">
                <div className="dedicate-horse-content">
                  <div className="horse-properties">
                    <div className="property">
                      <img className="property-img" src={Horse} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="bloodline" />
                        </div>
                        <div className="normal-text">{data.bloodline}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Dna} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="gen" />
                        </div>
                        <div className="normal-text">{data.genotype}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Races} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="races" />
                        </div>
                        <div className="normal-text">{data.races}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Career} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="career" />
                        </div>
                        <div className="normal-text">{data.career}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Cube} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="gender" />
                        </div>
                        <div className="normal-text">{data.horse_type}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Coat} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="coat" />
                        </div>
                        <div className="normal-text">{data.color}</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Winrate} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="win_rate" />
                        </div>
                        <div className="normal-text">{data.winrate}%</div>
                      </div>
                    </div>
                    <div className="property">
                      <img className="property-img" src={Offspring} />
                      <div className="property-text">
                        <div className="grey-text text-uppercase">
                          <Translate id="offspring" />
                        </div>
                        <div className="normal-text offspring">{data.offspring}</div>
                      </div>
                    </div>
                  </div>
                  <div className="other-infos">
                    <div className="left">
                      <div className="owner">
                        <div className="grey-text text-uppercase">
                          <Translate id="owner_stable" />
                        </div>
                        <div className="normal-text">{data.owner_stable}</div>
                      </div>
                      <div className="time">
                        <div className="grey-text text-uppercase">
                          <Translate id="time_left" />
                        </div>
                        <div className="normal-text">2h 55m</div>
                      </div>
                    </div>
                    <div className="right">
                      <div className="stud-fee">
                        <div className="grey-text text-uppercase">
                          <Translate id="stud_fee" />
                        </div>
                        <img className="info-icn" src={Info} />
                      </div>
                      <div className="price-input">
                        <input className="z-input sm-input" type="text" value={1.28} readOnly />
                        <span className="symbol">Ξ</span>
                      </div>
                      <button className="green-btn text-capitalize" disabled={true}>
                        <Translate id="select_mate" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Modal
          key="modal-share"
          className="share-horse-modal mobile"
          isOpen={this.state.shareModalIsOpen}
          onRequestClose={this.closeShareModal}
          ariaHideApp={false}
        >
          <ShareModalContent
            closeModal={this.closeShareModal}
            horse={this.props.currentHorse}
            horseId={this.props.match.params.horseId}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentHorse: state.dedicate.currentHorse,
    isLoading: state.dedicate.isLoading,
    error: state.dedicate.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadHorse: id => {
      return dispatch(actions.stable.loadHorseById(id))
    },
  }
}

export default drizzleConnect(
  withRouter(withLocalize(DedicatedPageContent)),
  mapStateToProps,
  mapDispatchToProps,
)
