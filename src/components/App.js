import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { renderToStaticMarkup } from 'react-dom/server'
import { withRouter } from 'react-router'
import { withLocalize } from 'react-localize-redux'
import ismobile from 'is-mobile'

// Actions
import actions from 'state/actions'

// Constants
import i18n from '@/const/i18n/Global'
import { CURRENT_NETWORK } from '@/const/GlobalData'

// Utils
import { isDev } from '@/utils'

// Router
import Router from './router'
import Header from './Header'
import Footer from './Footer'

/*global analytics:true*/

class App extends React.Component {
  static propTypes = {
    isWeb3Connected: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    networkId: PropTypes.number,
    signin: PropTypes.func,
    signout: PropTypes.func,
    connectSocket: PropTypes.func,
    reconnectSocket: PropTypes.func,
    socketLobbyChannel: PropTypes.object,
    setNextHorse: PropTypes.func,
    public_address: PropTypes.string,
    signed_message: PropTypes.string,
    getNextHorse: PropTypes.func,
    getEtherPrice: PropTypes.func,
    getWeb3Status: PropTypes.func,
    initialize: PropTypes.func,
    isLoading: PropTypes.bool,
    location: PropTypes.object,
    setReleaseData: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func,
      location: PropTypes.object,
    }),
    isloading: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
    }

    this.props.initialize({
      languages: [
        {
          name: 'English',
          code: 'en',
        } /*, {
                name: '日本人',
                code: 'jp',
            }*/,
      ],
      translation: i18n,
      options: {
        renderToStaticMarkup,
        defaultLanguage: window.localStorage.getItem('lang') || 'en',
      },
    })

    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handleLinkClick = this.handleLinkClick.bind(this)
  }

  _auth(oldProps = {}) {
    const {
      history,
      isLoggedIn,
      networkId,
      public_address,
      signed_message,
      signin,
      signout,
    } = this.props

    if (!public_address && isLoggedIn) {
      signout()
      history.push('/home')
    } else if (!isLoggedIn) {
      if (signed_message && public_address) {
        signin({
          signed_message: this.props.signed_message,
          public_address: this.props.public_address,
        }).then((res, e) => {
          if (!e && !res.error) {
            try {
              if (networkId !== 1 || isDev()) {
                analytics.identify('test-' + res.payload.user.user_id, {
                  stable_name: res.payload.user.stable_name,
                  email: res.payload.user.email,
                })
              } else {
                analytics.identify(res.payload.user.user_id, {
                  stable_name: res.payload.user.stable_name,
                  email: res.payload.user.email,
                })
              }
            } catch (error) {
              console.log(error)
            }

            history.push(history.location.pathname.replace('start', ''))
          } else {
            history.push('/home/start')
          }
        })
      } else if (public_address !== oldProps.public_address && !!oldProps.public_address) {
        history.push('/home/start')
      }
    }
  }

  componentDidMount() {
    this.props.getNextHorse()

    this.props.getWeb3Status().then(({ payload: connected }) => {
      if (!connected) {
        return
      }

      this.props.getEtherPrice()
      this._auth()
    })
  }

  componentDidUpdate(oldProps) {
    if (this.props.location.pathname !== oldProps.location.pathname) {
      analytics.page(this.props.location.pathname)
    }

    if (
      this.props.isWeb3Connected &&
      this.props.networkId &&
      this.props.networkId !== CURRENT_NETWORK.id
    ) {
      this.props.signout()
      return
    }

    const justLoggedIn = !oldProps.isLoggedIn && this.props.isLoggedIn
    if (justLoggedIn) {
      if (!this.props.socketLobbyChannel) {
        this.props.connectSocket(
          {
            signed_message: this.props.signed_message,
          },
          this.props.setNextHorse,
          this.props.setReleaseData,
        )
      } else {
        this.props.reconnectSocket(
          {
            signed_message: this.props.signed_message,
          },
          this.props.setNextHorse,
          this.props.setReleaseData,
        )
      }
    }

    if (this.props.history.location.pathname.indexOf('start') === -1 || this.props.isLoading) {
      this._auth(oldProps)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.networkId !== this.props.networkId ||
      nextProps.isWeb3Connected !== this.props.isWeb3Connected ||
      nextProps.isLoggedIn !== this.props.isLoggedIn ||
      this.props.public_address !== nextProps.public_address ||
      this.props.location.pathname !== nextProps.location.pathname ||
      this.state.menuOpen !== nextState
    )
  }

  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleLinkClick() {
    this.setState({ menuOpen: false })
  }

  render() {
    const styles = {
      height: this.state.menuOpen ? '100vh' : 'auto',
    }

    return (
      <div className="app-content" style={styles}>
        {ismobile() ? (
          <Header
            menuOpen={this.state.menuOpen}
            handleMenuClick={this.handleMenuClick}
            handleLinkClick={this.handleLinkClick}
          />
        ) : (
          <Header />
        )}

        <Router />

        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isWeb3Connected: state.other.isWeb3Connected,
    isLoggedIn: state.auth.completed,
    isLoading: state.auth.isLoading,
    networkId: state.other.networkId,
    public_address: state.auth.address,
    signed_message: state.auth.message,
    socketLobbyChannel: state.market.socketLobbyChannel,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signin: data => {
      return dispatch(actions.auth.signin(data))
    },
    signout: () => {
      return dispatch({
        type: 'auth/SIGN_OUT',
      })
    },
    connectSocket: ({ signed_message }, nextHorseCallback, releaseDataCallback) => {
      return dispatch(
        actions.market.connectSocket({ signed_message }, nextHorseCallback, releaseDataCallback),
      )
    },
    reconnectSocket: ({ signed_message }, nextHorseCallback, releaseDataCallback) => {
      return dispatch(
        actions.market.reconnectSocket({ signed_message }, nextHorseCallback, releaseDataCallback),
      )
    },
    getNextHorse: () => {
      return dispatch(actions.market.getNext())
    },
    setReleaseData: data => {
      return dispatch({
        type: 'horses/SET_RELEASE_DATA',
        payload: data,
      })
    },
    setNextHorse: data => {
      return dispatch({
        type: 'horses/SET_NEXT',
        payload: data,
      })
    },
    getWeb3Status: () => dispatch(actions.getWeb3Status()),
    getEtherPrice: () => dispatch(actions.getEtherPrice()),
  }
}

export default withRouter(drizzleConnect(withLocalize(App), mapStateToProps, mapDispatchToProps))
