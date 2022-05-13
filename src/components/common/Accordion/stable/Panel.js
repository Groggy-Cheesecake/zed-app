import React from 'react'
import * as ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Translate, withLocalize } from 'react-localize-redux'
// import Tooltip from 'rc-tooltip';
import moment from 'moment'

// Constants
import {
  CURRENT_NETWORK,
  UNNAMED_FOAL,
  // MAX_MALE_OFFSPRINGS,
  // MAX_FEMALE_OFFSPRINGS
} from '@/const/GlobalData'

// Utils
import { formatTimePassedFrom } from '@/utils'

// Components
import IconText from '../../_base/IconText'

// Assets
import IconRemove from '../../../../assets/images/icn-remove-24.svg'
import IconSearch from '../../../../assets/images/icn-search-24.svg'
import IconShare from '../../../../assets/images/icn-share-24.svg'
import IconAuction from '../../../../assets/images/icn-auction-24.svg'
import IconStud from '../../../../assets/images/icn-stud-24.svg'
import IconHorse from '../../../../assets/images/icn-horse-24.svg'
import IconRace from '../../../../assets/images/icn-race-24.svg'
import NewHorse from '../../../../assets/images/horse-ED1846.svg'

// const getMaxOffspringsByHorse = (horse) => {
//     return (['Colt', 'Stallion'].indexOf(horse.horse_type) !== -1) ? MAX_MALE_OFFSPRINGS : MAX_FEMALE_OFFSPRINGS;
// };

class Panel extends React.Component {
  static propTypes = {
    activateTab: PropTypes.func,
    activeTab: PropTypes.number,
    addTranslation: PropTypes.func,
    data: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func,
      location: PropTypes.object,
    }),
    index: PropTypes.number,
    makeOffer: PropTypes.bool,
    openBreedModal: PropTypes.func,
    openOffspringNameModal: PropTypes.func,
    openShareModal: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      panelHeight: 0,
      labelHeight: 0,
      handler: null,
    }

    this._dedicatedPage = this._dedicatedPage.bind(this)
    this._selectMatePage = this._selectMatePage.bind(this)
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

  _selectMatePage(data) {
    this.props.history.push({
      pathname: `/${data.horse_id}/select-mate`,
    })
  }

  render() {
    const { activateTab, activeTab, data, index, openOffspringNameModal } = this.props
    const { panelHeight, labelHeight } = this.state
    const isActive = activeTab === index
    const isBreedingLimitReached = data.breeding_counter === 0
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
        <div
          className="panel__label"
          style={innerLabelStyle}
          onClick={data.name !== UNNAMED_FOAL ? activateTab : () => openOffspringNameModal(data)}
        >
          {data.name !== UNNAMED_FOAL ? (
            <div className="label-content">
              <div className="left">
                <div className="label-horse">
                  <img src={data.img_url} />
                </div>
                <div className="primary-text name">{data.name}</div>
                <div className="primary-text helpful gen">{data.genotype}</div>
                <div className="primary-text helpful gender">{data.horse_type}</div>
                {data.super_coat && <div className="primary-text helpful sc">SC</div>}
              </div>
              <div className="right">
                {data.in_stud && <span className="stud-badge">IN STUD</span>}
              </div>
            </div>
          ) : (
            <div className="label-content">
              <div className="left">
                <div className="label-horse new">
                  <img src={NewHorse} />
                </div>
                <div className="primary-text">Newborn</div>
              </div>
              <div className="right">
                <div className="primary-text helpful">
                  Born {formatTimePassedFrom(data.tx_date)}
                </div>
                <button
                  className="primary-btn md thin"
                  onClick={() => this.props.openOffspringNameModal(data)}
                >
                  Name
                </button>
              </div>
            </div>
          )}
        </div>
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
                  <div className="name-icon">
                    <div className="md-text">{data.name ? data.name : UNNAMED_FOAL}</div>
                    {data.in_stud && <span className="stud-badge">IN STUD</span>}
                    <img
                      className="icon share"
                      src={IconShare}
                      onClick={() => this.props.openShareModal(data)}
                    />
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
                    {data.super_coat && <span className="primary-text helpful super">Super</span>}
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
                      {/*<div
                        className="primary-text helpful status">{data.offsprings} of {getMaxOffspringsByHorse(data)} left
                      </div>
                      <Tooltip placement="rightTop"
                               overlayStyle={{width: '270px'}}
                               overlay={
                                 <div>
                                   This racehorse has 12 offsprings overall and can breed only 4 times of 12 in this
                                   fertile year.<br/><br/>
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
            {this.props.makeOffer ? (
              <div className="panel-btns make-offer">
                <div className="left">
                  <IconText
                    isDisabled={true}
                    icon={IconHorse}
                    translateId="details"
                    onClick={null}
                    overlayText="Progeny status soon"
                    data={null}
                  />
                </div>
                {/*<div className="right">
                  <button className="primary-btn md text-capitalize make-offer">
                    make offer
                  </button>
                </div>*/}
              </div>
            ) : (
              <div className="panel-btns">
                <div className="left">
                  <IconText
                    isDisabled={true}
                    icon={IconHorse}
                    translateId="details"
                    onClick={null}
                    overlayText="Progeny status soon"
                    data={null}
                  />
                  <IconText
                    isDisabled={true}
                    icon={IconAuction}
                    translateId="sell"
                    onClick={null}
                    overlayText="Auctions coming soon"
                    data={null}
                  />
                  {/*<IconText
                    isDisabled={true}
                    icon={IconAuction}
                    translateId='sell'
                    onClick={this.props.openSellModal}
                    overlayText=''
                    data/>*/}
                  <IconText
                    isDisabled={isBreedingLimitReached}
                    icon={IconStud}
                    translateId="breed"
                    onClick={
                      isBreedingLimitReached
                        ? null
                        : !data.in_stud
                        ? this.props.openBreedModal
                        : this._selectMatePage
                    }
                    overlayText={isBreedingLimitReached ? 'Breeding limit reached' : ''}
                    data={data}
                  />
                  <IconText
                    isDisabled={true}
                    icon={IconRace}
                    translateId="menu_items.racing"
                    onClick={null}
                    overlayText="Racing coming soon"
                    data={null}
                  />
                </div>
                {/*<div className="right">
                  <div className="toggle-part">
                    {RenderIcon(false, IconInfo, 'racing_lottery', null, '', null)}
                    <ToggleSwtich/>
                  </div>
                  <div className="toggle-part">
                    {RenderIcon(false, IconInfo, 'make_offer', null, '', null)}
                    <ToggleSwtich/>
                  </div>
                </div>*/}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withLocalize(Panel))
