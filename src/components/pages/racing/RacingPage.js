import React from 'react'

import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/RacingPage'
import IconTime from '../../../assets/images/icn-time-24.svg'
import IconTrophy from '../../../assets/images/icn-trophy-24.svg'
import RacingScheduleContent from './RacingScheduleContent'
import RacingResultsContent from './RacingResultsContent'
import Modal from 'react-modal'
import WatchModalContent from './WatchModalContent'

class RacingPage extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 1,
      watchModalIsOpen: false,
    }
    this.props.addTranslation({ racing: i18n })
    this._openWatchModal = this._openWatchModal.bind(this)
    this._closeWatchModal = this._closeWatchModal.bind(this)
  }

  _openWatchModal() {
    this.setState({ watchModalIsOpen: true })
  }

  _closeWatchModal() {
    this.setState({ watchModalIsOpen: false })
  }

  render() {
    return (
      <div className="page-content racing">
        <div className="tab-watch">
          <div className="tab-content">
            <div className="tab-list">
              <div
                className={`tab-item ${this.state.tab === 1 ? 'active' : ''}`}
                onClick={() => this.setState({ tab: 1 })}
              >
                <div className="item-content">
                  <img className="icon" src={IconTime} />
                  <div className="primary-text text-capitalize">
                    <Translate id="racing.schedule" />
                  </div>
                </div>
              </div>
              <div
                className={`tab-item ${this.state.tab === 2 ? 'active' : ''}`}
                onClick={() => this.setState({ tab: 2 })}
              >
                <div className="item-content">
                  <img className="icon" src={IconTrophy} />
                  <div className="primary-text text-capitalize">Results</div>
                </div>
              </div>
            </div>
            <div className="watch-status" onClick={this._openWatchModal}>
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
        <main>{this.state.tab === 1 ? <RacingScheduleContent /> : <RacingResultsContent />}</main>

        <Modal
          key="watch-live"
          className="watch-live-modal"
          isOpen={this.state.watchModalIsOpen}
          onRequestClose={() => this._closeWatchModal()}
          ariaHideApp={false}
        >
          <WatchModalContent closeModal={() => this._closeWatchModal()} />
        </Modal>
      </div>
    )
  }
}

export default withRouter(withLocalize(RacingPage))
