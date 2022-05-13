import {
  getUserHorses,
  getHorseById,
  nameOffspring,
  getFemaleHorses,
} from '../../services/HorsesService'
import { createAuction } from '../../services/ContractsService'

export default {
  ['stable/LOAD_HORSES']: (address, offset, filter_fn) => getUserHorses(address, offset, filter_fn),
  ['stable/LOAD_FEMALE_HORSES']: address => getFemaleHorses(address),
  ['stable/LOAD_MORE_HORSES']: (address, offset, filter_fn) =>
    getUserHorses(address, offset, filter_fn),
  ['stable/LOAD_HORSE_BY_ID']: id => getHorseById(id, {}),
  ['stable/CREATE_AUCTION']: (duration, horseId, minimum) =>
    createAuction(duration, horseId, minimum),
  ['stable/NAME_OFFSPRING']: data => nameOffspring(data),
}
