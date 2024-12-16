export const YEARS = 0
export const MONTHS = 1
export const DAYS = 2


/**
 * 
 * @param {*} date la date actuelle
 * @param {*} interval Un dictionnaire qui contient le jour, mois et annnees qu'on veut ajouter ou retrancher
 * @returns {new Date()} la date modifier
 */
export const addInterval = function(date, interval) {
    const parts = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ]
    for (const [unit, value] of Object.entries(interval)) {
        
        parts[unit] += value
        
    }


    return new Date(...parts)
}