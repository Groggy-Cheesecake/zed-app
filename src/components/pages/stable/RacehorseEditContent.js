import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap.css';
import 'react-image-crop/lib/ReactCrop.scss'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/StablePage'
import Checkbox from '../../common/_base/Checkbox'
import Select from '../../common/_base/Select'

class RacehorseEditContent extends React.Component {
  static propTypes = {
    data: PropTypes.any,
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      name: props.data.name,
      bio: '',
      skin: null,
      isChecked: false,
    }

    this.props.addTranslation({ stable_page: i18n })
  }

  _handleSubmit = e => {
    e.preventDefault()
  }

  _onInputFieldChange = (e, field) => {
    let obj = {}
    obj[field] = e.target.value
    this.setState(obj)
  }

  _onCheckboxChange = e => {
    this.setState({ isChecked: e.target.checked })
  }

  _handleSelectChange = skin => {
    this.setState({ skin })
  }

  render() {
    const options = [
      {
        value: '1',
        label: 'select1',
      },
      {
        value: '2',
        label: 'select2',
      },
    ]

    return (
      <div className="racehorse-modal-content">
        <form className="racehorse-edit-form" onSubmit={this._handleSubmit}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
          <section>
            <div className="md-text text-capitalize title">
              <Translate id="stable_page.edit_racehorse" />
            </div>
            <div className="racehorse-info">
              <div className="racehorse-img">
                <img className="r-img" src={this.props.data.img_url} />
              </div>
              <div className="detail-info">
                <div className="info-field">
                  <div className="overline-text sm text-uppercase">
                    <Translate id="stable_page.racehorse_name" />
                  </div>
                  <div className="m-input-content racehorse-name">
                    <input
                      className="z-input"
                      type="text"
                      placeholder="Racehorse name"
                      onChange={e => this._onInputFieldChange(e, 'name')}
                      value={this.state.name}
                    />
                  </div>
                </div>
                <div className="info-field">
                  <div className="overline-text sm text-uppercase">
                    <Translate id="stable_page.racehorse_bio" />
                  </div>
                  <div className="m-input-content">
                    <textarea
                      className="z-input textarea"
                      placeholder="Enter some bio. Make your racehorse stand out."
                      rows={3}
                      onChange={e => this._onInputFieldChange(e, 'bio')}
                      value={this.state.bio}
                    />
                  </div>
                  <div className="primary-caption helpful bio-caption">
                    <Translate id="stable_page.bio_caption" />
                  </div>
                </div>
                <div className="info-field">
                  <div className="overline-text sm text-uppercase">
                    <Translate id="stable_page.select_skin" />
                  </div>
                  <div className="select-content select-skin">
                    <Select
                      value={this.state.skin}
                      onChange={this._handleSelectChange}
                      options={options}
                      isSearchable={false}
                      placeholder="Select"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Checkbox
              className="confirm-checkbox"
              id="isChecked"
              checked={this.state.isChecked}
              onChange={this._onCheckboxChange}
              label="I am sure I want to update."
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
                disabled={this.state.name === '' || !this.state.isChecked}
                type="submit"
              >
                <Translate id="stable_page.save_changes" />
              </button>
            </div>
          </section>
        </form>
      </div>
    )
  }
}

export default withLocalize(RacehorseEditContent)
