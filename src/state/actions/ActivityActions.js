import { getActivities, createActivity } from '../../services/ActivityService'

export default {
  ['activity/loadItems']: () => getActivities(),
  ['activity/loadMoreItems']: offset => getActivities(offset),
  ['activity/createItem']: data => createActivity(data),
}
