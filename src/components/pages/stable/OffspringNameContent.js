import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { Translate, withLocalize } from 'react-localize-redux'

// Constants
import i18n from '@/const/i18n/StablePage'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Components
import LoadingIndicator from 'components/shared/LoadingIndicator'

// Images
import Horse from '../../../assets/images/icn-horse-24.svg'
import Gen2 from '../../../assets/images/icn-gen2-24.svg'
import Cube from '../../../assets/images/icn-cube-24.svg'

// Assets
import IntroBreedVideo from '../../../assets/images/animations/outro-full-2.webm'

class OffspringNameContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
    onSubmit: PropTypes.func,
    horse: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      confirmName: '',
      mainContent: false,
      isLoading: false,
      error: null,
      animation: true,
    }

    this._onChangeField = this._onChangeField.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)

    this.props.addTranslation({ stable_page: i18n })
  }

  _onChangeField(name, e) {
    let obj = {}
    obj[name] = e.target.value
    this.setState({ ...obj })
  }

  _handleSubmit(e) {
    e.preventDefault()

    if (this.state.name !== this.state.confirmName) {
      this.setState({ error: 'Confirmation doesn\'t match' })
    } else {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          this.props.onSubmit(this.state.name).then(({ error }) => {
            this.setState(
              {
                isLoading: false,
                error,
              },
              () => {
                if (!error) {
                  this.props.closeModal()
                }
              },
            )
          })
        },
      )
    }
  }

  get content1() {
    const { horse } = this.props
    const { animation } = this.state

    return (
      <section>
        <div className="section-header">
          <div className="md-text text-capitalize title">
            <Translate id="stable_page.congratulations" />
          </div>
        </div>
        {animation ? (
          <div className="section-content">
            <div className="video-content">
              {animation && (
                <ReactPlayer
                  url={[{ src: IntroBreedVideo, type: 'video/webm' }]}
                  playing
                  width="auto"
                  height="auto"
                  onEnded={() => this.setState({ animation: false })}
                />
              )}
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className="section-content">
              <div>
                <div className="horse-img">
                  <img className="h-img" src={horse.img_url} />
                </div>
                <div className="primary-text note">
                  <Translate id="stable_page.offspring_naming" />
                </div>
              </div>
            </div>
            <div className="section-footer">
              <button
                className="primary-btn md thin text-capitalize confirm-btn"
                onClick={() => this.setState({ mainContent: true })}
              >
                <Translate id="stable_page.okay" />
              </button>
            </div>
          </React.Fragment>
        )}
      </section>
    )
  }

  get content2() {
    const { horse } = this.props
    const { confirmName, error, name } = this.state

    let ErrorMessage
    if (error) {
      ErrorMessage = (
        <div className="primary-text text-danger text-center">{error.capitalize()}</div>
      )
    }

    return (
      <section>
        <div className="section-header">
          <div className="md-text text-capitalize title">
            <Translate id="stable_page.name_your_foal" />
          </div>
        </div>
        <div className="section-content">
          {ErrorMessage}
          <div className="horse-img">
            <img className="h-img" src={horse.img_url} />
          </div>
          <div className="horse-properties">
            <div className="property">
              <img className="icon property-img" src={Horse} />
              <div className="property-text">
                <div className="grey-text text-uppercase">
                  <Translate id="bloodline" />
                </div>
                <div className="normal-text">{horse.bloodline}</div>
              </div>
            </div>
            <div className="property">
              <img className="icon property-img gen" src={Gen2} />
              <div className="property-text">
                <div className="grey-text text-uppercase">
                  <Translate id="gen" />
                </div>
                <span className="normal-text gen">{horse.genotype}</span>
                <span className="primary-text helpful super-coat">
                  {horse.breed_type.capitalize()}
                </span>
              </div>
            </div>
            <div className="property">
              <img className="icon property-img" src={Cube} />
              <div className="property-text">
                <div className="grey-text text-uppercase">
                  <Translate id="gender" />
                </div>
                <div className="normal-text">{horse.horse_type}</div>
              </div>
            </div>
            <div className="property">
              <div
                className="property-img-coat"
                style={{ backgroundColor: `#${horse.hex_code}` }}
              />
              <div className="property-text">
                <div className="grey-text text-uppercase">
                  <Translate id="coat" />
                </div>
                <div className="normal-text">{horse.color}</div>
              </div>
            </div>
          </div>
          <div className="overline-text sm text-uppercase">
            <Translate id="stable_page.enter_name" />
          </div>
          <div className="m-input-content">
            <input
              className="z-input"
              type="text"
              placeholder="Choose Name"
              onChange={e => this._onChangeField('name', e)}
              value={name}
            />
          </div>
          <div className="primary-caption helpful note">
            Disclaimer: No special characters or numbers can be used. Remember, an exciting name can
            add value to the marketplace.
          </div>
          <div className="overline-text sm text-uppercase">
            <Translate id="stable_page.confirm_name" />
          </div>
          <div className="m-input-content">
            <input
              className="z-input"
              type="text"
              placeholder="Enter name again"
              onChange={e => this._onChangeField('confirmName', e)}
              value={confirmName}
            />
          </div>
        </div>
        <div className="section-footer">
          <button
            className="primary-btn text-uppercase confirm-btn"
            type="submit"
            disabled={!name || !confirmName}
          >
            <Translate id="stable_page.confirm" />
          </button>
        </div>
      </section>
    )
  }

  render() {
    const { isLoading } = this.state

    return (
      <React.Fragment>
        {isLoading && (
          <section style={{ height: '300px' }}>
            <LoadingIndicator busy={true} />
          </section>
        )}

        {!isLoading && (
          <div className="offspring-naming-modal-content">
            <form className="offspring-name-edit-form" onSubmit={this._handleSubmit}>
              <FontAwesomeIcon
                className="close-icon"
                icon={faTimes}
                onClick={this.props.closeModal}
              />
              {!this.state.mainContent ? this.content1 : this.content2}
            </form>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default withLocalize(OffspringNameContent)
