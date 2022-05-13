import React from 'react'

import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/RacingPage'
import IconInfo from '../../../assets/images/icn-info-24.svg'
import Tooltip from 'rc-tooltip'
import './racing_results_detail.scss'
import Cities from '../../static/cities'

class RacingResultsDetailContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
    data: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.props.addTranslation({ racing: i18n })
  }

  render() {
    const { data } = this.props
    return (
      <div className="racing-results-detail">
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
            <div className="racing-price">
              <div className="overline-text sm text-uppercase">
                <Translate id="racing.result" />
              </div>
              <div className="md-text green text-uppercase">5/23/8/42</div>
            </div>
            <div className="racing-time">
              <div className="overline-text sm text-uppercase">
                <Translate id="racing.date" />
              </div>
              <div className="md-text">Nov 8, 2018 - 15:52</div>
            </div>
          </div>
        </div>
        <div className="racing-detail">
          <div className="overline-text sm text-uppercase starting-pos">
            <Translate id="racing.starting_positions" />
          </div>
          <div className="positions-part">
            <div className="pos-columns">
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">1st</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z1</div>
                </div>
                <div className="pos-num orange">99</div>
                <div className="pos-bg orange-bg" />
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">2nd</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z2</div>
                </div>
                <div className="pos-num yellow">12</div>
                <div className="pos-bg yellow-bg" />
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">3rd</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z3</div>
                </div>
                <div className="pos-num gold">13</div>
                <div className="pos-bg gold-bg" />
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">4th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z4</div>
                </div>
                <div className="pos-num teal">34</div>
                <div className="pos-bg teal-bg" />
              </div>
            </div>
            <div className="pos-columns">
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">5th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z5</div>
                </div>
                <div className="pos-num sky">2</div>
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">6th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z5</div>
                </div>
                <div className="pos-num mauve">22</div>
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">7th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z1</div>
                </div>
                <div className="pos-num pink">99</div>
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">8th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z1</div>
                </div>
                <div className="pos-num viridian">99</div>
              </div>
            </div>
            <div className="pos-columns">
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">9th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z1</div>
                </div>
                <div className="pos-num violet">99</div>
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">10th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z1</div>
                </div>
                <div className="pos-num chartreuse">99</div>
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">11th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z1</div>
                </div>
                <div className="pos-num ochre">99</div>
              </div>
              <div className="pos-item">
                <div className="pos-info">
                  <div className="primary-text pos">12th</div>
                  <div className="primary-text secondary text-capitalize name">tyler</div>
                  <div className="primary-text secondary text-capitalize">z1</div>
                </div>
                <div className="pos-num blue">99</div>
              </div>
            </div>
          </div>
          <div className="race-tx">
            <div className="tx">
              <div className="overline-text sm text-uppercase">
                <Translate id="racing.race_tx" />
              </div>
              <div className="primary-text">0x6977dbbac451af2bc7848a</div>
            </div>
            <button className="primary-btn md text-capitalize replay">Replay</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withLocalize(RacingResultsDetailContent))
