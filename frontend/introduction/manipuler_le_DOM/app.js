/*// pour acceder a un element
console.log(document.querySelector("#hello"))
// pour selectionner plusieurs elements du meme type, on aura un objet qui ressemble a un tableau mais qui ne pas totalement un tableau
const lis = document.querySelectorAll('li')
console.log(lis[1])
// si on veut transfomer l'objet qu'on obtient en tableau, on fait comme suit
// Array.from(lis)
// querySelector ou querySelectorAll fonctionnent comme le selecteur CSS, donc on peut y passer de truc plus specifique si on veut
const firstLi = document.querySelectorAll('ul > li:first-child')
console.log(firstLi)
*/
const ul = document.querySelector('ul')
/*console.log(
    ul.nodeName,
    ul.innerHTML,// on recupure la structure du ul en HTML en affichant que ce que l'utilisateur peut voir
    ul.innerText,// on recupure la structure du ul en texte pas formater
    ul.textContent, // on recupure le structure du ul en text bien formater en affichant ce que meme le hidden
)
// le innerHTML peut etre modifier
ul.innerHTML = 'Hello'
*/
// on peut augmenter , recuperer ou retirer un attribut d'un element HTML
/*
ul.setAttribute('hidden', 'hidden')
ul.removeAttribute('hidden')
console.log(ul.getAttribute('class'))
// on peut modifier une classe aussi
//console.log(ul.classList.remove('red')) // ici on retire juste la classe red mais si cette classe avait un autre element, cette element va rester
setInterval(() => {
    ul.classList.toggle('red') // toggle retire une classe si ca existe et l'augmente sinon
}, 2000)
*/
// on peut aussi modifier le style d'un element

// ul.style.color = "blue"
// ul.style.fontWeight = "bold"

// Creons un element
// const newli = document.createElement('li')
// newli.innerHTML = "Bonjour le monde"
// document.querySelector('ul').appendChild(newli) // on peut aussi utiliser append() ou juste prepend() pour augmenter un element au debut
// const div = document.createElement('div')
// div.innerHTML = "Hello world"
// document.querySelector('ul').insertAdjacentElement('afterend', div)

// On peut recuperer des elements enfants par l'element parent
// console.log(
//     ul.firstElementChild
// )

// On peut recuperer l'element parent par l'element enfant
const li = document.querySelector('ul li')
// console.log(
//     li.parentElement
// )

// On peut verifier si un element contient un autre element
console.log(ul.contains(li))
