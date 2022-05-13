import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/RosterPage'

import LoadingIndicator from 'components/shared/LoadingIndicator'
import Accordion from 'components/common/Accordion/roster/Accordion'

import actions from 'state/actions'
import GlowImg from '../../../assets/images/bkg-oval-top-bottom.svg'
import EmptyContent from '../../common/EmptyContent'
import SearchFilterBar from '../../common/SearchFiltersBar'

class RosterPageContent extends React.Component {
  static propTypes = {
    purchases: PropTypes.array,
    isLoading: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    loadPurchases: PropTypes.func,
    loadMorePurchases: PropTypes.func,
    hasMoreItems: PropTypes.bool,
    addTranslation: PropTypes.func,
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

    this.state = {
      trip_switch_search: false,
    }

    this._loadMorePurchases = this._loadMorePurchases.bind(this)

    this.props.addTranslation({ roster_page: i18n })
  }

  componentDidMount() {
    this.props.loadPurchases(this.props.filters_fn)
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    if (JSON.stringify(oldProps.filters_fn) !== JSON.stringify(this.props.filters_fn)) {
      this.setState({ trip_switch_search: true })
      console.log(this.props.filters_fn)
      this.props.loadPurchases(this.props.filters_fn)
    }
  }

  _loadMorePurchases() {
    this.props.loadMorePurchases(this.props.purchases.length, this.props.filters_fn)
  }

  render() {
    return (
      <div className="page-content roster">
        <main>
          <section className="top-section">
            <div className="green-text text-uppercase">
              <Translate id="race_roster" />
            </div>
            <h2 className="lg-text text-capitalize">
              <Translate id="racing_soon" />
            </h2>
            <div className="normal-text">
              <Translate id="roster_page.main_text" />
            </div>
            <Link to="/buy">
              <button className="primary-btn text-uppercase">
                <Translate id="buy_a_racehorse" />
              </button>
            </Link>
          </section>

          <section className="main-section">
            <img className="glow-bg" src={GlowImg} />
            <div className="roster">
              <div className="roster-content">
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
                    {this.props.purchases.length !== 0 || this.state.trip_switch_search ? (
                      <div>
                        <div className="row">
                          <div className="column_one_stall_name">
                            <h1>Race Roster</h1>
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
                          <SearchFilterBar filter_type={'stable'} />
                        </div>
                        <br />
                        <div className="accordion-label">
                          <div className="grey-text text-uppercase">
                            <Translate id="thoroughbred" />
                          </div>
                          <div className="right">
                            <div className="grey-text stable text-uppercase">
                              <Translate id="owner_stable" />
                            </div>
                            <div className="grey-text key text-uppercase">
                              <Translate id="transaction" />
                            </div>
                            <div className="grey-text date text-uppercase">
                              <Translate id="date" />
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
                        ) : this.props.purchases.length !== 0 ? (
                          <Accordion
                            loadMore={this._loadMorePurchases}
                            hasMore={this.props.hasMoreItems && !this.props.isLoadingMore}
                            panels={this.props.purchases}
                            activeTab={-1}
                          />
                        ) : (
                          <div style={{ paddingTop: '120px' }}>
                            <EmptyContent
                              type={this.state.trip_switch_search ? 'no_results' : 'activity'}
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
    purchases: state.roster.items,
    hasMoreItems: state.roster.hasMoreItems,
    isLoading: state.roster.isLoading,
    isLoadingMore: state.roster.isLoadingMore,
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
    loadPurchases: filter_fn => dispatch(actions.roster.loadPurchases(filter_fn)),
    loadMorePurchases: (offset, filter_fn) =>
      dispatch(actions.roster.loadMorePurchases(offset, filter_fn)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(RosterPageContent)),
  mapStateToProps,
  mapDispatchToProps,
)
