import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Translate } from 'react-localize-redux'

class SuccessContent extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
  }

  _onSubmit(e) {
    e.preventDefault()
    this.props.history.push('/stable')
  }

  render() {
    return (
      <div className="start-modal-content">
        <form className="start-form" onSubmit={this._onSubmit}>
          <section>
            <div className="caption text-capitalize">
              <Translate id="all_done" />
            </div>
            <div className="m-text" />
            <div className="m-small-text" />
            {/*<div className="m-input-content">*/}
            {/*</div>*/}
            <button className="primary-btn md thin text-uppercase" type="submit">
              <Translate id="next" />
            </button>
          </section>
        </form>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setStable: stable => {
      return dispatch({
        type: 'auth/SET_STABLE_NAME',
        payload: stable,
      })
    },
  }
}

export default drizzleConnect(withRouter(SuccessContent), mapStateToProps, mapDispatchToProps)
