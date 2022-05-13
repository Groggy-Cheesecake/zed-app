import { handleActions } from 'redux-actions'
import actions from 'state/actions'

const initialState = {
  filters: [],
  searchText: '',
  isLoading: false,
  error: null,
}

export const FilterReducer = handleActions(
  {
    [actions.filters.applyFilters]: (state, { payload, isLoading, error }) => {
      return {
        ...state,
        filters: payload,
        isLoading,
        error,
      }
    },
  },
  initialState,
)
