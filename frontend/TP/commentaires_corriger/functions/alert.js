/**
 * 
 * @param {string} message 
 * @return {HTMLElement}
 */
export const alertElement = function(message) {
    /** @type {HTMLElement} */
    const element= document.querySelector('#alert').content.firstElementChild.cloneNode(true)
    element.querySelector('.js-text').innerText = message
    element.querySelector('button').addEventListener('click', e => {
        e.preventDefault()
        element.remove()
        element.dispatchEvent(new CustomEvent('close'))
    })
    return element

}