import React from 'react'
import PropTypes from 'prop-types'
import * as ReactDOM from 'react-dom'
import { Translate } from 'react-localize-redux'

// Images
import Horse from '../../../../assets/images/horse_white.png'

class Panel extends React.Component {
  static propTypes = {
    activeTab: PropTypes.number,
    activateTab: PropTypes.func,
    data: PropTypes.object,
    label: PropTypes.object,
    index: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      height: 0,
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this) // eslint-disable-line
      const height = el.querySelector('.panel__inner').scrollHeight
      this.setState({
        height,
      })
    }, 333)
  }

  render() {
    const { label, data, activeTab, index, activateTab } = this.props
    const { height } = this.state
    const isActive = activeTab === index
    const innerStyle = {
      height: isActive ? `${height}px` : '0px',
    }

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel__label" role="tab" onClick={activateTab}>
          <div className="throughbred">
            {label.throughbred}
            <div className="horse-img">
              <div className="horse-shadow">
                <img className="horse" src={Horse} />
              </div>
            </div>
          </div>
        </button>
        <div className="panel__inner" style={innerStyle} aria-hidden={!isActive}>
          <div className="panel__content">
            <div className="up">
              <div className="items-content">
                <div className="inner-item">
                  <div className="key">GEN</div>
                  <div className="value">{data.gen}</div>
                </div>
                <div className="inner-item">
                  <div className="key">BLOODLINE</div>
                  <div className="value">{data.bloodline}</div>
                </div>
                <div className="inner-item">
                  <div className="key">GENDER</div>
                  <div className="value">{data.gender}</div>
                </div>
                <div className="inner-item">
                  <div className="key">COAT</div>
                  <div className="value">{data.coat}</div>
                </div>
                <div className="inner-item">
                  <div className="key">RACES</div>
                  <div className="value">{data.races}</div>
                </div>
                <div className="inner-item">
                  <div className="key">CAREER</div>
                  <div className="value">{data.career}</div>
                </div>
                <div className="inner-item">
                  <div className="key">WIN RATE</div>
                  <div className="value">{data.winrate}</div>
                </div>
                <div className="inner-item">
                  <div className="key">OFFSPRING</div>
                  <div className="value">{data.offspring}</div>
                </div>
              </div>
              <div className="horse-img">
                <div className="horse-shadow">
                  <img className="horse" src={Horse} />
                </div>
              </div>
            </div>
            <div className="down">
              <div className="item-btns">
                <div className="btnn">
                  <Translate id="racing_soon" />
                </div>
                <div className="btnn">BREED SOON</div>
                <div className="btnn">SELL SOON</div>
              </div>
              <div className="racing-date">
                <div className="date-key">
                  <div className="date">{data.date}</div>
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
