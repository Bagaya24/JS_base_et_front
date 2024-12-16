/**
 * Recuperer des cookies
 * @param {string} name 
 * @return {string | null}
 */
const getCookie = function(name) {
    const cookies = document.cookie.split(";")
    const value = cookies.find(c => c.startsWith(name))?.split('=')[1]
    if (value === undefined) {
        return null
    }
    return decodeURIComponent(value)

}

/**
 * Creer un cookie
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 */
const setCookie = function({name, value, days}) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}`
}

setCookie({
    name: 'Hello',
    value: "Bonjour le monde",
    days: 3
})

fetch("/")
