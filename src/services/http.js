import { capitalize } from '../utils'

const API_KEY =
  'd1b90284df471728448a4d64455124a4eca650d496c4e3ec68053f4ba7c45222'

/**
 * Here is should be a function to send requests to min-api.cryptocompare API
 */
class CryptoApi {
  /**
   * Returns the url for crypto api
   * @param cryptoName
   * @returns {string}
   */
  static getUrl(listOfCryptoCurrencies, listOfCurrencies) {
    const base = 'https://min-api.cryptocompare.com'
    const mainURL = `${base}/data/price?`
    const fSym = `fsym=${listOfCryptoCurrencies.map(capitalize).join(',')}`
    const tSym = `tsyms=${listOfCurrencies.map(capitalize).join(',')}`
    const fullUrl = `${mainURL}${fSym}&${tSym}`
    const apiKey = `api_key=${API_KEY}`
    return `${fullUrl}&${apiKey}`
  }

  /**
   * Returns data for selected cryptos
   * @param listOfCryptoCurrencies
   * @param listOfCurrencies
   * @returns {Promise<any>}
   */
  static async getRate(listOfCryptoCurrencies, listOfCurrencies) {
    const apiLink = this.getUrl(listOfCryptoCurrencies, listOfCurrencies)
    const response = await fetch(apiLink)
    return await response.json()
  }
}

export default CryptoApi
