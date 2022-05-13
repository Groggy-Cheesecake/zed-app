import { handleActions } from 'redux-actions'
import actions from 'state/actions'
import { getMetamaskError } from '../../utils'

const initialState = {
  auctions: [],
  bids: [],
  isLoading: false,
  error: null,
}

export const AuctionReducer = handleActions(
  {
    [actions.auction.createAuction]: (state, { isLoading, error }) => {
      return {
        ...state,
        isLoading,
        error: error ? getMetamaskError(error.message) : null,
      }
    },
    [actions.auction.foundationAuctionBid]: (state, { isLoading, error }) => {
      return {
        ...state,
        isLoading,
        error: error ? getMetamaskError(error.message) : null,
      }
    },
    [actions.auction.getOpenAuctions]: (state, { payload, isLoading, error }) => {
      return {
        ...state,
        auctions: payload ? payload : [],
        isLoading,
        error: error ? getMetamaskError(error.message) : null,
      }
    },
    [actions.auction.getAuctionBids]: (state, { payload, isLoading, error }) => {
      return {
        ...state,
        bids: payload ? payload : [],
        isLoading,
        error: error ? getMetamaskError(error.message) : null,
      }
    },
    [actions.auction.userAuctionBid]: (state, { isLoading, error }) => {
      return {
        ...state,
        isLoading,
        error: error ? getMetamaskError(error.message) : null,
      }
    },
    [actions.auction.userAuctionWithdraw]: (state, { isLoading, error }) => {
      return {
        ...state,
        isLoading,
        error: error ? getMetamaskError(error.message) : null,
      }
    },
  },
  initialState,
)
