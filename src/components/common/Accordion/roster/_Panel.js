/* eslint-disable */

import React from 'react'
import * as ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { CURRENT_NETWORK } from '@/const/GlobalData'
import IconRemove from '../../../../assets/images/icn-remove-24.svg'
import IconSearch from '../../../../assets/images/icn-search-24.svg'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'

class Panel extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      labelHeight: 0,
    }
    this._dedicatedPage = this._dedicatedPage.bind(this)

    this.panel = React.createRef()
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this)
      const labelHeight = el.querySelector('.panel__label').scrollHeight
      this.setState({ labelHeight })
    }, 333)

    window.addEventListener('resize', this.updateWindowDimensions)
    // this.panel.current.scrollIntoView({block: 'start'});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    if (this.props.activeTab === this.props.index) {
      this.panel.current.scrollIntoView({ block: 'start' })
    }
  }

  _dedicatedPage(data) {
    this.props.history.push({
      pathname: `/racehorse/${data.horse_id}`,
    })
  }

  render() {
    const { data, activeTab, index, activateTab } = this.props
    const { labelHeight } = this.state
    const isActive = activeTab === index
    const innerPanelStyle = {
      height: isActive ? `calc(100vh - 40px)` : '0px',
    }
    const innerLabelStyle = {
      height: isActive ? '0px' : `${labelHeight}px`,
    }

    let Transaction = <div className="grey-text key">{data.tx}</div>
    if (data.tx && data.tx !== 'confirmed') {
      Transaction = (
        <a className="key" href={CURRENT_NETWORK.explorer + '/tx/' + data.tx} target="_blank">
          {data.tx.substr(0, 15)}...
        </a>
      )
    }

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel__label" style={innerLabelStyle} role="tab" onClick={activateTab}>
          <div className="label-content">
            <div className="up">
              <img className="label-horse" src={data.img_url} />
              <div className="horse-info">
                <div className="primary-text name">{data.name}</div>
                <div className="horse-type">
                  <div className="primary-text helpful gen">{data.genotype}</div>
                  <div className="primary-text helpful gender">{data.horse_type}</div>
                </div>
              </div>
            </div>
            <div className="down">
              <div className="primary-text helpful stable">{data.owner_stable}</div>
              <div className="primary-text date">{moment(data.tx_date).format('HH:mm MMM D')}</div>
            </div>
          </div>
        </button>
        <div
          className="panel__inner"
          style={innerPanelStyle}
          aria-hidden={!isActive}
          ref={this.panel}
        >
          <div className="panel__content">
            <div className="horse-properties">
              <img className="open-label" src={IconRemove} onClick={activateTab} />
              <div className="md-text horse-name">{data.name}</div>
              <div className="sell-sign text-uppercase">
                <Translate id="sold" />
              </div>
              <div className="date-key">
                <div className="date">{moment(data.tx_date).format('HH:mm MMM D')}</div>
                {Transaction}
              </div>
              <div className="panel-horse" onClick={() => this._dedicatedPage(data)}>
                <img className="icon-search" src={IconSearch} />
                <img className="horse-img" src={data.img_url} />
              </div>
              <div className="properties-content">
                <div className="item">
                  <div className="grey-text text-uppercase">
                    <Translate id="gen" />
                  </div>
                  <div className="normal-text">{data.genotype}</div>
                </div>
                <div className="item">
                  <div className="grey-text text-uppercase">
                    <Translate id="bloodline" />
                  </div>
                  <div className="normal-text">{data.bloodline}</div>
                </div>
                <div className="item">
                  <div className="grey-text text-uppercase">
                    <Translate id="gender" />
                  </div>
                  <div className="normal-text">{data.horse_type}</div>
                </div>
                <div className="item">
                  <div className="grey-text text-uppercase">
                    <Translate id="coat" />
                  </div>
                  <div className="normal-text">{data.color}</div>
                </div>
                <div className="item">
                  <div className="grey-text text-uppercase">
                    <Translate id="races" />
                  </div>
                  <div className="normal-text">{data.races}</div>
                </div>
                <div className="item">
                  <div className="grey-text text-uppercase">
                    <Translate id="career" />
                  </div>
                  <div className="normal-text">{data.career}</div>
                </div>
                <div className="item">
                  <div className="grey-text text-uppercase">
                    <Translate id="win_rate" />
                  </div>
                  <div className="normal-text">{data.winrate}</div>
                </div>
                <div className="item">
                  <div className="grey-text text-uppercase">
                    <Translate id="offspring" />
                  </div>
                  <div className="normal-text green">{data.offspring}</div>
                </div>
              </div>
              <button className="outline-btn sm close-btn" onClick={activateTab}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withLocalize(Panel))
