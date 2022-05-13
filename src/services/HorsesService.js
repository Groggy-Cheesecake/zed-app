import client from './clients/ApiClient'
import web3 from './clients/Web3Client'
import { getHorseOffspring, getMinimumBreedPrice } from './ContractsService'

export function getNextHorse() {
  return client.get('/horses/display_next_horse').then(res => {
    return res.data
  })
}

export function getQueryPrice() {
  return client.get('/contracts/query_price').then(res => {
    return res.data.ether
  })
}

export function saveStudTransaction({ tx_hash, horse_name }) {
  return client.post('/stud/save_tx', { tx_hash, horse_name }).then(res => res.data)
}

export function getStudHorses(offset, filter_fn) {
  return client
    .get('/stud/horses', {
      params: {
        offset,
        ...filter_fn,
      },
    })
    .then(res => {
      return res.data.map(data => {
        const { hash_info, ...info } = data
        return {
          ...info,
          color: hash_info.color,
          gender: hash_info.gender,
          hex_code: hash_info.hex_code,
          name: hash_info.name,
          mating_price: web3.utils.fromWei(info.mating_price.toString(), 'ether'),
          races: 0,
          career: '0/0/0',
          winrate: 0,
        }
      })
    })
    .then(horses => {
      const owners = {}
      horses.forEach(h => (owners[web3.utils.toChecksumAddress(h.owner)] = ''))
      const addresses = Object.keys(owners)
      return client
        .post('/users/get_user', {
          addresses,
        })
        .then(res => {
          res.data.users.forEach(({ stable_name, public_address }) => {
            owners[public_address] = stable_name
          })
          return horses.map(horse => {
            return {
              ...horse,
              owner_stable: owners[web3.utils.toChecksumAddress(horse.owner)],
            }
          })
        })
    })
    .then(horses => {
      const promises = horses.map(horse => {
        return getHorseOffspring(horse.horse_id).then(offspring => {
          return {
            ...horse,
            offspring,
          }
        })
      })
      return Promise.all(promises)
    })
}

export function getHorseById(id) {
  return client
    .get(`/horses/get/${id}`)
    .then(res => {
      const { hash_info, ...data } = res.data
      return {
        id,
        horse_id: id,
        ...data,
        mating_price: web3.utils.fromWei(data.mating_price.toString(), 'ether'),
        color: hash_info.color,
        gender: hash_info.gender,
        hex_code: hash_info.hex_code,
        name: hash_info.name,
        races: 0,
        career: '0/0/0',
        winrate: 0,
      }
    })
    .then(data => (!data.owner_stable ? getOwnerStable(data) : data))
    .then(horse => {
      return getHorseOffspring(horse.id).then(offspring => {
        return {
          ...horse,
          offspring,
        }
      })
    })
    .then(horse => {
      if (['Colt', 'Stallion'].indexOf(horse.horse_type) === -1) {
        return Promise.resolve(horse)
      }

      return getMinimumBreedPrice(horse.id).then(r => {
        return {
          ...horse,
          min_breeding_price: Number(web3.utils.fromWei(r, 'ether')),
        }
      })
    })
    .catch(() => {
      return {}
    }) // return empty object on failure
}

export function getOwnerStable(data) {
  return client
    .post('/users/get_user', {
      public_address: web3.utils.toChecksumAddress(data.owner),
    })
    .then(res => {
      return {
        ...data,
        owner_stable: res.data.user.stable_name,
      }
    })
    .catch(() => {
      return {
        ...data,
        owner_stable: 'NA',
      }
    })
}

export function getUserHorses(public_address, offset, filter_fn) {
  return client
    .get('/horses/get_user_horses', {
      params: {
        public_address,
        offset,
        ...filter_fn,
      },
    })
    .then(res => {
      return res.data.map(data => {
        const { hash_info, ...info } = data
        return {
          ...info,
          color: hash_info.color,
          gender: hash_info.gender,
          hex_code: hash_info.hex_code,
          name: hash_info.name,
          races: 0,
          career: '0/0/0',
          winrate: 0,
        }
      })
    })
    .then(horses => {
      const promises = horses.map(horse => {
        return getHorseOffspring(horse.horse_id).then(offspring => {
          return {
            ...horse,
            offspring,
          }
        })
      })
      return Promise.all(promises)
    })
    .then(horses => {
      return Promise.all(
        horses.map(horse => {
          if (['Colt', 'Stallion'].indexOf(horse.horse_type) === -1) {
            return Promise.resolve(horse)
          }

          return getMinimumBreedPrice(horse.horse_id).then(r => {
            return {
              ...horse,
              min_breeding_price: Number(web3.utils.fromWei(r, 'ether')),
            }
          })
        }),
      )
    })
}

export function getFemaleHorses(public_address) {
  return client
    .get('/horses/female_horses', {
      params: {
        public_address,
      },
    })
    .then(res => {
      return res.data.map(data => {
        const { hash_info, ...info } = data
        return {
          ...info,
          color: hash_info.color,
          gender: hash_info.gender,
          hex_code: hash_info.hex_code,
          name: hash_info.name,
          races: 0,
          career: '0/0/0',
          winrate: 0,
          offspring: 0,
        }
      })
    })
    .then(horses => {
      const promises = horses.map(horse => {
        return getHorseOffspring(horse.horse_id).then(offspring => {
          return {
            ...horse,
            offspring,
          }
        })
      })
      return Promise.all(promises)
    })
}

export function getRosterHorses(offset, filter_fn) {
  return client
    .get('/horses/roster', {
      params: { offset, ...filter_fn },
    })
    .then(res => {
      return res.data.map(data => {
        const { hash_info, ...info } = data
        return {
          ...info,
          color: hash_info.color,
          gender: hash_info.gender,
          hex_code: hash_info.hex_code,
          name: hash_info.name,
          races: 0,
          career: '0/0/0',
          winrate: 0,
        }
      })
    })
    .then(horses => {
      const owners = {}
      horses.forEach(h => (owners[web3.utils.toChecksumAddress(h.owner)] = 'NA'))
      const addresses = Object.keys(owners)

      return client
        .post('/users/get_user', {
          addresses,
        })
        .then(res => {
          res.data.users.forEach(({ stable_name, public_address }) => {
            owners[public_address] = stable_name
          })

          return horses.map(horse => {
            return {
              ...horse,
              owner_stable: owners[web3.utils.toChecksumAddress(horse.owner)],
            }
          })
        })
    })
    .then(horses => {
      const promises = horses.map(horse => {
        return getHorseOffspring(horse.horse_id).then(offspring => {
          return {
            ...horse,
            offspring,
          }
        })
      })

      return Promise.all(promises)
    })
}

export function nameOffspring(data) {
  return client
    .post('/offsprings/name_offspring', data)
    .then(() => data)
    .catch(e => {
      throw e.response.data.error
    })
}

export function getFemalesByOwner() {
  // TO be implemnted on backend
  return Promise.resolve([])
}
