import 'rc-tooltip/assets/bootstrap.css'
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Translate, withLocalize } from 'react-localize-redux'

// Constants
import i18n from '@/const/i18n/SelectMatePage'

// Components
import LoadingIndicator from 'components/shared/LoadingIndicator'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class FemaleSelectModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
    onChangeMate: PropTypes.func,
    options: PropTypes.array,
    isStableLoading: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ select_mate: i18n })
  }

  _handleSubmit(horse) {
    this.props.onChangeMate(horse)
    this.props.closeModal()
  }

  get getOptions() {
    return this.props.options.map(horse => {
      return {
        value: horse.name,
        horse,
      }
    })
  }

  CustomOption = props => {
    const horse = props.data.horse

    return (
      <div className="horse-card" onClick={() => this._handleSubmit(horse)}>
        <div className="left">
          <img className="horse-img" src={horse.img_url} />
          <div className="primary-text">{horse.name}</div>
          <div className="primary-text helpful point">{horse.genotype}</div>
          <div className="primary-text helpful point">{horse.horse_type}</div>
        </div>
        <div className="right">
          <div className="primary-text helpful">{horse.breeding_counter} breeds left</div>
        </div>
      </div>
    )
  }

  render() {
    const { isStableLoading } = this.props

    return (
      <div className="female-select-content">
        <form className="female-select-form" onSubmit={this._handleSubmit}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
          <section>
            <div className="section-header">
              <div className="md-text text-capitalize title">
                <Translate id="select_mate.select_female" />
              </div>
            </div>
            <div className="section-content">
              {isStableLoading && <LoadingIndicator fixed busy />}

              {!isStableLoading && (
                <Select
                  className="z-horse-auto-complete"
                  classNamePrefix="z-auto"
                  components={{ Option: this.CustomOption }}
                  options={this.getOptions}
                  menuIsOpen={true}
                  placeholder="Search a racehorse"
                  noOptionsMessage={() =>
                    'To breed with a colt or stallion, you must own a filly or mare.'
                  }
                />
              )}
            </div>
          </section>
        </form>
      </div>
    )
  }
}

export default withLocalize(FemaleSelectModalContent)
