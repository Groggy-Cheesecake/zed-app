import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import { Translate, withLocalize } from 'react-localize-redux'

// Actions
import actions from 'state/actions'

// Constants
import i18n from '@/const/i18n/ActivityPage'

// Components
import ColoredHorse from '../../common/_base/Horse/ColoredHorse'
import LoadingIndicator from 'components/shared/LoadingIndicator'

// Images
// import StatusEth from '../../../assets/images/icn-status-eth-24.svg'
import StatusHorse from '../../../assets/images/icn-status-horse-24.svg'
import GlowImg from '../../../assets/images/bkg-oval-top-bottom.svg'
import EmptyContent from '../../common/EmptyContent'
import StatusLove from '../../../assets/images/icn-status-love-24.svg'

//Utils
import { getBrightness } from '../../../utils'

class ActivityPageContent extends React.Component {
  static propTypes = {
    activities: PropTypes.array,
    isLoading: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    hasMore: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    loadActivities: PropTypes.func,
    loadMoreActivites: PropTypes.func,
    addTranslation: PropTypes.func,
    releaseNumber: PropTypes.number,
    currentBatch: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this._loadMore = this._loadMore.bind(this)
    this.props.addTranslation({ activity_page: i18n })
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.loadActivities()
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.isLoggedIn && !oldProps.isLoggedIn) {
      this.props.loadActivities()
    }
  }

  _loadMore() {
    this.props.loadMoreActivites(this.props.activities.length)
  }

  getImageByCode(code) {
    let image = StatusHorse
    if (code === '2') {
      image = StatusLove
    }
    return image
  }

  getActivityText(activity_data) {
    const { activity, hex_codes, horse_list, horse_ids } = activity_data
    const error_text = activity.split(new RegExp(horse_list.join('|'), 'i'))
    if (horse_list.length > 1) {
      const horse_id1 = horse_ids[horse_list[0]]
      const hex_code1 = hex_codes[horse_list[0]]
      const brightness1 = getBrightness(hex_code1)
      const horse1 = (
        <React.Fragment>
          <ColoredHorse color={hex_code1} />
          <span style={{ color: `#${hex_code1}` }}>{horse_list[0]}</span>
        </React.Fragment>
      )
      const horse_id2 = horse_ids[horse_list[1]]
      const hex_code2 = hex_codes[horse_list[1]]
      const brightness2 = getBrightness(hex_code2)
      const horse2 = (
        <React.Fragment>
          <ColoredHorse color={hex_code2} />
          <span style={{ color: `#${hex_code2}` }}>{horse_list[1]}</span>
        </React.Fragment>
      )
      return (
        <div className="normal-text">
          {error_text[0]}
          {horse_id1 ? (
            <a
              href={`/racehorse/${horse_id1}`}
              className={`horse-info ${brightness1 < 100 ? 'bright' : ''}`}
            >
              {horse1}
            </a>
          ) : (
            <div className={`horse-info disable ${brightness1 < 100 ? 'bright' : ''}`}>
              {horse1}
            </div>
          )}
          {error_text[1]}
          {horse_id2 ? (
            <a
              href={`/racehorse/${horse_id2}`}
              className={`horse-info ${brightness2 < 100 ? 'bright' : ''}`}
            >
              {horse2}
            </a>
          ) : (
            <div className={`horse-info disable ${brightness2 < 100 ? 'bright' : ''}`}>
              {horse2}
            </div>
          )}
          {error_text[2]}
        </div>
      )
    } else {
      const brightness = getBrightness(hex_codes)
      const horse = (
        <React.Fragment>
          <ColoredHorse color={hex_codes} />
          <span style={{ color: `#${hex_codes}` }}>{horse_list[0]}</span>
        </React.Fragment>
      )
      return (
        <div className="normal-text">
          {error_text[0]}
          {horse_ids ? (
            <a
              href={`/racehorse/${horse_ids}`}
              className={`horse-info ${brightness < 100 ? 'bright' : ''}`}
            >
              {horse}
            </a>
          ) : (
            <div className={`horse-info disable ${brightness < 100 ? 'bright' : ''}`}>{horse}</div>
          )}
          {error_text[1]}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="page-content activity">
        <main>
          <section className="top-section">
            <div className="green-text text-uppercase">
              <Translate id="status_update" />
            </div>
            <h2 className="lg-text text-capitalize">
              <Translate id="activities" />
            </h2>
            <div className="normal-text">
              <Translate id="activity_page.main_text" />
            </div>
          </section>

          <section className="main-section">
            <img className="glow-bg" src={GlowImg} />
            <div className="activity">
              <div className="activity-content">
                {this.props.isLoading ? (
                  <LoadingIndicator busy={true} />
                ) : this.props.activities.length !== 0 ? (
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this._loadMore}
                    hasMore={this.props.hasMore}
                    loader={<LoadingIndicator busy={true} relative key={0} />}
                    initialLoad={false}
                    useWindow={true}
                  >
                    {this.props.activities.map((activity, index) => {
                      return (
                        <div className="activity-row" key={index}>
                          <div className="activity-info">
                            <img className="icon-status" src={this.getImageByCode(activity.code)} />
                            <div className="normal-text">{this.getActivityText(activity)}</div>
                          </div>
                          <div className="activity-date">
                            <div className="normal-text date-time">
                              {moment(activity.timestamp + 'Z').format('MMM D, YYYY - HH:mm')}
                            </div>
                            <a
                              className="normal-text view-details"
                              href={activity.tx_link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Translate id="view_details" />
                            </a>
                          </div>
                        </div>
                      )
                    })}
                  </InfiniteScroll>
                ) : (
                  <EmptyContent type={'activity'} />
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activity.items,
    isLoading: state.activity.isLoading,
    isLoadingMore: state.activity.isLoadingMore,
    hasMore: state.activity.hasMore,
    isLoggedIn: state.auth.completed,
    currentBatch: state.market.currentBatch,
    releaseNumber: state.market.releaseNumber,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadActivities: offset => dispatch(actions.activity.loadItems(offset)),
    loadMoreActivites: offset => dispatch(actions.activity.loadMoreItems(offset)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(ActivityPageContent)),
  mapStateToProps,
  mapDispatchToProps,
)
