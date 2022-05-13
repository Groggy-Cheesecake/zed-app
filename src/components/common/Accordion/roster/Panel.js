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
      panelHeight: 0,
      labelHeight: 0,
      handler: null,
    }
    this._dedicatedPage = this._dedicatedPage.bind(this)
  }

  componentDidMount() {
    const handler = window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this) // eslint-disable-line
      const panelHeight = el.querySelector('.panel__inner').scrollHeight
      const labelHeight = el.querySelector('.panel__label').scrollHeight
      this.setState({
        panelHeight,
        labelHeight,
      })
    }, 333)
    this.setState({ handler })
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.handler)
  }

  _dedicatedPage(data) {
    this.props.history.push({
      pathname: `/racehorse/${data.horse_id}`,
    })
  }

  render() {
    const { data, activeTab, index, activateTab } = this.props
    const { panelHeight, labelHeight } = this.state
    const isActive = activeTab === index
    const innerPanelStyle = {
      height: isActive ? `${panelHeight}px` : '0px',
    }
    const innerLabelStyle = {
      height: isActive ? '0px' : `${labelHeight}px`,
    }

    let Transaction = <div className="grey-text key">{data.tx}</div>
    if (data.tx && data.tx !== 'confirmed') {
      Transaction = (
        <a
          className="grey-text key"
          href={CURRENT_NETWORK.explorer + '/tx/' + data.tx}
          target="_blank"
        >
          {data.tx.substr(0, 15)}...
        </a>
      )
    }

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel__label" style={innerLabelStyle} role="tab" onClick={activateTab}>
          <div className="label-content">
            <div className="left">
              <div className="label-horse">
                <img src={data.img_url} />
              </div>
              <div className="primary-text name">{data.name}</div>
              <div className="primary-text helpful gen">{data.genotype}</div>
              <div className="primary-text helpful gender">{data.horse_type}</div>
            </div>
            <div className="right">
              <div className="primary-text helpful stable">{data.owner_stable}</div>
              {Transaction}
              <div className="primary-text date">{moment(data.tx_date).format('HH:mm MMM D')}</div>
            </div>
          </div>
        </button>
        <div className="panel__inner" style={innerPanelStyle} aria-hidden={!isActive}>
          <div className="panel__content">
            <div className="horse-properties">
              <div className="panel-horse" onClick={() => this._dedicatedPage(data)}>
                <img className="icon-search" src={IconSearch} />
                <img className="horse-img" src={data.img_url} />
              </div>
              <div className="name-properties">
                <img className="open-label" src={IconRemove} onClick={activateTab} />
                <div className="name-info">
                  <div className="name-sell">
                    <div className="md-text">{data.name}</div>
                    <div className="sell-sign text-uppercase">
                      <Translate id="sold" />
                    </div>
                  </div>
                  <div className="date-key">
                    <div className="date">{moment(data.tx_date).format('HH:mm MMM D')}</div>
                    {Transaction}
                  </div>
                </div>
                <div className="properties-content">
                  <div className="item">
                    <div className="grey-text text-uppercase">
                      <Translate id="gen" />
                    </div>
                    <span className="normal-text gen">{data.genotype}</span>
                    <span className="primary-text helpful">{data.breed_type.capitalize()}</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withLocalize(Panel))
