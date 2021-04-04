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
        return `${base}/data/price?fsym=${cryptoName}&tsyms=EUR`
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
