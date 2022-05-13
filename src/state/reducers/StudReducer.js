import { handleActions } from 'redux-actions'
import actions from 'state/actions'

const initialState = {
  items: [],
  females: [],
  currentItem: null,
  isLoading: false,
  isLoadingBreeding: false,
  isLoadingMore: false,
  hasMoreItems: false,
  queryPrice: 0,
}

export const StudReducer = handleActions(
  {
    [actions.stud.loadCurrentItem]: (state, { payload, isLoading, error }) => {
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
        currentItem: payload,
      }
    },
    [actions.stud.loadItems]: (state, { payload, isLoading, error }) => {
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
    [actions.stud.loadMoreItems]: (state, { payload, isLoading: isLoadingMore, error }) => {
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
    [actions.stud.getQueryPrice]: (state, { payload, isLoading, error }) => {
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
        queryPrice: payload,
      }
    },
    [actions.stud.breedHorse]: (state, { isLoading, error }) => {
      return {
        ...state,
        error,
        isLoadingBreeding: isLoading,
      }
    },
    [actions.stud.getFemalesByOwner]: (state, { isLoading, error, payload }) => {
      if (isLoading || error) {
        return {
          ...state,
          error,
        }
      }
      return {
        ...state,
        error,
        females: payload,
      }
    },
  },
  initialState,
)
