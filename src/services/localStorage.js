/**
 * Self created localstorage manager
 */
class LocalStorageManager {
  /**
   * Save data to LocalStorage by key
   * @param key
   * @param dataObject
   */
  static set(key, dataObject) {
    localStorage.setItem(key, JSON.stringify(dataObject))
  }

  /**
   * Get data from LocalStorage by key
   * @param key
   * @returns {any}
   */
  static get(key) {
    return JSON.parse(localStorage.getItem(key))
  }
}

export default LocalStorageManager
