import React from 'react'
import PropTypes from 'prop-types'
import * as ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { Translate } from 'react-localize-redux'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import Tooltip from 'rc-tooltip'

// Components
import PriceInput from '../../_base/PriceInput'

// Constants
import { CURRENT_NETWORK } from '@/const/GlobalData'
import GenderData from '../../../static/gender.js'

// Images
import IconRemove from '../../../../assets/images/icn-remove-24.svg'
import IconSearch from '../../../../assets/images/icn-search-24.svg'
import Share from '../../../../assets/images/icn-share-24.svg'
import IconInfo from '../../../../assets/images/icn-info-white-24.svg'

momentDurationFormatSetup(moment)

const getTimeLeft = (createdAt, duration) => {
  const now = moment().unix()
  return moment
    .duration(createdAt + duration - now, 'seconds')
    .format('d[d] h[h] m[m]', { trim: 'all' })
}

class Panel extends React.Component {
  static propTypes = {
    activeTab: PropTypes.number,
    activateTab: PropTypes.func,
    data: PropTypes.object,
    index: PropTypes.number,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    openOffspringModal: PropTypes.func,
    openBidHistoryModal: PropTypes.func,
    openPlaceBidModal: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      panelHeight: 0,
      labelHeight: 0,
      bidPrice: props.data.minBidPrice,
    }

    this._dedicatedPage = this._dedicatedPage.bind(this)
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this) // eslint-disable-line
      const panelHeight = el.querySelector('.panel__inner').scrollHeight
      const labelHeight = el.querySelector('.panel__label').scrollHeight
      this.setState({
        panelHeight,
        labelHeight,
      })
    }, 333)
  }

  onChangePrice = obj => {
    this.setState({ bidPrice: obj.value })
  }

  _dedicatedPage(data) {
    this.props.history.push({
      pathname: `/racehorse/${data.horseId}`,
    })
  }

  render() {
    const { data, activeTab, index, activateTab } = this.props
    const { bidPrice, panelHeight, labelHeight } = this.state

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
        // eslint-disable-next-line
        <a
          className="primary-caption helpful key"
          href={CURRENT_NETWORK.explorer + '/tx/' + data.tx}
          target="_blank"
        >
          {data.tx.substr(0, 15)}...
        </a>
      )
    }

    const minBidPriceNumber = parseFloat(data.minBidPrice)

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
              <div className="primary-text helpful gender">{data.gender}</div>
            </div>
            <div className="right">
              <div className="primary-text helpful stable">{data.owner_stable}</div>
              {/* please use the class names (.amber, .crimson) to select the colors of the left time */}
              <div className="primary-text date">{getTimeLeft(data.createdAt, data.duration)}</div>
              <div className="primary-text stud_fee">
                {data.maxBid !== '0' ? data.maxBid : data.minBidPrice}&nbsp;
                <span className="symbol">Ξ</span>
                <span className="xs-text">{data.bidders.length}</span>
              </div>
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
                    <img className="share-icon" src={Share} />
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
                    <span className="primary-text helpful">
                      {GenderData[data.genotype] && GenderData[data.genotype]['desc']}
                    </span>
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
                    <div className="primary-text">{data.gender}</div>
                  </div>
                  <div className="item">
                    <div className="primary-caption helpful text-uppercase">
                      <Translate id="coat" />
                    </div>
                    <span className="primary-text">{data.color}</span>
                    <span className="primary-text helpful super-coat">Super Coat</span>
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
                      <div className="primary-text" onClick={this.props.openOffspringModal}>
                        {data.offspring}
                      </div>
                      <Tooltip
                        placement="rightTop"
                        overlayStyle={{ width: '270px' }}
                        overlay={
                          <div>
                            This racehorse has 12 offsprings overall and can breed only 4 times of
                            12 in this fertile year.
                            <br />
                            <br />
                            Next period starts 13 Feb 2019
                          </div>
                        }
                      >
                        <img className="icon" src={IconInfo} />
                      </Tooltip>
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
                  <div className="primary-text">{getTimeLeft(data.createdAt, data.duration)}</div>
                </div>
                <div className="last-bid">
                  <div className="primary-caption helpful text-uppercase">
                    <Translate id="last_bid" />
                  </div>
                  {data.maxBid !== '0' && (
                    <div
                      className="primary-text"
                      onClick={() => this.props.openBidHistoryModal(data.auctionId, data.bidders)}
                    >
                      {data.maxBid}&nbsp;<span className="symbol">Ξ</span>
                      <span className="xs-text green">{data.bidders.length}</span>
                    </div>
                  )}
                  {data.maxBid === '0' && <div className="primary-text">NA</div>}
                </div>
              </div>
              <div className="right">
                <div className="overline-text sm text-uppercase">
                  <Translate id="your_bid" />:
                </div>
                <PriceInput
                  infoText={<div>Minimum price to enter the bid</div>}
                  ethPrice={bidPrice}
                  minPrice={minBidPriceNumber}
                  onChange={this.onChangePrice}
                />
                <button
                  className="primary-btn md text-capitalize"
                  disabled={bidPrice < minBidPriceNumber}
                  onClick={() => this.props.openPlaceBidModal(data, bidPrice)}
                >
                  <Translate id="place_bid" />
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
