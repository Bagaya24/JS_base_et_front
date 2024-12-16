
/**
 * creer un element HTML representant un article
 * @param {{title: string, body: string}} post
 * @return {HTMLElement}
 */
const createArticle = function(post){
    const article = document.createElement('article')
    article.append(createElementWithText('h2', post.title))
    article.append(createElementWithText('p', post.body))
    return article

}

/**
 * 
 * @param {*} tagName 
 * @param {*} content le contenu de l'article
 * @returns {HTMLElement}
 */
const createElementWithText = function(tagName, content){
    const element = document.createElement(tagName)
    element.innerText = content
    return element
}


/**
 * Recuperer les donnees a un API puis les affiches sur une page
 * @returns 
 */
const fetchPost = async function() {
    const lastPosts = document.querySelector("#lastPosts")
    const loader = document.createElement('p')
    loader.innerHTML = "Chargement..."
    lastPosts.append(loader)
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5",
            {
                method:"GET", 
                headers: {
                    "Accept": "application/json"
                }
            }
    
        )
        if (!response.ok){
            throw new Error("Error serveur");
            
        }
        loader.remove()
        const posts = await response.json()
        for (let post of posts){
            lastPosts.append(createArticle(post))
        }
    
        
    } catch (e) {
        loader.innerHTML = "Impossible de charger les donnees"
        loader.style.color = "red"
        return 
        
    }
            
    }

fetchPost()