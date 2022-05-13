import moment from 'moment'

// Constants
import { HORSES_BLOODLINES } from '../const/HorsesData'

export function formatTimePassedFrom(date) {
  return moment(date).fromNow()
}

export class Singleton {
  instance = null

  static getInstance() {
    if (!this.instance) {
      this.instance = this.createInstance()
    }

    return this.instance
  }
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}

export function ifDev(ifDev, isProd) {
  return isDev() ? ifDev : isProd
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

/**
 * @function formatNumber
 *
 * @param {number} n - Number to be formatted
 * @param {number} d - Number to decimals to be parsed and displayed
 * @return {number} - Formatted number to be displayed on the UI
 */
export function formatNumber(n, d = 3) {
  return parseFloat(n.toFixed(d))
}

/**
 * @function getMetamaskError
 *
 * @param {Object} error - Error message/object that's returned from Metamask
 * @return {string} - Formatted error string to be displayed to the user
 */
export function getMetamaskError(error) {
  if (error.indexOf('User denied transaction') !== -1) {
    return 'User denied transaction.'
  } else if (error.indexOf('User denied message signature') !== -1) {
    return 'User cancelled message signing.'
  } else {
    return error
  }
}

/**
 * @function getHorseBloodline
 *
 * @param {number} horseBatch - Batch number of the horse
 * @return {string} - Return Bloodline of the horse
 */
export function getHorseBloodline(horseBatch) {
  if (horseBatch === 1 || horseBatch === 2) {
    return HORSES_BLOODLINES.N
  } else if (horseBatch === 3 || horseBatch === 4) {
    return HORSES_BLOODLINES.S
  } else if (horseBatch > 4 && horseBatch < 8) {
    return HORSES_BLOODLINES.F
  }

  return HORSES_BLOODLINES.B
}

export function getBrightness(hex_code) {
  const rgb = parseInt(hex_code, 16)
  const r = (rgb >> 16) & 0xff // extract red
  const g = (rgb >> 8) & 0xff // extract green
  const b = (rgb >> 0) & 0xff // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

  return luma
}
