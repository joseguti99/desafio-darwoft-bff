export default class Token {
    constructor() {
        this.key = "access_token"
    }
    get() {
        return localStorage.getItem(this.key) ? localStorage.getItem(this.key) : null
    }

    set(token) {
        localStorage.setItem(this.key, token)
    }

    remove() {
        localStorage.removeItem(this.key)
    }
}