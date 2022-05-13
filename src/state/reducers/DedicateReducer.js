import { handleActions } from 'redux-actions'
import actions from 'state/actions'

const initialState = {
  currentHorse: null,
  isLoading: false,
  error: null,
}

export const DedicateReducer = handleActions(
  {
    [actions.stable.loadHorseById]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          isLoading,
          error,
        }
      }
      return {
        isLoading,
        error,
        currentHorse: payload,
      }
    },
  },
  initialState,
)
