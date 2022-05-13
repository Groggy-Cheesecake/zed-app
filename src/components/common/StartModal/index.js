import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { CURRENT_NETWORK } from '@/const/GlobalData'

import actions from '../../../state/actions'
import LoadingIndicator from '../../shared/LoadingIndicator'

import WelcomeContent from './WelcomeContent'
import CreateStableContent from './CreateStableContent'
import MetamaskContent from './MetamaskContent'
import SuccessContent from './SuccessContent'

const STEPS = [MetamaskContent, WelcomeContent, CreateStableContent]

class StartModalContent extends React.Component {
  static propTypes = {
    isWeb3Connected: PropTypes.bool,
    email: PropTypes.string,
    subscribe: PropTypes.bool,
    message: PropTypes.string,
    stable_name: PropTypes.string,
    address: PropTypes.string,
    completed: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    signup: PropTypes.func,
    history: PropTypes.object,
    closeModal: PropTypes.func,
    networkId: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      step: 0,
    }

    this._prevStep = this._prevStep.bind(this)
    this._nextStep = this._nextStep.bind(this)
  }

  componentDidMount() {
    const { history, isWeb3Connected, networkId } = this.props

    if (isWeb3Connected && networkId && networkId !== CURRENT_NETWORK.id) {
      history.push('/network')
    }
  }

  _prevStep() {
    this.setState(
      {
        step: this.state.step - 1,
      },
      () => {
        if (this.state.step < 0) {
          this.props.history.push('/home')
        }
      },
    )
  }

  _nextStep() {
    this.setState(
      {
        step: this.state.step + 1,
      },
      () => {
        if (this.state.step >= STEPS.length) {
          this.props
            .signup({
              user: {
                email: this.props.email,
                opted_newsletter: this.props.subscribe,
                signed_message: this.props.message,
                public_address: this.props.address,
                stable_name: this.props.stable_name,
              },
            })
            .then(({ error }) => {
              if (!error) {
                this.props.history.push('/stable')
              } else {
                this.setState({
                  step: this.state.step - 1,
                })
              }
            })
        }
      },
    )
  }

  render() {
    const Step = STEPS[this.state.step]

    let content
    if (this.props.completed) {
      content = <SuccessContent close={this.props.closeModal} nextStep={this._nextStep} />
    } else if (Step) {
      content = <Step close={this.props.closeModal} nextStep={this._nextStep} />
    }

    return (
      <div style={{ height: '100%' }}>
        {content}
        <LoadingIndicator busy={this.props.isLoading} fixed />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isWeb3Connected: state.other.isWeb3Connected,
    email: state.auth.email,
    subscribe: state.auth.subscribe,
    address: state.auth.address,
    message: state.auth.message,
    stable_name: state.auth.stable_name,
    isLoading: state.auth.isLoading,
    completed: state.auth.completed,
    networkId: state.other.networkId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: data => {
      return dispatch(actions.auth.signup(data))
    },
  }
}

export default drizzleConnect(withRouter(StartModalContent), mapStateToProps, mapDispatchToProps)
