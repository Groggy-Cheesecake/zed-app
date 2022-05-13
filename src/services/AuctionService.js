// Client
import client from './clients/ApiClient'

// Service
import { getOpenFoundationAuctions } from './ContractsService'

/**
 * @function getOpenAuctions
 *
 * @param {number} etherPrice - Current ETH price in USD.
 * @return {Promise} - Returns list of open auctions
 */
export function getOpenAuctions(etherPrice) {
  return client.get('auctions/get_open_auctions').then(res => {
    const foundationAuctions = []
    const userAuctions = []

    res.data.map(a =>
      a.auction_type === 'user' ? userAuctions.push(a) : foundationAuctions.push(a),
    )

    // TODO: Re-enable User Auctions when the contract is updated
    /* return Promise.all([
                getOpenFoundationAuctions(foundationAuctions, etherPrice),
                getOpenUserAuctions(userAuctions)
            ]).then(data => {
                // Workaround to ignore the auctions for which getting horses info failed
                return data[0].concat(data[1])
                    .filter(a => Object.entries(a).length !== 0 && a.constructor === Object)
                    .sort((a, b) => b.createdAt - a.createdAt);
            }); */

    return getOpenFoundationAuctions(foundationAuctions, etherPrice).then(data =>
      data.sort((a, b) => b.createdAt - a.createdAt),
    )
  })
}
