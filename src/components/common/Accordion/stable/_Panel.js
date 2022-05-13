/* eslint-disable */
import React from 'react'
import * as ReactDOM from 'react-dom'
import moment from 'moment'
import { Translate } from 'react-localize-redux'

import PropTypes from 'prop-types'

class Panel extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      height: 0,
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this)
      const height = el.querySelector('.panel__inner').scrollHeight
      this.setState({
        height,
      })
    }, 333)
  }

  render() {
    const { data, activeTab, index, activateTab } = this.props
    const { height } = this.state
    const isActive = activeTab === index
    const innerStyle = {
      height: isActive ? `${height}px` : '0px',
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
        <button className="panel__label" role="tab" onClick={activateTab}>
          <div className="throughbred">
            {data.name}
            <div className="horse-img">
              <div className="horse-shadow">
                <img src={data.img_url} />
              </div>
            </div>
          </div>
        </button>
        <div className="panel__inner" style={innerStyle} aria-hidden={!isActive}>
          <div className="panel__content">
            <div className="up">
              <div className="items-content">
                <div className="inner-item">
                  <div className="key text-uppercase">
                    <Translate id="gen" />
                  </div>
                  <div className="value">{data.gen}</div>
                </div>
                <div className="inner-item">
                  <div className="key text-uppercase">
                    <Translate id="bloodline" />
                  </div>
                  <div className="value">{data.bloodline}</div>
                </div>
                <div className="inner-item">
                  <div className="key text-uppercase">
                    <Translate id="gender" />
                  </div>
                  <div className="value">{data.gender}</div>
                </div>
                <div className="inner-item">
                  <div className="key text-uppercase">
                    <Translate id="coat" />
                  </div>
                  <div className="value">{data.coat}</div>
                </div>
                <div className="inner-item">
                  <div className="key text-uppercase">
                    <Translate id="races" />
                  </div>
                  <div className="value">{data.races}</div>
                </div>
                <div className="inner-item">
                  <div className="key text-uppercase">
                    <Translate id="career" />
                  </div>
                  <div className="value">{data.career}</div>
                </div>
                <div className="inner-item">
                  <div className="key text-uppercase">
                    <Translate id="win_rate" />
                  </div>
                  <div className="value">{data.winrate}</div>
                </div>
                <div className="inner-item">
                  <div className="key text-uppercase">
                    <Translate id="offspring" />
                  </div>

                  <div className="value">{data.offspring}</div>
                </div>
              </div>
              <div className="horse-img">
                <div className="horse-shadow">
                  <img className="horse" src={data.img_url} />
                </div>
              </div>
            </div>
            <div className="down">
              <div className="item-btns">
                <div className="btnn">
                  <Translate id="racing_soon" />
                </div>
                <div className="btnn text-uppercase">
                  <Translate id="breed_soon" />
                </div>
                <div className="btnn text-uppercase">
                  <Translate id="sell_soon" />
                </div>
              </div>
              <div className="racing-date">
                <div className="date-key">
                  <div className="date">{moment(data.tx_date).format('HH:mm MMM D')}</div>
                  <div className="key">{data.key}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Panel
