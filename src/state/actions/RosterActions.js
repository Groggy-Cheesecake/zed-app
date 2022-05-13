import { getRosterHorses } from '../../services/HorsesService'

export default {
  ['roster/loadPurchases']: filter_fn => getRosterHorses(0, filter_fn),
  ['roster/loadMorePurchases']: (offset, filter_fn) => getRosterHorses(offset, filter_fn),
}
