
/**
 * Permet de savoir si l'utilisateur peut conduire
 * @param {number} age 
 * @param {string} country Code pays sur deux caracteres
 * @returns {boolean}
 */
function canDrive(age, country) {
    if (age => 18) {
        return true
    }
    else if (country === "US" && age >= 16 ) {
        return true
    }
    return false
}
function isMajeur(age) {
    return age >= 18
}

/**
 * @returns {Promise<{id:number, title:string, body:string}[]>}
 */
function fetchPost(){

}
const a = fetchPost().then((posts) => {
    const post = posts[0]
})

/**
 * @property {string} firstname
 */
class A {
    constructor() {
        /**
         * @type {string}
         * nom de l'utilisateur
         */
        this.name = ""
        
    }
}
const b = new A()
b.name
