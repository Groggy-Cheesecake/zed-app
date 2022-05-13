import {
  breedHorse,
  putHorseInStud,
  getSingleStudHorseById,
  getMinimumBreedPrice,
} from '../../services/ContractsService'

import {
  getQueryPrice,
  getStudHorses,
  saveStudTransaction,
  getFemalesByOwner,
} from '../../services/HorsesService'

export default {
  ['stud/LOAD_CURRENT_ITEM']: id => getSingleStudHorseById(id),
  ['stud/LOAD_ITEMS']: filter => getStudHorses(0, filter),
  ['stud/LOAD_MORE_ITEMS']: (offset, filter) => getStudHorses(offset, filter),
  ['stud/LOAD_USER_FEMALE_HORSES']: address => getFemalesByOwner(address),
  ['stud/PUT_HORSE_IN_STUD']: (address, queryPrice, horseId, price, duration) =>
    putHorseInStud(address, queryPrice, horseId, price, duration),
  ['stud/GET_QUERY_PRICE']: () => getQueryPrice(),
  ['stud/SAVE_TRANSACTION']: data => saveStudTransaction(data),
  ['stud/BREED_HORSE']: (parents, address, price, hash) =>
    breedHorse(parents, address, price, hash),
  ['stud/GET_MIN_BREEDING_PRICE']: horseId => getMinimumBreedPrice(horseId),
}
