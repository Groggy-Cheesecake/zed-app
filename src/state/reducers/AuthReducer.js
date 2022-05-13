import { handleActions } from 'redux-actions'
import client from '../../services/clients/ApiClient'
import web3 from '../../services/clients/Web3Client'
import actions from 'state/actions'

let signed_messages = {}
let jwts = {}

try {
  signed_messages = JSON.parse(window.localStorage.getItem('signed_message')) || {}
  jwts = JSON.parse(window.localStorage.getItem('jwt')) || {}
} catch (e) {
  window.localStorage.removeItem('signed_message')
  window.localStorage.removeItem('jwt')
}

// INITIALIZE STATE

const initialState = {
  email: window.localStorage.getItem('email'),
  subscribe: false,
  stable_name: window.localStorage.getItem('stable_name'),
  address: null,
  message: null,
  jwt: null,
  isLoading: false,
  completed: false,
  error: {
    signin: null,
    signup: null,
    access: null,
  },
}

// REDUCER

export const AuthReducer = handleActions(
  {
    ACCOUNTS_FETCHED: (state, { accounts }) => {
      const address = web3.utils.toChecksumAddress(accounts[0])

      if (!address && state.address) {
        // Logged out
        return {
          ...state,
          address: null,
        }
      }

      client.setToken(jwts[address])

      if (!state.address && address) {
        // Logged in
        return {
          ...state,
          address: address,
          message: signed_messages[address],
          jwt: jwts[address],
          isLoading: !!signed_messages[address],
        }
      }

      if (state.address !== address) {
        // Changed account
        return {
          ...state,
          address: address,
          email: null,
          stable_name: null,
          message: signed_messages[address],
          jwt: jwts[address],
          isLoading: !!signed_messages[address],
          completed: false,
          error: {
            signin: null,
            signup: null,
            access: null,
            update: null,
          },
        }
      }

      return state
    },
    ['auth/SET_STABLE_NAME']: (state, { payload }) => {
      window.localStorage.setItem('stable_name', payload)
      return {
        ...state,
        stable_name: payload,
      }
    },
    ['auth/SET_EMAIL']: (state, { payload }) => {
      window.localStorage.setItem('email', payload.email)
      return {
        ...state,
        email: payload.email,
        subscribe: payload.subscribe,
      }
    },
    ['auth/SET_MESSAGE']: (state, { payload }) => {
      return {
        ...state,
        message: payload,
      }
    },
    [actions.auth.signin]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          isLoading,
          error: {
            ...state.error,
            signin: error,
          },
        }
      }

      signed_messages[state.address] = state.message
      jwts[state.address] = payload.jwt
      client.setToken(payload.jwt)

      window.localStorage.setItem('signed_message', JSON.stringify(signed_messages))
      window.localStorage.setItem('jwt', JSON.stringify(jwts))

      return {
        ...state,
        error: {
          ...state.error,
          signin: error,
        },
        isLoading,
        ...payload.user,
        jwt: payload.jwt,
        completed: true,
      }
    },
    [actions.auth.signup]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          isLoading,
          error: {
            ...state.error,
            signup: error,
          },
        }
      }

      signed_messages[state.address] = state.message
      jwts[state.address] = payload.jwt
      client.setToken(payload.jwt)

      window.localStorage.setItem('signed_message', JSON.stringify(signed_messages))
      window.localStorage.setItem('jwt', JSON.stringify(jwts))
      window.localStorage.removeItem('email')
      window.localStorage.removeItem('stable_name')

      return {
        ...state,
        error: {
          ...state.error,
          signup: error,
        },
        isLoading,
        ...payload.user,
        jwt: payload.jwt,
        completed: true,
      }
    },
    [actions.user.update]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          error: {
            ...state.error,
            update: error,
          },
        }
      }
      return {
        ...state,
        error: {
          ...state.error,
          update: error,
        },
        ...payload.user,
      }
    },
    ['auth/SIGN_OUT']: state => {
      return {
        ...state,
        jwt: null,
        message: null,
        isLoading: false,
        completed: false,
      }
    },
  },
  initialState,
)
