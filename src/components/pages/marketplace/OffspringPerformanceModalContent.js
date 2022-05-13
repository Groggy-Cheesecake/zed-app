import React from 'react'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/MarketplacePage'
import IcnClose from '../../../assets/images/icn-close-24.svg'
import IconOffspring from '../../../assets/images/icn-offspring-24.svg'

class OffspringPerformanceModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.props.addTranslation({ marketplace: i18n })
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div className="offspring-modal-content">
        <form className="offspring-confirm-form" onSubmit={this.handleSubmit}>
          <img className="icon close-icon" src={IcnClose} onClick={this.props.closeModal} />
          <section>
            <div className="section-header">
              <div className="modal-title">
                <img className="icon-off" src={IconOffspring} />
                <div className="md-text title">
                  <Translate id="marketplace.offspring_performance" />
                </div>
              </div>
            </div>
            <div className="section-content">
              <div className="performance-properties">
                <div className="property one">
                  <div className="grey-text text-uppercase">
                    <Translate id="marketplace.born" />
                  </div>
                  <div className="normal-text">369</div>
                </div>
                <div className="property two">
                  <div className="grey-text text-uppercase">
                    <Translate id="marketplace.colt" />
                  </div>
                  <div className="normal-text">190</div>
                </div>
                <div className="property three">
                  <div className="grey-text text-uppercase">
                    <Translate id="marketplace.filly" />
                  </div>
                  <div className="normal-text">199</div>
                </div>
              </div>
              <div className="performance-properties">
                <div className="property one">
                  <div className="grey-text text-uppercase">
                    <Translate id="marketplace.progeny_result" />
                  </div>
                  <div className="normal-text">1/0/0/0</div>
                </div>
                <div className="property two">
                  <div className="grey-text text-uppercase">
                    <Translate id="marketplace.place" />
                  </div>
                  <div className="normal-text">0%</div>
                </div>
                <div className="property three">
                  <div className="grey-text text-uppercase">
                    <Translate id="marketplace.win" />
                  </div>
                  <div className="normal-text">1.2%</div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    )
  }
}

export default withLocalize(OffspringPerformanceModalContent)
