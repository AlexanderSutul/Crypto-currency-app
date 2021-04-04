/**
 * Self created localstorage manager
 */
class LocalStorageManager {
    static set(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    static get(key) {
        const data = localStorage.getItem(key)
        return JSON.parse(data)
    }
}

export default LocalStorageManager