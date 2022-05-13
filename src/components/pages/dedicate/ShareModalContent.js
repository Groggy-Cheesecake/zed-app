import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/DedicatedPage'

class ShareModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    horse: PropTypes.object,
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.handleInputClick = this.handleInputClick.bind(this)
    this.handleCopyClick = this.handleCopyClick.bind(this)

    this.props.addTranslation({ dedicated_page: i18n })
  }

  handleInputClick() {
    this.linkInput.select()
  }

  handleCopyClick() {
    this.linkInput.select()
    document.execCommand('copy')
  }

  render() {
    return (
      <div className="share-modal-content">
        <form className="share-form">
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
          <section className="share-content">
            <div className="section-header">
              <div className="md-text text-capitalize">
                <Translate id="dedicated_page.share_link" />
              </div>
            </div>
            <div className="section-content">
              <div className="share-img-content">
                <div className="grey-text text-uppercase">{this.props.horse.name}</div>
                <img className="share-img" src={this.props.horse.img_url} />
              </div>
              <div className="share-handle">
                <input
                  className="normal-text share-url"
                  value={`https://zed.run/racehorse/${this.props.horse.id ||
                    this.props.horse.horse_id}`}
                  ref={n => (this.linkInput = n)}
                  onClick={this.handleInputClick}
                  readOnly
                />
                <button
                  className="primary-btn md copy-link"
                  type="button"
                  onClick={this.handleCopyClick}
                >
                  <Translate id="dedicated_page.copy_link" />
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    )
  }
}

export default withLocalize(ShareModalContent)
