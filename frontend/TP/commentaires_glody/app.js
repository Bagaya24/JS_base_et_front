
import { addComments, getComments, onSubmit } from "./function/DOM.js"

const spinner = document.querySelector(".spinner-border")


const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            const comments = getComments()
            comments.then((data) => addComments(data))
        }
    }
})

observer.observe(spinner)

document.querySelector('form').addEventListener('submit', (e) => onSubmit(e))
