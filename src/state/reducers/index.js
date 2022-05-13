import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'
import { drizzleReducers } from 'drizzle'

import { AuthReducer } from './AuthReducer'
import { MarketReducer } from './MarketReducer'
import { StableReducer } from './StableReducer'
import { RosterReducer } from './RosterReducer'
import { ActivityReducer } from './ActivityReducer'
import { OtherReducer } from './OtherReducer'
import { DedicateReducer } from './DedicateReducer'
import { StudReducer } from './StudReducer'
import { AuctionReducer } from './AuctionReducer'
import { FilterReducer } from './FilterReducer'

// EXPORT APP REDUCER

export const appReducer = combineReducers({
  auth: AuthReducer,
  market: MarketReducer,
  stable: StableReducer,
  roster: RosterReducer,
  activity: ActivityReducer,
  other: OtherReducer,
  dedicate: DedicateReducer,
  stud: StudReducer,
  auction: AuctionReducer,
  filters: FilterReducer,
  localize: localizeReducer,
  ...drizzleReducers,
})

export default function(state, action) {
  return appReducer(state, action)
}
