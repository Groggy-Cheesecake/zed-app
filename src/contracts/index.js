import web3 from '@/services/clients/Web3Client'

// ABIs
import { abi as GOPCreatorABI } from '@/contracts/compiled/GOPCreator.json'
import { abi as CoreABI } from '@/contracts/compiled/Core.json'
import { abi as BreedingABI } from '@/contracts/compiled/Breeding.json'
import { abi as StudABI } from '@/contracts/compiled/StudServiceV2.json'
import { abi as SaleAuctionABI } from '@/contracts/compiled/SaleAuction.json'
import { abi as FoundationAuctionsABI } from '@/contracts/compiled/FoundationAuctions.json'

// Constants
import { CURRENT_NETWORK } from '@/const/GlobalData'

// Utils
import { Singleton } from '../utils'

export const CORE_ADDRESS = CURRENT_NETWORK.CONTRACT_ADDRESSES.CORE
export const GOP_CREATOR_ADDRESS = CURRENT_NETWORK.CONTRACT_ADDRESSES.GOP_CREATOR
export const BREEDING_ADDRESS = CURRENT_NETWORK.CONTRACT_ADDRESSES.BREEDING
export const STUD_SERVICE_ADDRESS = CURRENT_NETWORK.CONTRACT_ADDRESSES.STUD_SERVICE
export const SALE_AUCTION_ADDRESS = CURRENT_NETWORK.CONTRACT_ADDRESSES.SALE_AUCTION
export const FOUNDATION_AUCTIONS_ADDRESS = CURRENT_NETWORK.CONTRACT_ADDRESSES.FOUNDATION_AUCTIONS

class ContractSingleton extends Singleton {
  constructor(abi, address) {
    super()
    this.contract = this.createContract(abi, address)

    abi.forEach(method => {
      this[method.name] = (...args) => {
        return this.contract.methods[method.name](...args)
      }
    })
  }

  createContract(abi, address) {
    if (!web3) {
      throw 'No web3 found!'
    }
    return new web3.eth.Contract(abi, address, {
      data: 'deployedBytecode',
    })
  }
}

export class Core extends ContractSingleton {
  static createInstance() {
    return new Core(CoreABI, CORE_ADDRESS)
  }
}

export class GOPCreator extends ContractSingleton {
  static createInstance() {
    return new GOPCreator(GOPCreatorABI, GOP_CREATOR_ADDRESS)
  }
}

export class Breeding extends ContractSingleton {
  static createInstance() {
    return new Breeding(BreedingABI, BREEDING_ADDRESS)
  }
}

export class Stud extends ContractSingleton {
  static createInstance() {
    return new Stud(StudABI, STUD_SERVICE_ADDRESS)
  }
}

export class SaleAuction extends ContractSingleton {
  static createInstance() {
    return new SaleAuction(SaleAuctionABI, SALE_AUCTION_ADDRESS)
  }
}

export class FoundationAuctions extends ContractSingleton {
  static createInstance() {
    return new FoundationAuctions(FoundationAuctionsABI, FOUNDATION_AUCTIONS_ADDRESS)
  }
}
