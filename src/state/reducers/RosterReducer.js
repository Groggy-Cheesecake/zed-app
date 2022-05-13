import { handleActions } from 'redux-actions'
import actions from 'state/actions'

const initialState = {
  items: [],
  isLoading: false,
  isLoadingMore: false,
  hasMoreItems: false,
}

export const RosterReducer = handleActions(
  {
    [actions.roster.loadPurchases]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          isLoading,
          error,
        }
      }

      return {
        ...state,
        isLoading,
        error,
        items: payload,
        hasMoreItems: payload.length >= 10,
      }
    },
    [actions.roster.loadMorePurchases]: (state, { payload, isLoading: isLoadingMore, error }) => {
      if (isLoadingMore || error) {
        return {
          ...state,
          isLoadingMore,
          error,
        }
      }
      return {
        ...state,
        isLoadingMore,
        error,
        items: state.items.concat(payload),
        hasMoreItems: payload.length >= 10,
      }
    },
  },
  initialState,
)
