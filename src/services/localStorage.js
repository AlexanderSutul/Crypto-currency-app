/**
 * Self created localstorage manager
 */
class LocalStorageManager {
    /**
     * Save data to LocalStorage by key
     * @param key
     * @param data
     */
    static set(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    /**
     * Get data from LocalStorage by key
     * @param key
     * @returns {any}
     */
    static get(key) {
        const data = localStorage.getItem(key)
        return JSON.parse(data)
    }
}

export default LocalStorageManager
