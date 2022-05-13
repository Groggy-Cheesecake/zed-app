import { createActions } from 'redux-actions'

import authActions from './AuthActions'
import marketActions from './MarketActions'
import activityActions from './ActivityActions'
import rosterActions from './RosterActions'
import stableActions from './StableActions'
import studActions from './StudActions'
import otherActions from './OtherActions'
import auctionActions from './AuctionActions'
import filterActions from './FilterActions'

export default createActions(
  Object.assign(
    {},
    marketActions,
    authActions,
    activityActions,
    rosterActions,
    otherActions,
    stableActions,
    studActions,
    auctionActions,
    filterActions,
  ),
)
