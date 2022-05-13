import React from 'react'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'

// Components
// import IconText from '../../common/_base/IconText/IconText';
import CustomInput from '../../common/_base/CustomInput'
import PriceInput from '../../common/_base/PriceInput'
import SelectField from '../../common/_base/SelectField'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Utils
import { formatNumber } from '@/utils'

// Constants
import i18n from '@/const/i18n/StablePage'

// Images
import InfoWarning from '../../../assets/images/icn-info-warning-24.svg'
import InfoPass from '../../../assets/images/icn-info-good-24.svg'

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
    value: '7',
    label: '7 Days',
  },
]

class BreedModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
    onSubmit: PropTypes.func,
    horse: PropTypes.object,
    etherPrice: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      price: (props.horse || {}).min_breeding_price || 0,
      duration: null,
      errors: {
        price: null,
        duration: null,
        terms: null,
      },
    }

    this._onChangeDuration = this._onChangeDuration.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handlePriceChange = this._handlePriceChange.bind(this)
    this._nextStep = this._nextStep.bind(this)
    this._previousStep = this._previousStep.bind(this)

    this.props.addTranslation({ stable_page: i18n })
  }

  _onChangeDuration(value) {
    this.setState({ duration: value })
  }

  _handlePriceChange(obj) {
    const errors = JSON.parse(JSON.stringify(this.state.errors))
    if (obj.floatValue > 0 && obj.floatValue < this.props.horse.min_breeding_price) {
      errors.price = `Minimum breeding price must be ${this.props.horse.min_breeding_price} ETH or greater`
    } else {
      errors.price = null
    }
    this.setState({ price: obj.floatValue, errors })
  }

  _handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.price, this.state.duration.value)
  }

  _nextStep(e) {
    e.preventDefault()
    this.setState({ step: 2 })
  }

  _previousStep(e) {
    e.preventDefault()
    this.setState({ step: 1 })
  }

  get isFormValid() {
    return (
      this.state.price >= this.props.horse.min_breeding_price &&
      this.state.duration &&
      this.state.duration.value &&
      this.props.horse.breeding_counter > 0
    )
  }

  render() {
    const { horse } = this.props
    return (
      <div className="breed-content">
        <form className="breed-form" onSubmit={this._handleSubmit}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
          <section>
            <div className="section-header">
              <div className="md-text">
                <Translate id="stable_page.breed_modal_title" />
              </div>
            </div>
            <div className="section-content">
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
                  <div className="note-part warn">
                    <img className="icon" src={InfoWarning} />
                    <div className="primary-text secondary">
                      This racehorse has {horse.breeding_counter} covers left
                    </div>
                  </div>
                  <PriceInput
                    label="BREEDING PRICE"
                    infoIcon={true}
                    infoText={
                      <div>
                        Minimum breeding prices are determined by ZED. <br />
                        <a href="/terms" target="_blank">
                          Learn more
                        </a>
                      </div>
                    }
                    ethPrice={this.state.price}
                    usdPrice={formatNumber(this.state.price * this.props.etherPrice)}
                    minPrice={horse.min_breeding_price}
                    onChange={this._handlePriceChange}
                  />
                  <PriceInput
                    label="ZED FEE"
                    infoIcon={true}
                    infoText={
                      <div>
                        This is the fee that ZED receives. <br />
                        <a
                          href="https://medium.com/@zed_run/minimum-breeding-price-and-allocation-4946bbd1634e"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more
                        </a>
                      </div>
                    }
                    ethPrice={formatNumber(this.state.price * 0.08)}
                    usdPrice={formatNumber(this.state.price * this.props.etherPrice * 0.08)}
                  />
                  <SelectField
                    label="STUD DURATION"
                    infoIcon={true}
                    infoContent={
                      <div>
                        Placing your racehorse into the stud farm for 1 day attracts a 20% premium
                        and placing it in for 7 days attracts a 20% discount.
                      </div>
                    }
                    options={options}
                    value={this.state.duration}
                    onChange={this._onChangeDuration}
                    errorMsg="You must set the stud duration"
                    placeholder="Set duration"
                  />
                  <div className="grey-text note">
                    <Translate id="stable_page.breed_modal_note" />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="note-part pass">
                    <img className="icon" src={InfoPass} />
                    <div>
                      <div className="primary-text">Receive a 35% discount</div>
                      <div className="primary-text secondary">
                        Receive a discount when breeding within your own stable in the stud
                        marketplace.
                      </div>
                    </div>
                  </div>
                  <PriceInput
                    label="BREEDING PRICE"
                    ethPrice={this.state.price}
                    usdPrice={formatNumber(this.state.price * this.props.etherPrice)}
                  />
                  <CustomInput
                    className={'stud-duration-field'}
                    label="STUD DURATION"
                    value={this.state.duration.label}
                  />
                </React.Fragment>
              )}
            </div>
            <div className="section-footer">
              {this.state.step === 1 ? (
                <React.Fragment>
                  <div className="handle-btns">
                    <button
                      className="outline-btn md thin text-capitalize"
                      onClick={this.props.closeModal}
                    >
                      <Translate id="cancel" />
                    </button>
                    <button
                      className="primary-btn md thin text-capitalize"
                      disabled={!this.isFormValid}
                      onClick={this._nextStep}
                    >
                      <Translate id="next" />
                    </button>
                  </div>
                </React.Fragment>
              ) : (
                <div className="handle-btns">
                  <button
                    className="outline-btn md thin text-capitalize"
                    onClick={this._previousStep}
                  >
                    <Translate id="back" />
                  </button>
                  <button
                    className="primary-btn md thin text-capitalize"
                    disabled={!this.isFormValid}
                  >
                    <Translate id="stable_page.confirm" />
                  </button>
                </div>
              )}
            </div>
          </section>
        </form>
      </div>
    )
  }
}

export default withLocalize(BreedModalContent)
