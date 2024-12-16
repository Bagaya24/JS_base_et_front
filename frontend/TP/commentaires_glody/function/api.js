export const fetchJSON = async function(url, options = {}){
    const headers = {Accept: 'application/json', ...options.headers}
    const response = await fetch(url, {...options, headers})

    if (response.ok){
        return response.json()
    }
    throw new Error("Erreur serveur", {
        cause: response
    })
    
}

export const fetchAddComment = async function(url, content) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({content})
    })

    if (response.ok) {
        return response.json()
    }
    throw new Error("Impossible de se connecter a l'API");
    
    
}