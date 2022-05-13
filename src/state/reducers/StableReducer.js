import { handleActions } from 'redux-actions'
import actions from 'state/actions'

const initialState = {
  horses: [],
  femaleHorses: [],
  isLoading: true,
  isLoadingMore: false,
  hasMoreHorses: false,
}

export const StableReducer = handleActions(
  {
    [actions.stable.loadHorses]: (state, { payload, isLoading, error }) => {
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
        horses: payload,
        hasMoreHorses: payload.length >= 10,
      }
    },
    [actions.stable.loadMoreHorses]: (state, { payload, isLoading: isLoadingMore, error }) => {
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
        horses: state.horses.concat(payload),
        hasMoreHorses: payload.length >= 10,
      }
    },
    [actions.stable.loadFemaleHorses]: (state, { payload, isLoading, error }) => {
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
        femaleHorses: payload,
      }
    },
    [actions.stable.nameOffspring]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          error,
        }
      }
      return {
        ...state,
        error,
        horses: state.horses.map(horse => {
          if (horse.horse_id === payload.horse_id) {
            horse.name = payload.name
          }
          return horse
        }),
      }
    },
    [actions.stable.applyFilters]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          error,
        }
      }
      return {
        ...state,
        error,
        horses: state.horses.map(horse => {
          if (horse.horse_id === payload.horse_id) {
            horse.name = payload.name
          }
          return horse
        }),
      }
    },
  },
  initialState,
)
