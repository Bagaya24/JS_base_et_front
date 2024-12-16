import { fetchAddComment, fetchJSON } from "./api.js"

const data = document.querySelector(".js-infinite-pagination")
const divComments = document.querySelector(data.getAttribute('data-target'))
const template = document.querySelector(data.getAttribute('data-template'))

/**
 * 
 * @returns {JSON}
 */
export const getComments = async function() {
    return await fetchJSON(data.getAttribute("data-endpoint"))
}

/**
 * 
 * @param {Object} comment 
 */
export const whriteComments = function(comment) {
    const article = template.content.cloneNode(true)
    const name = article.querySelector(".js-username")
    const body = article.querySelector(".js-content")
    name.innerHTML = comment.name 
    body.innerHTML = comment.body
    divComments.prepend(article)
}

/**
 * 
 * @param {Array.<Object>} comments 
 */
export const addComments = function(comments) {
    
    for (let comment of comments) {       
        whriteComments(comment)
        
    }

}

/**@param {SubmitEvent} e */
export const onSubmit = async function (e) {
    e.preventDefault()
    const form = e.currentTarget
    const dataForm = new FormData(form)
    const name = dataForm.get('name').toString().trim()
    const email = dataForm.get('email').toString().trim()
    const content = dataForm.get('body').toString().trim()
    const comment = await fetchAddComment(form.getAttribute('data-endpoint'), {
            name: name,
            email: email,
            body: content
        })
    // console.log(comment.content)
    whriteComments(comment.content)
    form.reset()
}
