// Clients
import web3 from './clients/Web3Client'
import client from './clients/ApiClient'
import ipfs from './clients/IPFSClient'

// Constants
import { HORSES_BLOODLINES } from '@/const/HorsesData'

// Service
import { getRecommendedGasPrice } from './ETHService'
import { getHorseById } from './HorsesService'

// Contracts
import { GOPCreator, Core, Breeding, Stud, SaleAuction, FoundationAuctions } from '@/contracts'

// Utils
import { getHorseBloodline, sleep } from '@/utils'

export function loadHorseDataFromIPFS(hash) {
  return ipfs.cat(hash).then(d => JSON.parse(d.toString()))
}

export function getHorseOffspring(id) {
  const BreedingContract = Breeding.getInstance()
  return BreedingContract.getHorseOffspringStats(id)
    .call()
    .then(res => Number(res[0]))
    .catch(() => 'NA') // TODO: Handle error scenarios better
}

export function buyHorse(hash, address, price = 0.4) {
  return new Promise((resolve, reject) => {
    const GOPCreatorContract = GOPCreator.getInstance()
    GOPCreatorContract.createGOP(address, hash)
      .send({
        from: address,
        value: web3.utils.toWei(price.toString(), 'ether'),
      })
      .on('transactionHash', resolve)
      .on('error', reject)
  })
}

export function totalSupply() {
  const CoreContract = Core.getInstance()
  return CoreContract.totalSupply()
    .call()
    .then(r => r[0].toString(10))
}

export function getPurchaseHistory(page = 0, pageSize = 10) {
  const CoreContract = Core.getInstance()

  return totalSupply()
    .then(count => {
      const promises = []
      for (let id = count - page * pageSize - 1; id >= count - (page + 1) * pageSize; id--) {
        promises.push(
          sleep(100 * -(id - count)).then(() => {
            return CoreContract.ownerOf(id)
              .call()
              .then(r => ({
                owner: r[0],
                id,
              }))
          }),
        )
      }

      return Promise.all(promises)
    })
    .then(horses => {
      return Promise.all(
        horses.map(({ id, owner }) => {
          return sleep(200 * id).then(() => {
            return getHorseDataById(id, { owner })
          })
        }),
      )
    })
    .then(horses => {
      const addresses = []
      horses.map(h => addresses.push(web3.utils.toChecksumAddress(h.owner)))

      return client
        .post('/users/get_user', {
          addresses,
        })
        .then(res => {
          const userStableMap = {}
          const { users } = res.data

          // Create map of user address and stable name to avoid duplicates
          users.map(u => (userStableMap[u.public_address] = u.stable_name))

          return horses.map(horse => {
            return {
              ...horse,
              owner_stable: userStableMap[horse.owner],
            }
          })
        })
    })
    .then(horses => ({ horses, page, pageSize }))
}

/**
 * @function getHorseDataById
 *
 * @param {number} id - Horse ID.
 * @param {Object} data - Additional data that needs to be appended to the horse info.
 * @return {Object} - Horse information
 */
export function getHorseDataById(id, data) {
  const CoreContract = Core.getInstance()

  return CoreContract.getHorseData(id)
    .call()
    .then(r => {
      return {
        id,
        ...data,
        hash: r[0],
        sex: web3.utils.toUtf8(r[1]),
        baseValue: r[2].toString(10),
        date: new Date(Number(r[3]) * 1000),
        amountOfTimesSold: r[4].toString(10),
        genotype: 'Z' + r[5].toString(10),
        bloodline: HORSES_BLOODLINES[web3.utils.toUtf8(r[6])],
        gender: web3.utils.toUtf8(r[7]),
        races: 0,
        career: '0/0/0',
        winrate: 0,
      }
    })
    .then(horse => {
      return loadHorseDataFromIPFS(horse.hash).then(res => {
        return {
          ...horse,
          ...res,
          img_url: `https://cdn.zed.run/images/${res.hex_code}.svg`,
        }
      })
    })
    .then(horse => {
      return getHorseOffspring(horse.id).then(offspring => {
        return {
          ...horse,
          offspring,
        }
      })
    })
}

export function getOwnedHorses(address) {
  const CoreContract = Core.getInstance()

  return totalSupply()
    .then(count => {
      const promises = []
      for (let id = 1; id <= count; id++) {
        promises.push(
          CoreContract.ownerOf(id)
            .call()
            .then(r => ({ owner: r[0], id })),
        )
      }
      return Promise.all(promises)
    })
    .then(horses => {
      return horses.filter(
        h => web3.utils.toChecksumAddress(h.owner) === web3.utils.toChecksumAddress(address),
      )
    })
    .then(horses => {
      return Promise.all(
        horses.map(({ id }) => {
          return sleep(200 * id).then(() => {
            return getHorseDataById(id)
          })
        }),
      )
    })
}

export function getCurrentBatch() {
  const GOPCreatorContract = GOPCreator.getInstance()
  return GOPCreatorContract.isABatchOpen()
    .call()
    .then(res => Number(res[1]))
}

export function getHorsesRemaining(gen) {
  const GOPCreatorContract = GOPCreator.getInstance()
  return GOPCreatorContract.horsesRemaining(gen)
    .call()
    .then(res => Number(res[0]))
}

export function estimateBuyTransactionFee(address, price) {
  const estimatedGas = new Promise(resolve => {
    web3.eth.estimateGas(
      {
        // to: GOP_CREATOR_ADDRESS,
        from: web3.utils.toChecksumAddress(address),
        value: web3.utils.toWei(price.toString(), 'ether'),
      },
      (res, sum) => {
        resolve(sum)
      },
    )
  })
  const recomendedFee = getRecommendedGasPrice()
  return Promise.all([estimatedGas, recomendedFee]).then(([sum, price]) => {
    return sum * price * 0.000000001
  })
}

export function getQueryPrice() {
  const StudContract = Stud.getInstance()
  return StudContract.getQueryPrice()
    .call()
    .then(r => r[0])
}

export function getMinimumBreedPrice(horseId) {
  const StudContract = Stud.getInstance()
  return StudContract.getMinimumBreedPrice(horseId).call()
}

export function putHorseInStud(address, queryPrice, horseId, price, duration) {
  const StudContract = Stud.getInstance()

  return new Promise((resolve, reject) => {
    StudContract.putInStud(
      horseId,
      web3.utils.toWei(price.toString(), 'ether'),
      duration * 24 * 60 * 60,
    )
      .send({
        from: web3.utils.toChecksumAddress(address),
        value: web3.utils.toWei(queryPrice.toString(), 'ether'),
      })
      .on('transactionHash', resolve)
      .on('error', reject)
  })
}

export function getHorsesInStud() {
  const StudContract = Stud.getInstance()
  const CoreContract = Core.getInstance()

  return StudContract.getHorsesInStud()
    .call()
    .then(r => r[0].map(n => Number(n)))
    .then(ids => {
      const promises = ids.map(id => {
        return CoreContract.ownerOf(id).then(r => ({ id, owner: r[0] }))
      })
      return Promise.all(promises)
    })
    .then(horses => Promise.all(horses.map(d => getHorseDataById(d.id, { owner: d.owner }))))
    .then(horses => {
      const owners = {}
      horses.forEach(h => (owners[h.owner] = ''))
      const addresses = Object.keys(owners)
      return client
        .post('/users/get_user', {
          addresses,
        })
        .then(res => {
          res.data.users.forEach(({ stable_name }, ind) => {
            owners[addresses[ind]] = stable_name
          })
          return horses.map(horse => {
            return {
              ...horse,
              owner_stable: owners[horse.owner],
            }
          })
        })
    })
    .then(horses => {
      return Promise.all(
        horses.map(horse => {
          return CoreContract.studInfo(horse.id.toString())
            .call()
            .then(r => {
              return {
                ...horse,
                mating_price: web3.utils.fromWei(r[1], 'ether'),
                minting_duration: Number(r[2]),
                horse_id: horse.id,
              }
            })
        }),
      )
    })
}

export function getSingleStudHorseById(id) {
  const CoreContract = Core.getInstance()
  const StudContract = Stud.getInstance()

  return CoreContract.ownerOf(id)
    .call()
    .then(r => ({ id, owner: r[0] }))
    .then(horse => getHorseById(horse.id))
    .then(horse => {
      return StudContract.studInfo(horse.id.toString())
        .call()
        .then(r => {
          return {
            ...horse,
            mating_price: web3.utils.fromWei(r[1], 'ether'),
            minting_duration: Number(r[2]),
            horse_id: horse.id,
          }
        })
    })
}

export function areHorsesRelated(parents) {
  const BreedingContract = Breeding.getInstance()
  return BreedingContract.areHorsesRelated(parents.father, parents.mother)
    .call()
    .then(res => {
      return {
        isRelated: res[0],
        relation: res[1],
      }
    })
}

export function breedHorse(parents, address, price, hash) {
  const BreedingContract = Breeding.getInstance()

  return new Promise((resolve, reject) => {
    BreedingContract.mix(parents.father, parents.mother, hash)
      .send({
        from: web3.utils.toChecksumAddress(address),
        value: web3.utils.toWei(price.toString(), 'ether'),
      })
      .on('transactionHash', resolve)
      .on('error', reject)
  })
}

/**
 * @function createAuction
 *
 * @param {string} address - Horse owner address.
 * @param {number} queryPrice - Oracle query gas price.
 * @param {string} duration - Time duration during which the auction is live.
 * @param {number} horseId - ID of the Horse which is being auctioned.
 * @param {number} minimum - Minimum bid price for buyers to participate in the auction.
 * @return {Promise} - Returns `transactionHash` created on-chain
 */
export function createAuction(address, queryPrice, duration, horseId, minimum) {
  const CoreContract = Core.getInstance()

  // Add Zed fee of `0.08 * reserve price` along with gas fee to the transaction
  const zedFee = minimum * 0.08 + queryPrice
  const value = web3.utils.toWei(zedFee.toString(), 'ether')

  return new Promise((resolve, reject) => {
    CoreContract.createAuction(
      parseInt(duration) * 24 * 60 * 60,
      horseId,
      web3.utils.toWei(minimum.toString(), 'ether'),
    )
      .send({
        from: web3.utils.toChecksumAddress(address),
        value,
      })
      .on('transactionHash', resolve)
      .on('error', reject)
  })
}

/**
 * @function foundationAuctionBid
 *
 * @param {string} address - Horse owner address.
 * @param {number} amount - Total bidding cost including gas fee.
 * @param {number} auctionId - ID of the auction bidding for.
 * @return {Promise} - Returns `transactionHash` created on-chain
 */
export function foundationAuctionBid(address, amount, auctionId) {
  const FoundationAuctionsContract = FoundationAuctions.getInstance()

  return new Promise((resolve, reject) => {
    FoundationAuctionsContract.foundationAuctionBid(auctionId)
      .send({
        from: web3.utils.toChecksumAddress(address),
        value: web3.utils.toWei(amount.toString(), 'ether'),
      })
      .on('transactionHash', resolve)
      .on('error', reject)
  })
}

/**
 * @function userAuctionBid
 *
 * @param {string} address - Horse owner address.
 * @param {number} amount - Total bidding cost including gas fee.
 * @param {number} auctionId - ID of the auction bidding for.
 * @return {Promise} - Returns `transactionHash` created on-chain
 */
export function userAuctionBid(address, amount, auctionId) {
  const SaleAuctionContract = SaleAuction.getInstance()

  return new Promise((resolve, reject) => {
    SaleAuctionContract.userAuctionBid(auctionId)
      .send({
        from: web3.utils.toChecksumAddress(address),
        value: web3.utils.toWei(amount.toString(), 'ether'),
      })
      .on('transactionHash', resolve)
      .on('error', reject)
  })
}

/**
 * @function getOpenUserAuctions
 *
 * @param {array} auctions - Open User Auctions fetched via API.
 * @return {Promise} - Returns open user auctions
 */
export function getOpenUserAuctions(auctions) {
  const SaleAuctionContract = SaleAuction.getInstance()

  const promises = auctions.map(auction => {
    return SaleAuctionContract.getAuction(auction.auction_id)
      .call()
      .then(r => ({
        auctionId: auction.auction_id,
        auctionType: auction.auction_type,
        owner: r[0],
        createdAt: Number(r[1]),
        duration: Number(r[2]),
        horseId: Number(r[3]),
        bidders: r[4] ? [...new Set(r[4])] : [], // Remove duplicate bidder addresses
      }))
  })

  return Promise.all(promises).then(auctions =>
    Promise.all(
      auctions.map(a =>
        getHorseById(a.horseId, {
          auctionId: a.auctionId,
          auctionType: a.auctionType,
          horseId: a.horseId,
          owner: a.owner,
          bidders: a.bidders,
          createdAt: a.createdAt,
          duration: a.duration,
        }),
      ),
    ),
  )
}

/**
 * @function getOpenFoundationAuctions
 *
 * @param {array} auctions - Open Foundations Auctions fetched via API.
 * @param {number} etherPrice - Current ETH price in USD.
 * @return {Promise} - Returns open foundation auctions
 */
export function getOpenFoundationAuctions(auctions, etherPrice) {
  const FoundationAuctionsContract = FoundationAuctions.getInstance()

  const promises = auctions.map(auction => {
    return FoundationAuctionsContract.getAuction(auction.auction_id)
      .call()
      .then(r => ({
        auctionId: auction.auction_id,
        auctionType: auction.auction_type,
        createdAt: Number(r[0]),
        maxBid: web3.utils.fromWei(r[1], 'ether'),
        minimum: web3.utils.fromWei(r[2], 'ether'),
        genotype: 'Z' + r[3].toString(10), // horseBatch
        firstBidTime: Number(r[4]),
        maxBidder: r[5],
        bidders: r[6],
        isOpen: r[7],
        // horseHash: r[8], // Ignore IPFS hash as we're fetching the horse info directly from the API

        // If there's a bid, auction validity is 24 hours. If not, 8 hours
        duration: Number(r[4]) ? 86400 : 28800,
        bloodline: getHorseBloodline(Number(r[3])),
        minBidPrice: Number(r[1])
          ? (Number(web3.utils.fromWei(r[1], 'ether')) + 10 / etherPrice).toFixed(3)
          : (Number(web3.utils.fromWei(r[2], 'ether')) + 10 / etherPrice).toFixed(3),

        // Horse Data
        color: auction.horse_data.color,
        gender: auction.horse_data.gender,
        name: auction.horse_data.name,
        img_url: `https://cdn.zed.run/images/${auction.horse_data.hex_code}.svg`,
        owner_stable: 'Foundations Stable',
        races: 0,
        career: '0/0/0',
        winrate: 0,
      }))
  })

  return Promise.all(promises)
}

/**
 * @function getAuctionBids
 *
 * @param {number} auctionId - Auction ID.
 * @param {array} bidders - Addresses of bidders.
 * @param {string} type - Auction type: foundation/user.
 * @return {Promise} - Returns auction bids
 */
export function getAuctionBids(auctionId, bidders, type) {
  const Contract = type === 'user' ? SaleAuction.getInstance() : FoundationAuctions.getInstance()

  if (!bidders || bidders.length === 0) {
    return []
  }

  return client
    .post('/users/get_user', {
      addresses: bidders,
    })
    .then(res => {
      const userStableMap = {}
      const { users } = res.data

      // Create map of user address and stable name to avoid duplicates
      users.map(u => (userStableMap[u.public_address] = u.stable_name))

      const promises = bidders.map(bidderAddr => {
        return Contract.getBidData(auctionId, bidderAddr)
          .call()
          .then(data => {
            return {
              bidderAddr,
              bidderStableName: userStableMap[bidderAddr],
              bidVal: web3.utils.fromWei(data[0], 'ether'),
              bidTime: Number(data[1]),
            }
          })
      })

      return Promise.all(promises).then(data => data.sort((a, b) => b.bidVal - a.bidVal))
    })
}

/**
 * @function getBidData
 *
 * @param {number} auctionId - Auction ID.
 * @param {string} bidderAddress - Addresses of bidder.
 * @param {string} type - Auction type: Foundation/User.
 * @return {Promise} - Returns bid specific data
 */
export function getBidData(auctionId, bidderAddress, type) {
  const Contract = type === 'User' ? SaleAuction.getInstance() : FoundationAuctions.getInstance()

  return Contract.getBidData(auctionId, bidderAddress)
    .call()
    .then(data => {
      return {
        bidderAddress,
        bidVal: web3.utils.fromWei(data[0], 'ether'),
        bidTime: Number(data[1]),
      }
    })
}

/**
 * @function userAuctionWithdraw
 *
 * @param {number} auctionId - ID of the withdrawing auction.
 * @return {Promise} - Returns whether user successfully withdrew auction or not
 */
export function userAuctionWithdraw(auctionId) {
  const SaleAuctionContract = SaleAuction.getInstance()
  return SaleAuctionContract.userAuctionWithdraw(auctionId).call()
}
