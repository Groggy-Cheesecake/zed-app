import { handleActions } from 'redux-actions'
import actions from 'state/actions'

const initialState = {
  etherPrice: null,
  networkId: null,
  coinbase: null,
  isWeb3Connected: false,
}

export const OtherReducer = handleActions(
  {
    [actions.getEtherPrice]: (state, { payload }) => {
      return {
        ...state,
        etherPrice: payload,
      }
    },
    NETWORK_ID_FETCHED: (state, { networkId }) => {
      return {
        ...state,
        networkId,
      }
    },
    [actions.getWeb3Status]: (state, { payload }) => {
      return {
        ...state,
        // `payload` is `networkId` in case of connecting with fallback web3 Infura provider
        isWeb3Connected: typeof payload === 'string' ? false : payload,
      }
    },
  },
  initialState,
)
