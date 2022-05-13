import { ifDev } from '@/utils'

export const ETH_NETWORKS = [
  {
    id: 1,
    name: 'Main Ethereum Network',
    explorer: 'https://etherscan.io/',
    gateway: 'wss://mainnet.infura.io/ws/v3/1908148fa4ac4a77a7dd421d02497bfa',
    CONTRACT_ADDRESSES: {
      CORE: '0xff488fd296c38a24cccc60b43dd7254810dab64e',
      GOP_CREATOR: '0x9ccbae575b54dc4c80629fd5b71d03cef0278902',
      BREEDING: '0x157a268DC31bb12056A5b760240C6Fef004ec522',
      STUD_SERVICE: '0xa654cFfcb6ba8fb85a652a8A56E8cd03f61eB792', // StudServiceV2
      SALE_AUCTION: null,
      FOUNDATION_AUCTIONS: null,
      RACING: '0x250De0a3caD8d2cd1C0C19896e8a8b83b1B98020',
    },
  },
  {
    id: 3,
    name: 'Ropsten Test Network',
    explorer: 'https://ropsten.etherscan.io/',
    gateway: 'wss://ropsten.infura.io/ws/v3/1908148fa4ac4a77a7dd421d02497bfa',
    CONTRACT_ADDRESSES: {
      CORE: '0xe68ea71c936e86539a38bbb33134e39d3c5c8aaf',
      GOP_CREATOR: '0xb308455aa4cada710e3a4f275a4218786ca55b9e',
      BREEDING: '0x33BCE229c9199D2A70463555d6bf3359caBc646c',
      STUD_SERVICE: '0x7e0d9BeA5005E5c2014DF3bf66b14610672aD7FC', // StudServiceV2
      SALE_AUCTION: '0x8824711e1e4e2b63087e6e29bda16a3ccbe6d21a',
      FOUNDATION_AUCTIONS: '0xC32731DE14c22bF8E7Ca59fC4d7e72E74a84B580',
      RACING: '0x5bAF69e0C9b4b54258A68c0f1ABF896b240F62F0',
    },
  },
]

export const CURRENT_NETWORK = ETH_NETWORKS[ifDev(1, 0)]

export const SUPPORTED_BROWSERS = ['chrome', 'firefox', 'opera']

// Review apps have `API_URL` configured to connect with Back-end in `app.json` within this project
export const API_URL = ifDev(
  `https://${process.env.API_URL || 'zed-api-pr-81.herokuapp.com'}`,
  'https://api.zed.run',
)

export const API_ROOT = `${API_URL}/api/v1`
export const SOCKET_URL = `${API_URL}/socket`.replace('https', 'wss')

export const BLOODLINES = {
  1: 'Nakamoto',
  2: 'Nakamoto',
  3: 'Szabo',
  4: 'Szabo',
  5: 'Finney',
  6: 'Finney',
  7: 'Finney',
  8: 'Buterin',
  9: 'Buterin',
  10: 'Buterin',
}

export const MAX_MALE_OFFSPRINGS = 7
export const MAX_FEMALE_OFFSPRINGS = 2

export const ERROR_MESSAGES = {
  HORSES_RELATED:
    'You cannot breed within your extended family which includes your parents, grandparents, brother or sisters. Try breeding with another racehorse!',
}

export const UNNAMED_FOAL = 'Unnamed Foal'
