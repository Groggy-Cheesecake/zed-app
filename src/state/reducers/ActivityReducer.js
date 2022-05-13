import { handleActions } from 'redux-actions'
import actions from 'state/actions'

const initialState = {
  items: [],
  isLoading: false,
  isLoadingMore: false,
  hasMore: false,
}

export const ActivityReducer = handleActions(
  {
    [actions.activity.loadItems]: (state, { payload, isLoading, error }) => {
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
        hasMore: payload.length === 10,
      }
    },
    [actions.activity.loadMoreItems]: (state, { payload, isLoading: isLoadingMore, error }) => {
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
        hasMore: payload.length === 10,
      }
    },
  },
  initialState,
)
