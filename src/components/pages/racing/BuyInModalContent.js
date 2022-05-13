import React from 'react'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/RacingPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import { formatNumber } from '@/utils';
import Checkbox from '../../common/_base/Checkbox'
import PriceInput from '../../common/_base/PriceInput'
import SelectField from '../../common/_base/SelectField'
import Singapore from '../../../assets/images/country/img-race-singapore.svg'

class BuyInModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      termsChecked: false,
      racehorse: null,
    }
    this._onTermsCheck = this._onTermsCheck.bind(this)
    this._onSelectRacehorse = this._onSelectRacehorse.bind(this)
    this.props.addTranslation({ racing: i18n })
  }

  _onTermsCheck(e) {
    this.setState({ termsChecked: e.target.checked })
  }

  _onSelectRacehorse(selectedOption) {
    this.setState({ racehorse: selectedOption })
  }

  render() {
    const options = [
      {
        value: '1',
        label: 'Racehorse 1',
      },
      {
        value: '2',
        label: 'Racehorse 2',
      },
    ]

    return (
      <div className="buy-in-content">
        <form className="buy-in-form">
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
          <section>
            <div className="md-text title">
              <Translate id="racing.buy_in_modal_title" />
            </div>
            <div className="race-info">
              <div className="left">
                <img className="icon location" src={Singapore} />
                <div className="info">
                  <div className="primary-text pos">Singapore - Tampines</div>
                  <div className="primary-caption helpful race">Race 4 - 1900m</div>
                  <div className="primary-caption helpful">Group 2</div>
                </div>
              </div>
              <div className="md-text">Gate 3</div>
            </div>
            <PriceInput
              label="YOUR BID"
              infoIcon={true}
              infoText=""
              ethPrice={1.26}
              usdPrice={114.4}
            />
            <SelectField
              label="SELECT RACEHORSE"
              options={options}
              value={this.state.racehorse}
              onChange={this._onSelectRacehorse}
              placeholder="Racehorse"
            />
            <div className="primary-caption helpful note">
              <Translate id="racing.buy_in_modal_note" />
            </div>
            <Checkbox
              className="terms"
              checked={this.state.termsChecked}
              onChange={this._onTermsCheck}
              label={
                'I agree to the &nbsp;<a href="/terms">terms and conditions</a>&nbsp; provided by the ZED'
              }
            />
            <div className="handle-btns">
              <button className="sm-btn text-capitalize" onClick={this.props.closeModal}>
                <Translate id="cancel" />
              </button>
              <button
                className="primary-btn md text-capitalize"
                disabled={!this.state.termsChecked}
              >
                <Translate id="racing.enter_race" />
              </button>
            </div>
          </section>
        </form>
      </div>
    )
  }
}

export default withLocalize(BuyInModalContent)
