import React from 'react'

import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/RacingPage'
import Select from '../_base/Select'
import IconInfo from '../../../assets/images/icn-info-24.svg'
import Cities from '../../static/cities.js'
import Tooltip from 'rc-tooltip'
import './racing_schedule_detail.scss'

class RacingScheduleDetailContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
    data: PropTypes.object,
    detail: PropTypes.bool,
    openBuyInModal: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
    }
    this.props.addTranslation({ racing: i18n })
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSelectedOption = this.handleSelectedOption.bind(this)
  }

  handleSelectChange(selectedOption) {
    this.setState({ selectedOption })
  }

  handleSelectedOption(select) {
    this.setState({
      selectedOption: {
        value: select,
        label: select,
      },
    })
  }

  render() {
    const { data } = this.props
    const options = [
      {
        value: 'G6',
        label: 'G6',
      },
      {
        value: 'G10',
        label: 'G10',
      },
    ]
    return (
      <div className="racing-schedule-detail">
        <div className="racing-summary">
          <div className="left">
            <img className="country-img" src={Cities[data.cityImg]} />
            <div className="racing-info">
              <div className="location">
                <div className="md-text">{data.cityName}</div>
                <Tooltip placement="right" overlay="Tampines International Sprint">
                  <img className="icon" src={IconInfo} />
                </Tooltip>
              </div>
              <div className="infos">
                <div className="info-item">
                  <div className="overline-text sm text-uppercase">
                    <Translate id="racing.race" />
                  </div>
                  <div className="primary-text">4</div>
                </div>
                <div className="info-item">
                  <div className="overline-text sm text-uppercase">
                    <Translate id="racing.distance" />
                  </div>
                  <div className="primary-text">1900m</div>
                </div>
                <div className="info-item">
                  <div className="overline-text sm text-uppercase">
                    <Translate id="racing.grade" />
                  </div>
                  <div className="primary-text">Group 2</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {this.props.detail ? (
              <div className="racing-price">
                <div className="overline-text sm text-uppercase">
                  <Translate id="racing.prize" />
                </div>
                <div className="md-text green text-uppercase">
                  2.52&nbsp;<span className="symbol">Ξ</span>
                </div>
              </div>
            ) : null}
            <div className="racing-time">
              <div className="overline-text sm text-uppercase">
                <Translate id="racing.starts_in" />
              </div>
              <div className="md-text">2m 23s</div>
            </div>
          </div>
        </div>
        {this.props.detail ? (
          <div className="racing-detail">
            <div className="overline-text sm text-uppercase starting-pos">
              <Translate id="racing.starting_positions" />
            </div>
            <div className="positions-part">
              <div className="pos-columns">
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G1</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z1</div>
                  </div>
                  <div className="pos-num orange">99</div>
                </div>
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G2</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z2</div>
                  </div>
                  <div className="pos-num yellow">12</div>
                </div>
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G3</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z3</div>
                  </div>
                  <div className="pos-num gold">13</div>
                </div>
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G4</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z4</div>
                  </div>
                  <div className="pos-num teal">34</div>
                </div>
              </div>
              <div className="pos-columns">
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G5</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z5</div>
                  </div>
                  <div className="pos-num sky">2</div>
                </div>
                <div
                  className={`pos-item selectable ${
                    this.state.selectedOption && this.state.selectedOption.value === 'G6'
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => this.handleSelectedOption('G6')}
                >
                  <div className="pos-info">
                    <div className="primary-text pos">G6</div>
                    <div className="primary-text secondary green text-capitalize">
                      <Translate id="racing.open_to_buy" />
                    </div>
                  </div>
                  {this.state.selectedOption && this.state.selectedOption.value === 'G6' ? (
                    <div className="primary-text secondary text-capitalize select-txt">
                      selected
                    </div>
                  ) : (
                    <div className="primary-text text-capitalize select-txt">select</div>
                  )}
                </div>
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G7</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z1</div>
                  </div>
                  <div className="pos-num pink">99</div>
                </div>
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G8</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z1</div>
                  </div>
                  <div className="pos-num viridian">99</div>
                </div>
              </div>
              <div className="pos-columns">
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G9</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z1</div>
                  </div>
                  <div className="pos-num violet">99</div>
                </div>
                <div
                  className={`pos-item selectable ${
                    this.state.selectedOption && this.state.selectedOption.value === 'G10'
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => this.handleSelectedOption('G10')}
                >
                  <div className="pos-info">
                    <div className="primary-text pos">G10</div>
                    <div className="primary-text secondary green text-capitalize">
                      <Translate id="racing.open_to_buy" />
                    </div>
                  </div>
                  {this.state.selectedOption && this.state.selectedOption.value === 'G10' ? (
                    <div className="primary-text secondary text-capitalize select-txt">
                      selected
                    </div>
                  ) : (
                    <div className="primary-text text-capitalize select-txt">select</div>
                  )}
                </div>
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G11</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z1</div>
                  </div>
                  <div className="pos-num ochre">99</div>
                </div>
                <div className="pos-item">
                  <div className="pos-info">
                    <div className="primary-text pos">G12</div>
                    <div className="primary-text secondary text-capitalize name">tyler</div>
                    <div className="primary-text helpful text-capitalize">z1</div>
                  </div>
                  <div className="pos-num blue">99</div>
                </div>
              </div>
            </div>
            <div className="pos-select-detail">
              <div className="other-infos">
                <div className="left">
                  <div className="open">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="racing.open" />
                    </div>
                    <div className="primary-text">2</div>
                  </div>
                  <div className="time">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="racing.bids_close" />
                    </div>
                    <div className="primary-text">23s</div>
                  </div>
                  <div className="last-bid">
                    <div className="overline-text sm text-uppercase">
                      <Translate id="last_bid" />
                    </div>
                    <div className="primary-text">
                      1.26&nbsp;<span className="symbol">Ξ</span>&nbsp;&nbsp;
                      <span className="overline-text sm text-uppercase">3</span>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="select-content select-gate">
                    <Select
                      value={this.state.selectedOption}
                      onChange={this.handleSelectChange}
                      options={options}
                      isSearchable={false}
                      placeholder="Select Gate"
                    />
                  </div>
                  <div className="overline-text sm text-uppercase min-bid">
                    <Translate id="racing.min_bid" />
                    <img className="icon" src={IconInfo} />
                  </div>
                  <div className="price-input">
                    <input className="z-input sm-input" type="text" value={1.28} readOnly={true} />
                    <span className="symbol">Ξ</span>
                  </div>
                  <button
                    className="primary-btn md text-capitalize buy-in"
                    onClick={this.props.openBuyInModal}
                  >
                    <Translate id="racing.buy_in" />
                  </button>
                </div>
              </div>
              <div className="select-views">
                <div className="view-item">
                  <div className="primary-text helpful pos">G1</div>
                  <div className="pos-wrap">
                    <div className="pos-num orange">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G2</div>
                  <div className="pos-wrap">
                    <div className="pos-num yellow">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G3</div>
                  <div className="pos-wrap">
                    <div className="pos-num gold">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G4</div>
                  <div className="pos-wrap">
                    <div className="pos-num teal">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G5</div>
                  <div className="pos-wrap">
                    <div className="pos-num sky">99</div>
                  </div>
                </div>
                <div
                  className={`view-item selectable ${
                    this.state.selectedOption && this.state.selectedOption.value === 'G6'
                      ? 'selected'
                      : ''
                  }`}
                >
                  <div className="primary-text helpful pos">G6</div>
                  <div className="pos-wrap" onClick={() => this.handleSelectedOption('G6')}>
                    <div className="pos-num mauve">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G7</div>
                  <div className="pos-wrap">
                    <div className="pos-num pink">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G8</div>
                  <div className="pos-wrap">
                    <div className="pos-num viridian">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G9</div>
                  <div className="pos-wrap">
                    <div className="pos-num violet">99</div>
                  </div>
                </div>
                <div
                  className={`view-item selectable ${
                    this.state.selectedOption && this.state.selectedOption.value === 'G10'
                      ? 'selected'
                      : ''
                  }`}
                >
                  <div className="primary-text helpful pos">G10</div>
                  <div className="pos-wrap" onClick={() => this.handleSelectedOption('G10')}>
                    <div className="pos-num ochre">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G11</div>
                  <div className="pos-wrap">
                    <div className="pos-num ochre">99</div>
                  </div>
                </div>
                <div className="view-item">
                  <div className="primary-text helpful pos">G12</div>
                  <div className="pos-wrap">
                    <div className="pos-num blue">99</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default withRouter(withLocalize(RacingScheduleDetailContent))
