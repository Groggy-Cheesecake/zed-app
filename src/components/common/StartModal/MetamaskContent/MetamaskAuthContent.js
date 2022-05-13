import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import web3 from '@/services/clients/Web3Client'
import actions from '../../../../state/actions'

import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/StartModal'

class MetamaskAuthContent extends React.Component {
  static propTypes = {
    close: PropTypes.func,
    nextStep: PropTypes.func,
    setMessage: PropTypes.func,
    signin: PropTypes.func,
    public_address: PropTypes.string,
    history: PropTypes.object,
    error: PropTypes.string,
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ start_modal: i18n })
  }

  _signMessage(e) {
    e.preventDefault()
    const address = web3.utils.toChecksumAddress(this.props.public_address)

    web3.eth.personal.sign(web3.utils.fromUtf8('ZED.RUN'), address, (err, result) => {
      if (err) {
        console.error(err)
      } else {
        this.props.setMessage(result)
        this.props
          .signin({
            public_address: this.props.public_address,
            signed_message: result,
          })
          .then(({ error }) => {
            if (error) {
              throw error
            }
            this.props.history.push('/stable')
          })
          .catch(this.props.nextStep)
      }
    })
  }

  render() {
    return (
      <form className="start-form" onSubmit={this._signMessage.bind(this)}>
        <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.close} />
        <section>
          <div className="caption text-capitalize">
            <Translate id="metamask_req" />
          </div>
          <div className="m-text">
            <Translate id="almost_done" />
            <br />
            <Translate id="connect_zed" />
          </div>
          <div className="m-small-text">
            <Translate id="metamask_preferred" />
          </div>
          <button className="primary-btn md thin text-uppercase" type="submit">
            <Translate id="next" />
          </button>
        </section>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    public_address: state.accounts[0].toString(),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMessage: message => {
      return dispatch({
        type: 'auth/SET_MESSAGE',
        payload: message,
      })
    },
    signin: data => {
      return dispatch(actions.auth.signin(data))
    },
  }
}

export default drizzleConnect(
  withRouter(withLocalize(MetamaskAuthContent)),
  mapStateToProps,
  mapDispatchToProps,
)
