export default class User {
    constructor() { this.key = "user" }

    get() {
        return localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : null
    }

    set(user) {
        localStorage.setItem(this.key, JSON.stringify(user))
    }

    remove() {
        localStorage.removeItem(this.key)
    }
}