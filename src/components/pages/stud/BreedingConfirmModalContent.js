import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from 'react-localize-redux'
import ReactPlayer from 'react-player'

// Constants
import i18n from '@/const/i18n/SelectMatePage'
import { ERROR_MESSAGES } from '@/const/GlobalData'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Assets
import OffspringAnimation from '../../../assets/images/animations/intro-full-3.webm'

// Styles
import 'rc-tooltip/assets/bootstrap.css'

class BreedingConfirmModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
    onSubmit: PropTypes.func,
    mother: PropTypes.object,
    father: PropTypes.object,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }

  constructor(props) {
    super(props)

    this.state = {
      animation: true,
    }

    this._handleSubmit = this._handleSubmit.bind(this)
    this.props.addTranslation({ select_mate: i18n })
  }

  _handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit()
  }

  get content() {
    const { closeModal, error, father, mother } = this.props

    if (error) {
      const errorButtonText =
        error === ERROR_MESSAGES.HORSES_RELATED ? (
          <Translate id="got_it" />
        ) : (
          <Translate id="retry" />
        )

      return (
        <section>
          <div className="md-text title">
            <Translate id="oops" />
          </div>
          <p className="grey-text mb-5 mt-3">{error}</p>

          <div className="handle-btns">
            <button className="primary-btn md thin text-capitalize" onClick={closeModal}>
              {errorButtonText}
            </button>
          </div>
        </section>
      )
    }

    if (this.state.animation) {
      return (
        <section>
          <div className="section-header">
            <div className="md-text title mb-5">
              <Translate id="select_mate.procreating" />
            </div>
          </div>
          <div className="section-content">
            <div className="video-content">
              <ReactPlayer
                url={[{ src: OffspringAnimation, type: 'video/webm' }]}
                playing
                width="auto"
                height="auto"
                onEnded={() => this.setState({ animation: false })}
              />
            </div>
          </div>
        </section>
      )
    }

    return (
      <section>
        <div className="section-header">
          <div className="md-text title mb-5">
            <Translate id="select_mate.procreating" />
          </div>
        </div>
        <div className="section-content">
          <Translate>
            {({ translate }) => (
              <div
                className="primary-text secondary comments"
                dangerouslySetInnerHTML={{
                  __html: translate('select_mate.shhh', {
                    horse1: mother.name,
                    horse2: father.name,
                  }),
                }}
              />
            )}
          </Translate>

          <div className="handle-btns mt-5">
            <Link to="/stud">
              <button className="outline-btn md thin discard text-capitalize">
                <Translate id="select_mate.back_stud" />
              </button>
            </Link>
            <button className="primary-btn md thin ml-5">
              <Translate id="select_mate.check_activity" />
            </button>
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      <form className="breeding-confirm-form" onSubmit={this._handleSubmit}>
        <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
        <div className="breeding-modal-content">{this.content}</div>
      </form>
    )
  }
}

export default withLocalize(BreedingConfirmModalContent)
