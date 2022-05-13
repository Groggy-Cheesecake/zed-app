import React from 'react'

import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/RacingPage'
import Accordion from 'components/common/Accordion/racing/Accordion'
import RacingScheduleDetail from '../../common/RacingScheduleContent/RacingScheduleDetail.js'
import Modal from 'react-modal'
import BuyInModalContent from './BuyInModalContent'

class RacingScheduleContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      buyInModalIsOpen: false,
    }
    this.props.addTranslation({ racing: i18n })
    this._openBuyInModal = this._openBuyInModal.bind(this)
    this._closeBuyInModal = this._closeBuyInModal.bind(this)
  }

  _openBuyInModal() {
    this.setState({ buyInModalIsOpen: true })
  }

  _closeBuyInModal() {
    this.setState({ buyInModalIsOpen: false })
  }

  render() {
    const data = [
      {
        cityImg: 'usa',
        cityName: 'USA - New York',
      },
      {
        cityImg: 'norway',
        cityName: 'Norway - Oslo',
      },
      {
        cityImg: 'australia',
        cityName: 'Australia - Sydney',
      },
    ]
    return (
      <div className="racing-schedule-content">
        <section className="starting-section">
          <div className="overline-text text-uppercase starting-soon">
            <Translate id="racing.schedule_part.starting_soon" />
          </div>
          <div className="section-content">
            <RacingScheduleDetail
              detail={true}
              openBuyInModal={this._openBuyInModal}
              data={{
                cityImg: 'singapore',
                cityName: 'Singapore - Tampines',
              }}
            />
          </div>
        </section>
        <section className="section registration">
          <div className="overline-text text-uppercase title">
            <Translate id="racing.schedule_part.open_registration" />
          </div>
          <div className="section-content">
            <div className="racing-content">
              <div className="accordion-label">
                <div className="overline-text sm text-uppercase">
                  <Translate id="racing.schedule_part.race_details" />
                </div>
                <div className="right">
                  <div className="overline-text sm text-uppercase">
                    <Translate id="racing.schedule_part.gates_open" />
                  </div>
                  <div className="overline-text sm key text-uppercase starts">
                    <Translate id="racing.schedule_part.starts" />
                  </div>
                </div>
              </div>
              <div className="accordion-content">
                <div className="accordion" role="tablist">
                  <Accordion
                    panels={data}
                    activeTab={-1}
                    tab="schedule"
                    type="registration"
                    openBuyInModal={this._openBuyInModal}
                  />
                </div>
              </div>
            </div>
            <button className="outline-btn sm show-more" disabled={true}>
              <Translate id="racing.show_more" />
            </button>
          </div>
        </section>
        <section className="section scheduled">
          <div className="overline-text text-uppercase title">
            <Translate id="racing.schedule_part.scheduled_next" />
          </div>
          <div className="section-content">
            <div className="racing-content">
              <div className="accordion-label">
                <div className="overline-text sm text-uppercase">
                  <Translate id="racing.schedule_part.race_details" />
                </div>
                <div className="right">
                  <div className="overline-text sm key text-uppercase starts">
                    <Translate id="racing.schedule_part.starts" />
                  </div>
                </div>
              </div>
              <div className="accordion-content">
                <div className="accordion" role="tablist">
                  <Accordion panels={data} activeTab={-1} tab="schedule" type="scheduled" />
                </div>
              </div>
            </div>
            <button className="outline-btn sm show-more" disabled={true}>
              <Translate id="racing.show_more" />
            </button>
          </div>
        </section>

        <Modal
          key="buy-in"
          className="buy-in-modal"
          isOpen={this.state.buyInModalIsOpen}
          onRequestClose={() => this._closeBuyInModal()}
          ariaHideApp={false}
        >
          <BuyInModalContent closeModal={() => this._closeBuyInModal()} />
        </Modal>
      </div>
    )
  }
}

export default withRouter(withLocalize(RacingScheduleContent))
