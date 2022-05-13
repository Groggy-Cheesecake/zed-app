import { handleActions, combineActions } from 'redux-actions'
import { PRICES_BY_BATCH } from '@/const/HorsesData'
import actions from 'state/actions'

const initialState = {
  nextHorse: null,
  nextHorsePrice: PRICES_BY_BATCH[0],
  currentBatch: 1,
  currentBloodline: null,
  horsesRemaining: 0,
  releaseNumber: 0,
  socketBreedingChannel: null,
  socketLobbyChannel: null,
  error: null,
  isLoading: {
    nextHorse: false,
    buyHorse: false,
  },
}

export const MarketReducer = handleActions(
  {
    [combineActions('horses/SET_NEXT', actions.market.getNext)]: (
      state,
      { payload, isLoading, error },
    ) => {
      if (isLoading || error) {
        return {
          ...state,
          isLoading: {
            ...state.isLoading,
            nextHorse: isLoading,
          },
        }
      }
      let releaseData = {}
      if (payload.release_data) {
        releaseData = {
          currentBatch: payload.release_data.batch_number,
          currentBloodline: payload.release_data.bloodline,
          releaseNumber: payload.release_data.release_number,
          nextHorsePrice: PRICES_BY_BATCH[payload.release_data.batch_number - 1],
        }
      }
      return {
        ...state,
        nextHorse: {
          ...payload.next_horse,
          img_url: `https://cdn.zed.run/images/${payload.next_horse.hex_code}.svg`,
        },
        ...releaseData,
      }
    },
    ['horses/SET_RELEASE_DATA']: (state, { payload }) => {
      if (payload && payload.release_data) {
        return {
          ...state,
          currentBatch: payload.release_data.batch_number,
          currentBloodline: payload.release_data.bloodline,
          releaseNumber: payload.release_data.release_number,
          nextHorsePrice: PRICES_BY_BATCH[payload.release_data.batch_number - 1],
        }
      }
      return state
    },
    [actions.market.connectSocket]: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          socketBreedingChannel: payload.breedingChannel,
          socketLobbyChannel: payload.lobbyChannel,
        }
      }
      return state
    },
    [actions.market.getCurrentBatch]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return { ...state, error }
      }
      return {
        ...state,
        currentBatch: payload,
        nextHorsePrice: PRICES_BY_BATCH[payload - 1],
      }
    },
    [actions.market.getRemaining]: (state, { payload, isLoading, error }) => {
      if (isLoading || error) {
        return { ...state, error }
      }
      return {
        ...state,
        horsesRemaining: payload,
      }
    },
    [actions.market.buyHorse]: (state, { isLoading, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          error,
          isLoading: {
            ...state.isLoading,
            buyHorse: isLoading,
          },
        }
      }
      return {
        ...state,
        error,
        isLoading: {
          ...state.isLoading,
          buyHorse: isLoading,
        },
      }
    },
  },
  initialState,
)
