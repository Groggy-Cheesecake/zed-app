import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from 'react-localize-redux'

// Styles
import './emptycontent.scss'

class EmptyContent extends React.Component {
  static propTypes = {
    releaseNumber: PropTypes.number,
    currentBatch: PropTypes.number,
    type: PropTypes.string,
  }

  emptyContentMessage(type) {
    switch (type) {
      case 'stable':
        return <Translate id="empty.stable_empty" />
      case 'activity':
        return <Translate id="empty.no_activity" />
      case 'stud':
        return <Translate id="empty.stud_empty" />
      case 'no_results':
        return <Translate id="empty.no_results" />
      default:
        return <Translate id="empty.no_activity" />
    }
  }

  render() {
    return (
      <div className="empty">
        <div className="empty-content">
          {this.props.type !== 'no_results' ? <div className="mask-horse" /> : null}

          <h2 className="lg-text">{this.emptyContentMessage(this.props.type)}</h2>

          {this.props.type !== 'no_results' ? (
            <div>
              <div className="normal-text">
                <Translate id="empty.try_purchase" />
                &nbsp;
                <a className="text-uppercase" href="/faq">
                  <Translate id="faq" />
                </a>
                .
              </div>
              <Link to="/buy">
                <button className="primary-btn text-uppercase">
                  <Translate id="buy_a_racehorse" />
                </button>
              </Link>
              <div className="grey-text">
                <Translate id="empty.hurry_up" />
                &nbsp;
                <Translate
                  id="empty.already_sold"
                  data={{ count: this.props.releaseNumber, batch: this.props.currentBatch }}
                />
              </div>
            </div>
          ) : (
            <div className="normal-text">
              <Translate id="empty.no_results_sub" />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentBatch: state.market.currentBatch,
    releaseNumber: state.market.releaseNumber,
  }
}

export default drizzleConnect(withRouter(withLocalize(EmptyContent)), mapStateToProps, {})
