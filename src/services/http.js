const API_KEY = 'd1b90284df471728448a4d64455124a4eca650d496c4e3ec68053f4ba7c45222'

/**
 * Here is should be a function to send requests to min-api.cryptocompare API
 */
class CryptoApi {
    /**
     * Returns the url for crypto api
     * @param cryptoName
     * @returns {string}
     */
    static getUrl(cryptoName) {
        const base = 'https://min-api.cryptocompare.com'
        const fullUrl = `${base}/data/price?fsym=${cryptoName.toUpperCase()}&tsyms=EUR`

        return `${fullUrl}&api_key=${API_KEY}`
    }

    /**
     * Returns data for selected crypto
     * @param name
     * @returns {Promise<any>}
     */
    static async getRateByCryptoName(name) {
        const apiLink = this.getUrl(name)
        const response = await fetch(apiLink)
        return await response.json()
    }
}

export default CryptoApi
