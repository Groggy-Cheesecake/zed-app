import { SocketSingleton } from '../../services/SocketService'
import { getNextHorse } from '../../services/HorsesService'
import {
  getCurrentBatch,
  estimateBuyTransactionFee,
  getHorsesRemaining,
  buyHorse,
} from '../../services/ContractsService'

export default {
  ['market/CONNECT_SOCKET']: ({ signed_message }, nextHorseCallback, releaseDataCallback) => {
    return SocketSingleton.getInstance().connect(
      { signed_message },
      nextHorseCallback,
      releaseDataCallback,
    )
  },
  ['market/RECONNECT_SOCKET']: ({ signed_message }, nextHorseCallback, releaseDataCallback) => {
    return SocketSingleton.getInstance().reconnect(
      { signed_message },
      nextHorseCallback,
      releaseDataCallback,
    )
  },
  ['market/GET_NEXT']: () => getNextHorse(),
  ['market/GET_CURRENT_BATCH']: () => getCurrentBatch(),
  ['market/ESTIMATE_FEE']: (address, price) => estimateBuyTransactionFee(address, price),
  ['market/GET_REMAINING']: gen => getHorsesRemaining(gen),
  ['market/BUY_HORSE']: (horse, address, price) => buyHorse(horse, address, price),
}
