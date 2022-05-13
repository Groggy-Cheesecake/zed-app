// Services
import { getOpenAuctions } from '../../services/AuctionService'
import {
  createAuction,
  foundationAuctionBid,
  getAuctionBids,
  userAuctionBid,
  userAuctionWithdraw,
} from '../../services/ContractsService'

export default {
  ['auction/CREATE_AUCTION']: (address, queryPrice, duration, horseId, minimum) =>
    createAuction(address, queryPrice, duration, horseId, minimum),
  ['auction/FOUNDATION_AUCTION_BID']: (address, amount, auctionId) =>
    foundationAuctionBid(address, amount, auctionId),
  ['auction/GET_OPEN_AUCTIONS']: etherPrice => getOpenAuctions(etherPrice),
  ['auction/GET_AUCTION_BIDS']: (auctionId, bidders) => getAuctionBids(auctionId, bidders),
  ['auction/USER_AUCTION_BID']: (address, amount, auctionId) =>
    userAuctionBid(address, amount, auctionId),
  ['auction/USER_AUCTION_WITHDRAW']: auctionId => userAuctionWithdraw(auctionId),
}
