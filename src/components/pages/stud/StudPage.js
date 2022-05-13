import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'

// Components
import Accordion from 'components/common/Accordion/stud/Accordion'
import LoadingIndicator from 'components/shared/LoadingIndicator'
// import SearchFiltersBar from '../../common/SearchFiltersBar/SearchFiltersBar.js';

// Actions
import actions from 'state/actions'

// Images
import GlowImg from '../../../assets/images/bkg-oval-top-bottom.svg'
import SearchFilterBar from '../../common/SearchFiltersBar'
import IconGrid from '../../../assets/images/icn-view-card-24.svg'
import IconList from '../../../assets/images/icn-view-list-24.svg'
import EmptyContent from '../../common/EmptyContent'
import { Link } from 'react-router-dom'
// import IconTime from '../../../assets/images/icn-time-24.svg';
// import IconTrophy from '../../../assets/images/icn-trophy-24.svg';

class StudPageContent extends React.Component {
  static propTypes = {
    horses: PropTypes.array,
    isLoading: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    loadHorses: PropTypes.func,
    loadMoreHorses: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object,
    addTranslation: PropTypes.func,
    hasMoreItems: PropTypes.bool,
    trip_switch_search: PropTypes.bool,
    filters_fn: PropTypes.shape({
      gen: PropTypes.arrayOf(PropTypes.number),
      breed_type: PropTypes.arrayOf(PropTypes.string),
      bloodline: PropTypes.arrayOf(PropTypes.string),
      horse_type: PropTypes.arrayOf(PropTypes.string),
      horse_name: PropTypes.string,
      sort_by: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props)

    this._loadMoreHorses = this._loadMoreHorses.bind(this)

    this.state = {
      trip_switch_search: false,
    }
  }

  componentDidMount() {
    this.props.loadHorses()
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    if (JSON.stringify(oldProps.filters_fn) !== JSON.stringify(this.props.filters_fn)) {
      this.setState({ trip_switch_search: true })
      this.props.loadHorses(this.props.filters_fn)
    }
  }

  _loadMoreHorses() {
    this.props.loadMoreHorses(this.props.horses.length, this.props.filters_fn)
  }

  render() {
    // const path = this.props.location.pathname;

    return (
      <div className="page-content stud">
        {/*<div className="tab-watch">
          <div className="tab-content">
            <div className="tab-list">
              <div
                className={`tab-item disabled ${path === '/marketplace' ? 'active' : ''}`}
                onClick={() => this.props.history.push('/marketplace')}
              >
                <div className="item-content">
                  <img className="icon" src={IconTime}/>
                  <div className="primary-text text-capitalize"><Translate id='menu_items.marketplace'/></div>
                </div>
              </div>
              <div
                className={`tab-item ${path === '/stud' ? 'active' : ''}`}
                onClick={() => this.props.history.push('/stud')}
              >
                <div className="item-content">
                  <img className="icon" src={IconTrophy}/>
                  <div className="primary-text text-capitalize"><Translate id="stud"/></div>
                </div>
              </div>
            </div>
            <div className="watch-status">
              <div className="watch-icon-wrapper">
                <div className="play-icon"/>
              </div>
              <span className="primary-text secondary text-capitalize"><Translate id="watch"/></span>&nbsp;
              <span className="primary-text secondary text-uppercase"><Translate id="live"/></span>
            </div>
          </div>
        </div>*/}

        <main>
          <section className="top-section">
            <div className="green-text text-uppercase" style={{ fontSize: '20px' }}>
              Stud Marketplace
            </div>
            <div className="normal-text" style={{ fontSize: '18px' }}>
              View all horses that are in stud, ready to breed.
            </div>
          </section>
          <section className="main-section">
            <img className="glow-bg" src={GlowImg} />
            <div className="stud">
              <div className="stud-content">
                <div className="row">
                  <div className="column_one_main">
                    {/*
                      {this.props.ownedHorses.length !== 0 ? (
                        <EmptyStableSidebar />
                      ) : null}
                      <div className="accordion-content">
                        <div className="accordion" role="tablist">
                          {!this.props.isLoading && this.props.ownedHorses.length === 0 ? (
                            <EmptyStableSidebar />
                          ) : null }
                        </div>
                      </div>
                    */}
                  </div>
                  <div className="column_two_main">
                    {this.props.horses.length !== 0 || this.state.trip_switch_search ? (
                      <div>
                        <div className="row">
                          <div className="column_one_stall_name">
                            <h1>Stud Marketplace</h1>
                          </div>
                          <div className="column_two_row_view">
                            {/*
                            <div className="overline-text sm text-uppercase">
                              <Translate id="view" />:
                              <div className="icons">
                                <a
                                  className="icon-part"
                                  style={{ opacity: !this.state.view_grid ? 1 : null }}
                                  onClick={() => this.setState({ view_grid: false })}
                                >
                                  <img className="icon" src={IconGrid} />
                                </a>
                                <a
                                  className="icon-part"
                                  style={{ opacity: this.state.view_grid ? 1 : null }}
                                  onClick={() => this.setState({ view_grid: true })}
                                >
                                  <img className="icon" src={IconList} />
                                </a>
                              </div>
                            </div>
                                */}
                          </div>
                        </div>
                        <div className="filter">
                          <SearchFilterBar filter_type={'stud'} />
                        </div>
                        <br />
                        <div className="accordion-label">
                          <div className="grey-text text-uppercase">
                            <Translate id="stallion" />
                          </div>
                          <div className="right">
                            <div className="grey-text text-uppercase stable">
                              <Translate id="owner_stable" />
                            </div>
                            <div className="grey-text key text-uppercase">
                              <Translate id="time_left" />
                            </div>
                            <div className="grey-text date text-uppercase">
                              <Translate id="stud_fee" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="accordion-content">
                      <div className="accordion" role="tablist">
                        {this.props.isLoading ? (
                          <div style={{ minHeight: '300px', position: 'relative' }}>
                            <LoadingIndicator busy={this.props.isLoading} />
                          </div>
                        ) : this.props.horses.length !== 0 ? (
                          <div
                            style={{ minHeight: this.state.trip_switch_search ? '300px' : null }}
                          >
                            <Accordion
                              loadMore={this._loadMoreHorses}
                              hasMore={this.props.hasMoreItems && !this.props.isLoadingMore}
                              panels={this.props.horses}
                              activeTab={-1}
                            />
                            <br />
                          </div>
                        ) : (
                          <div style={{ paddingTop: '120px' }}>
                            <EmptyContent
                              type={this.state.trip_switch_search ? 'no_results' : 'stud'}
                            />
                          </div>
                        )}

                        {this.props.isLoadingMore && (
                          <div style={{ marginTop: '50px', position: 'relative' }}>
                            <LoadingIndicator busy={this.props.isLoadingMore} relative />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
    horses: state.stud.items,
    isLoading: state.stud.isLoading,
    isLoadingMore: state.stud.isLoadingMore,
    hasMoreItems: state.stud.hasMoreItems,
    filters_fn: {
      gen: state.filters.filters.gen,
      breed_type: state.filters.filters.breed_type,
      bloodline: state.filters.filters.bloodline,
      horse_type: state.filters.filters.horse_type,
      horse_name: state.filters.filters.horse_name,
      sort_by: state.filters.filters.sort_by,
    },
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadHorses: filter_fn => dispatch(actions.stud.loadItems(filter_fn)),
    loadMoreHorses: (offset, filter_fn) => dispatch(actions.stud.loadMoreItems(offset, filter_fn)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(StudPageContent)),
  mapStateToProps,
  mapDispatchToProps,
)
