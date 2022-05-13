import React from 'react'
import { withRouter } from 'react-router'
import HorseAnimation from '../../common/HorseAnimation'
import HorseImg from '../../../assets/images/the-horse-early-release.svg'
import GeoHorse from '../../../assets/images/geo_horse.svg'
import StudFarm from '../../../assets/images/stud_farm.svg'
import LegacyTrophy from '../../../assets/images/legacy_trophy.svg'
import GlowBg from '../../../assets/images/bkg-oval-top-bottom.svg'
import SupportBrowserContent from '../../common/SupportBrowser'
import Modal from 'react-modal'

import PropTypes from 'prop-types'

import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/HomePage'

class HomePageContent extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
      location: PropTypes.object,
    }),
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      browserModal: false,
    }
    this.openBrowserModal = this.openBrowserModal.bind(this)
    this.closeBrowserModal = this.closeBrowserModal.bind(this)
    this.handleBuyClick = this.handleBuyClick.bind(this)
    this.props.addTranslation({ home_page: i18n })
  }

  openBrowserModal() {
    this.setState({ browserModal: true })
  }

  closeBrowserModal() {
    this.setState({ browserModal: false })
  }

  handleBuyClick() {
    this.props.history.push('/buy')
  }

  render() {
    return (
      <div className="page-content home mobile">
        <main>
          <section className="top-section">
            <div className="top-section-content">
              <div className="own-special">
                <h1 className="lg-text text-uppercase">
                  <Translate id="home_page.title" />
                </h1>
                <div className="grey-text">
                  <Translate id="home_page.sub_title" />
                </div>
              </div>
              <div className="main-horse-image">
                <HorseAnimation />
              </div>
            </div>
            <img className="glow-bg" src={GlowBg} />
          </section>

          <section className="center-section">
            <div className="center-section-content">
              <div className="buy-racehorse-btn">
                <button className="primary-btn mobile text-uppercase" onClick={this.handleBuyClick}>
                  <Translate id="buy_a_racehorse" />
                </button>
              </div>
              <div className="part-content digital-race">
                <div className="img-part">
                  <img className="geo-horse" src={GeoHorse} />
                </div>
                <div className="text-part">
                  <div className="part-exp text-uppercase">
                    <Translate id="home_page.what_zed" />
                  </div>
                  <div className="part-title text-capitalize">
                    <Translate id="home_page.racehorse" />
                  </div>
                  <div className="part-text">
                    <Translate id="home_page.racehorse_text1" />
                    <br />
                    <br />
                    <Translate id="home_page.racehorse_text2" />
                  </div>
                </div>
              </div>
              <div className="part-content early-rel">
                <div className="text-part">
                  <div className="part-exp text-uppercase">
                    <Translate id="home_page.early_release_dates" />
                  </div>
                  <div className="part-title text-capitalize">
                    <Translate id="release" />
                  </div>
                  <div className="part-text">
                    <Translate id="home_page.release_text1" />
                    <br />
                    <br />
                    <Translate id="home_page.release_text2" />
                  </div>
                </div>
                <div className="img-part">
                  <img className="stud-farm" src={StudFarm} />
                </div>
              </div>
            </div>
          </section>

          <section className="legacy-section">
            <div className="legacy-section-content">
              <div className="part-content create-legacy">
                <div className="img-part">
                  <img className="legacy-trophy" src={LegacyTrophy} />
                </div>
                <div className="text-part">
                  <div className="part-exp text-uppercase">
                    <Translate id="bloodline" />
                  </div>
                  <div className="part-title text-capitalize">
                    <Translate id="home_page.legacy" />
                  </div>
                  <div className="part-text">
                    <Translate id="home_page.legacy_text1" />
                    <br />
                    <br />
                    <Translate id="home_page.legacy_text2" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="buy-racehorse-section">
            <div className="buy-racehorse-section-content">
              <div className="part-content buy-racehorse">
                <div className="text-part">
                  <div className="part-exp text-uppercase">
                    <Translate id="home_page.take_advantage" />
                  </div>
                  <div className="part-title">
                    <Translate id="home_page.next_racehorse" />
                    <br />
                  </div>
                  <img className="horse-img" src={HorseImg} />
                  <div className="normal-text">
                    <Translate id="home_page.first_stable" />
                  </div>
                  <div className="buy-racehorse-btn">
                    <button
                      className="primary-btn mobile text-uppercase"
                      onClick={this.handleBuyClick}
                    >
                      <Translate id="buy_a_racehorse" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

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

export default withRouter(withLocalize(HomePageContent))
