/* eslint-disable */

import React from 'react'
import * as ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
// import moment from 'moment';
// import { CURRENT_NETWORK } from '@/const/GlobalData';
// import {Translate} from 'react-localize-redux';
import RacingResultsDetail from '../../RacingResultsContent/RacingResultsDetail.js'
import Cities from '../../../static/cities.js'
import IconRemove from '../../../../assets/images/icn-remove-24.svg'

class RegistrationPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      panelHeight: 0,
      labelHeight: 0,
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this)
      const panelHeight = el.querySelector('.panel__inner').scrollHeight
      const labelHeight = el.querySelector('.panel__label').scrollHeight
      this.setState({
        panelHeight,
        labelHeight,
      })
    }, 333)
  }

  render() {
    const { activeTab, index, activateTab, data } = this.props
    const { panelHeight, labelHeight } = this.state
    const isActive = activeTab === index
    const innerPanelStyle = {
      height: isActive ? `${panelHeight}px` : '0px',
    }
    const innerLabelStyle = {
      height: isActive ? '0px' : `${labelHeight}px`,
    }

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button
          className="panel__label results"
          style={innerLabelStyle}
          role="tab"
          onClick={activateTab}
        >
          <div className="label-content">
            <div className="left">
              <div className="label-img">
                <img src={Cities[data.cityImg]} />
              </div>
              <div className="normal-text name">{data.cityName}</div>
              <div className="overline-text sm">R2</div>
              <div className="overline-text sm gen">1900m</div>
              <div className="overline-text sm gen">Group 2</div>
            </div>
            <div className="right">
              <div className="primary-text green gate">5/23/8/42</div>
              <div className="primary-text time">Nov 8, 2018 - 15:52</div>
            </div>
          </div>
        </button>
        <div className="panel__inner" style={innerPanelStyle} aria-hidden={!isActive}>
          <div className="panel__content">
            <img className="open-label" src={IconRemove} onClick={activateTab} />
            <RacingResultsDetail data={data} />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(RegistrationPanel)
