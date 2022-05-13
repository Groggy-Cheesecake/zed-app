import { CURRENT_NETWORK } from './const/GlobalData'
import { GOPCreator, Core, Breeding } from '@/contracts'
import { isDev } from './utils'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: CURRENT_NETWORK.gateway,
    },
  },
  contracts: [
    {
      contractName: 'GOPCreator',
      web3Contract: GOPCreator.getInstance().contract,
    },
    {
      contractName: 'Core',
      web3Contract: Core.getInstance().contract,
    },
    {
      contractName: 'Breeding',
      web3Contract: Breeding.getInstance().contract,
    },
  ],
  events: {
    // GOPCreator: [
    //     'LogGOPBid', 'LogGOPClaim', 'OwnershipRenounced', 'OwnershipTransferred',
    // ],
    // Core: [
    //     'LogHorseInStud',
    //     'LogAuctionCreated',
    //     'Transfer',
    //     'Approval',
    //     'ApprovalForAll',
    //     'LogHorseSell',
    //     'LogHorseBuy',
    //     'LogGOPCreated',
    //     'OwnershipRenounced',
    //     'OwnershipTransferred',
    // ],
    // Breeding: [
    //     'LogOffspringCreated', 'OwnershipRenounced', 'OwnershipTransferred',
    // ],
  },
  polls: {
    accounts: isDev() ? 30000 : 1500,
  },
}

export default options
