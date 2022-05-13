import React from 'react'
import * as ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import { Translate } from 'react-localize-redux'
// import Tooltip from 'rc-tooltip';

// Constants
import { CURRENT_NETWORK } from '@/const/GlobalData'

// Assets
import IconRemove from '../../../../assets/images/icn-remove-24.svg'
import IconSearch from '../../../../assets/images/icn-search-24.svg'
// import IconInfo from '../../../../assets/images/icn-info-white-24.svg';

momentDurationFormatSetup(moment)

class Panel extends React.Component {
  static propTypes = {
    activateTab: PropTypes.func,
    activeTab: PropTypes.number,
    data: PropTypes.object,
    history: PropTypes.shape({
      location: PropTypes.object,
      push: PropTypes.func,
    }),
    index: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      panelHeight: 0,
      labelHeight: 0,
      handler: null,
    }

    this._dedicatedPage = this._dedicatedPage.bind(this)
    this._selectMate = this._selectMate.bind(this)
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

  _dedicatedPage() {
    this.props.history.push({
      pathname: `/racehorse/${this.props.data.horse_id}`,
    })
  }

  _selectMate() {
    let horseToBreeding = {}
    if (this.props.history.location.state && this.props.history.location.state.horseToBreeding)
      horseToBreeding = this.props.history.location.state.horseToBreeding

    this.props.history.push(
      {
        pathname: `/${this.props.data.horse_id}/select-mate`,
      },
      {
        horseToBreeding: horseToBreeding,
      },
    )
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

    let Transaction = <div className="primary-caption helpful key">{data.tx}</div>
    if (data.tx && data.tx !== 'confirmed') {
      Transaction = (
        <a
          className="primary-caption helpful key"
          href={CURRENT_NETWORK.explorer + '/tx/' + data.tx}
          rel="noopener noreferrer"
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
            </div>
            <div className="right">
              <div className="primary-text helpful stable">{data.owner_stable}</div>
              {/* please use the class names (.amber, .crimson) to select the colors of the left time */}
              <div className="primary-text date">
                {moment.duration(data.time_left, 'seconds').format('d[d] h[h] m[m]')}
              </div>
              <div className="primary-text stud_fee">
                {data.mating_price}&nbsp;<span className="symbol">Ξ</span>
              </div>
            </div>
          </div>
        </button>
        <div className="panel__inner" style={innerPanelStyle} aria-hidden={!isActive}>
          <div className="panel__content">
            <div className="horse-properties">
              <div className="panel-horse" onClick={this._dedicatedPage}>
                <img className="icon-search" src={IconSearch} />
                <img className="horse-img" src={data.img_url} />
              </div>
              <div className="name-properties">
                <img className="open-label" src={IconRemove} onClick={activateTab} />
                <div className="name-info">
                  <div className="name-sell">
                    <div className="md-text">{data.name}</div>
                  </div>
                  <div className="date-key">
                    <div className="date">{moment(data.tx_date).format('HH:mm MMM D')}</div>
                    {Transaction}
                  </div>
                </div>
                <div className="properties-content">
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="gen" />
                    </div>
                    <span className="primary-text gen">{data.genotype}</span>
                    <span className="primary-text helpful">{data.breed_type.capitalize()}</span>
                  </div>
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="bloodline" />
                    </div>
                    <div className="primary-text">{data.bloodline}</div>
                  </div>
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="gender" />
                    </div>
                    <div className="primary-text">{data.horse_type}</div>
                  </div>
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="coat" />
                    </div>
                    <span className="primary-text">{data.color}</span>
                    {data.super_coat && (
                      <span className="primary-text helpful super-coat">Super Coat</span>
                    )}
                  </div>
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="races" />
                    </div>
                    <div className="primary-text">{data.races}</div>
                  </div>
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="career" />
                    </div>
                    <div className="primary-text">{data.career}</div>
                  </div>
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="win_rate" />
                    </div>
                    <div className="primary-text">{data.winrate}</div>
                  </div>
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="offspring" />
                    </div>
                    <div className="offspring-info">
                      <div className="primary-text">{data.offspring}</div>
                      {/*<div className="primary-text helpful status">4 of 12 left</div>
                                            <Tooltip placement="rightTop"
                                                overlayStyle={{ width: '270px' }}
                                                overlay={
                                                    <div>
                                                        This racehorse has 12 offsprings overall and can breed only 4 times of 12 in this fertile year.<br/><br/>
                                                        Next period starts 13 Feb 2019
                                                    </div>
                                                }
                                            >
                                                <img className="icon" src={IconInfo}/>
                                            </Tooltip>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="other-infos">
              <div className="left">
                <div className="owner">
                  <div className="primary-caption helpful text-uppercase">
                    <Translate id="owner_stable" />
                  </div>
                  <div className="primary-text green">{data.owner_stable}</div>
                </div>
                <div className="time">
                  <div className="primary-caption helpful text-uppercase">
                    <Translate id="time_left" />
                  </div>
                  <div className="primary-text">
                    {moment.duration(data.time_left, 'seconds').format('d[d] h[h] m[m]')}
                  </div>
                </div>
              </div>
              <div className="right">
                {/*<div className="stud-fee">
                                    <div className="overline-text sm text-uppercase">
                                        <Translate id="stud_fee"/>
                                    </div>
                                    <img className="info-icn" src={IconInfo}/>
                                </div>*/}
                <div className="price-input">
                  <input
                    className="z-input sm-input"
                    type="text"
                    value={data.mating_price}
                    readOnly
                  />
                  <span className="symbol">Ξ</span>
                </div>
                <button className="primary-btn md text-capitalize" onClick={this._selectMate}>
                  <Translate id="select_mate" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Panel)
