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

class RosterPageContent extends React.Component {
  static propTypes = {
    purchases: PropTypes.array,
    isLoading: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    loadPurchases: PropTypes.func,
    loadMorePurchases: PropTypes.func,
    hasMoreItems: PropTypes.bool,
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this._loadMorePurchases = this._loadMorePurchases.bind(this)
    this.props.addTranslation({ roster_page: i18n })
  }

  componentDidMount() {
    this.props.loadPurchases()
  }

  get lastHorse() {
    return this.props.purchases[this.props.purchases.length - 1]
  }

  _loadMorePurchases() {
    this.props.loadMorePurchases(this.lastHorse.horse_id)
  }

  render() {
    return (
      <div className="page-content roster mobile">
        <main>
          <section className="top-section">
            <div className="primary-text text-uppercase">
              <Translate id="race_roster" />
            </div>
            <h2 className="md-text text-capitalize">
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
              <div className="roster-content mobile">
                <div className="accordion-label">
                  <div className="grey-text text-uppercase">
                    <Translate id="thoroughbred" />
                  </div>
                  <div className="grey-text date text-uppercase">
                    <Translate id="date" />
                  </div>
                </div>
                <div className="accordion-content">
                  <div className="accordion" role="tablist">
                    {this.props.isLoading && !this.props.purchases.length ? (
                      <div style={{ minHeight: '300px', position: 'relative' }}>
                        <LoadingIndicator busy={this.props.isLoading} />
                      </div>
                    ) : (
                      <Accordion
                        loadMore={this._loadMorePurchases}
                        hasMore={this.props.hasMoreItems}
                        panels={this.props.purchases}
                        activeTab={-1}
                      />
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPurchases: address => dispatch(actions.roster.loadPurchases(address)),
    loadMorePurchases: offset => dispatch(actions.roster.loadMorePurchases(offset)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(RosterPageContent)),
  mapStateToProps,
  mapDispatchToProps,
)
