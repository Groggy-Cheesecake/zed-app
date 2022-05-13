import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import Modal from 'react-modal'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/lib/ReactCrop.scss'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/StablePage'
import Checkbox from '../../common/_base/Checkbox'
import IconAddImg from '../../../assets/images/icn-add-image-24.svg'

class StableNameEditContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    onSubmit: PropTypes.func,
    email: PropTypes.string,
    stable_name: PropTypes.string,
    stable_description: PropTypes.string,
    discord_id: PropTypes.string,
    is_private: PropTypes.bool,
    make_offer: PropTypes.bool,
    addTranslation: PropTypes.func,
    openCrop: PropTypes.bool,
    src: PropTypes.string,
    crop: PropTypes.object,
    croppedFile: PropTypes.any,
    cropModal: PropTypes.bool,
    croppedImageUrl: PropTypes.string,
    onDrop: PropTypes.func,
    closeCropModal: PropTypes.func,
    _cropDone: PropTypes.func,
    _cropCancel: PropTypes.func,
    _removeStableImage: PropTypes.func,
    handleCropChange: PropTypes.func,
    onImageLoaded: PropTypes.func,
    onCropComplete: PropTypes.func,
    getCroppedImg: PropTypes.func,
    onChangeMakeOffer: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      stable_name: props.stable_name,
      stable_description: props.stable_description,
      discord_id: props.discord_id,
      is_private: props.is_private,
      make_offer: props.make_offer,
      email: props.email,
      isChecked: false,
      error: {
        general_api_error: '',
        stable_description_length: '',
      },
      isLoading: false,
    }

    this.props.addTranslation({ stable_page: i18n })
  }

  _handleSubmit = e => {
    e.preventDefault()
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.props
          .onSubmit({
            stable_name: this.state.stable_name,
            stable_description: this.state.stable_description,
            make_offer: this.state.makeOffer,
            is_private: this.state.is_private,
            discord_id: this.state.discord_id,
          })
          .then((res, error) => {
            if (res.error !== null) {
              this.setState({
                isLoading: false,
                error: {
                  general_api_error: 'Stable Name is already in use!',
                  stable_description_length: '',
                },
              })
            } else {
              this.setState(
                {
                  isLoading: false,
                  error: { general_api_error: '', stable_description_length: '' },
                },
                this.props.closeModal,
              )
            }
          })
          .catch(error => {
            this.setState({ isLoading: false, error })
          })
      },
    )
  }

  _onInputFieldChange = (e, field) => {
    this.setState({ [field]: e.target.value })
    if (field === 'stable_description' && e.target.value.length > 160) {
      this.setState({
        error: {
          general_api_error: '',
          stable_description_length: 'Description is greater than 160 characters.',
        },
      })
    } else {
      this.setState({
        error: { general_api_error: '', stable_description_length: '' },
      })
    }
  }

  _onCheckboxChange = (e, field) => {
    this.setState({ [field]: !this.state[field] })
  }

  getHintEmail(email) {
    let updated = email.replace(email.substring(4, email.indexOf('@')), '****')
    let hintEmail = updated.replace(
      updated.substring(updated.indexOf('@') + 2, updated.indexOf('.')),
      '****',
    )
    return hintEmail
  }

  render() {
    const {
      openCrop,
      src,
      crop,
      cropModal,
      croppedImageUrl,
      onDrop,
      closeCropModal,
      _cropDone,
      _cropCancel,
      _removeStableImage,
      handleCropChange,
      onImageLoaded,
      onCropComplete,
    } = this.props
    return (
      <div className="stable-modal-content">
        <form className="stable-name-edit-form" onSubmit={this._handleSubmit}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
          <section>
            <div className="section-header">
              <div className="md-text text-capitalize title">
                <Translate id="stable_page.edit_stable" />
              </div>
            </div>
            <div className="section-content">
              <div className="stable-info">
                <div className="stable-img">
                  {/*
                  <div className="overline-text sm text-uppercase">
                    <Translate id="stable_page.stable_image" />
                  </div>
                  <div className="img-part">
                    <div className="s-img">
                      {croppedImageUrl && <img src={croppedImageUrl} />}

                      {openCrop ? (
                        <Modal
                          key="crop-modal"
                          className="stable-img-crop-modal"
                          isOpen={cropModal}
                          onRequestClose={closeCropModal}
                          ariaHideApp={false}
                        >
                          <div className="md-text text-capitalize">edit image</div>
                          <ReactCrop
                            className="crop-pane"
                            src={src}
                            crop={crop}
                            onChange={handleCropChange}
                            onImageLoaded={onImageLoaded}
                            onComplete={onCropComplete}
                          />
                          <div className="handle-btns">
                            <button className="outline-btn sm thin" onClick={_cropCancel}>
                              Cancel
                            </button>
                            <button className="primary-btn sm thin" onClick={_cropDone}>
                              Confirm
                            </button>
                          </div>
                        </Modal>
                      ) : (
                        <Dropzone onDrop={onDrop}>
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <div className="add-img">
                                <img className="icon" src={IconAddImg} />
                              </div>
                            </div>
                          )}
                        </Dropzone>
                      )}
                    </div>
                  </div>
                  <div
                    className="primary-text secondary text-capitalize remove"
                    onClick={_removeStableImage}
                  >
                    <Translate id="stable_page.remove" />
                  </div>
                   */}
                </div>
                <div className="detail-info">
                  <div className="info-field">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="stable_page.stable_title" />
                    </div>
                    <div className="m-input-content stable-name">
                      <Tooltip
                        placement="right"
                        overlay={this.state.error.general_api_error}
                        visible={!!this.state.error.general_api_error}
                      >
                        <input
                          className="z-input"
                          type="text"
                          placeholder="Stable name"
                          onChange={e => this._onInputFieldChange(e, 'stable_name')}
                          value={this.state.stable_name || ''}
                          disabled={this.state.isLoading}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="info-field">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="stable_page.stable_desc" />
                    </div>
                    <div className="m-input-content">
                      <Tooltip
                        placement="right"
                        overlay={this.state.error.stable_description_length}
                        visible={!!this.state.error.stable_description_length}
                      >
                        <textarea
                          className="z-input textarea"
                          placeholder="Add a description ..."
                          rows={3}
                          onChange={e => this._onInputFieldChange(e, 'stable_description')}
                          value={this.state.stable_description || ''}
                        />
                      </Tooltip>
                    </div>
                    <div className="primary-caption helpful desc-caption">
                      <Translate id="stable_page.desc_caption" />
                    </div>

                    {/*
                      <Checkbox
                        id="isPrivate"
                        className="checkbox"
                        checked={this.state.isPrivate}
                        onChange={e => this._onCheckboxChange(e, 'isPrivate')}
                        label="Private Stable"
                      />
                      <div className="primary-caption helpful caption">
                        <Translate id="stable_page.private_caption" />
                      </div>
                    */}
                  </div>
                  <div className="info-field">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="stable_page.email" />
                    </div>
                    <div className="m-input-content">
                      <Tooltip placement="bottom" overlay="Email cannot be edited">
                        <input
                          className="z-input"
                          type="text"
                          onChange={e => this._onInputFieldChange(e, 'email')}
                          value={this.props.email || ''}
                          disabled
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="info-field">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="stable_page.discord" />
                    </div>
                    <div className="m-input-content">
                      <input
                        className="z-input"
                        type="text"
                        placeholder="Username#1234"
                        onChange={e => this._onInputFieldChange(e, 'discord_id')}
                        value={this.state.discord_id || ''}
                      />
                    </div>
                    {/*
                    <Checkbox
                      id="makeOffer"
                      className="checkbox"
                      checked={this.state.makeOffer}
                      onChange={e => this._onCheckboxChange(e, 'makeOffer')}
                      label='Turn on "Make Offer" feature.'
                    />
                    <div className="primary-caption helpful caption">
                      <Translate id="stable_page.discord_caption" />
                    </div>
                    */}
                  </div>
                  <br />
                </div>
              </div>
            </div>

            <div className="section-footer">
              <Checkbox
                className="stable-btns"
                id="isChecked"
                checked={this.state.isChecked}
                onChange={e => this._onCheckboxChange(e, 'isChecked')}
                label="Yes, I am sure I want to update my stable information."
              />
              <div className="stable-btns">
                <button
                  className="outline-btn md thin discard text-capitalize"
                  onClick={this.props.closeModal}
                >
                  <Translate id="stable_page.discard" />
                </button>
                <button
                  className="primary-btn md thin text-capitalize"
                  disabled={
                    this.state.stable_name === '' ||
                    this.state.isLoading ||
                    !this.state.isChecked ||
                    (this.state.stable_description !== null &&
                      this.state.stable_description !== undefined &&
                      this.state.stable_description.length > 160)
                  }
                  type="submit"
                >
                  <Translate id="stable_page.save_changes" />
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    )
  }
}

export default withLocalize(StableNameEditContent)
