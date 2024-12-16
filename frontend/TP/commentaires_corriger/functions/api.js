/**
 * 
 * @param {string} url 
 * @param {RequestInit & {json?: Object}} options 
 * @returns 
 */
export const fetchJSON = async function(url, options = {}){
    const headers = {Accept: 'application/json', ...options.headers}
    const response = await fetch(url, {...options, headers})

    if (response.ok){
        return await response.json()
    }
    throw new Error("Erreur serveur", {
        cause: response
    })
    
}