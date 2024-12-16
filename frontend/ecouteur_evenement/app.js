// const button = document.querySelector('button')
// // Pour que un boutton fasse une action quand o y clique, on fait button.addEventListener, on precise que c'est un click
// // puis en deuxieme argument, on passe une fonction, sur cette fonction, on peut y passer comme argument un event qui sera
// // un pointerEvent
// //
// button.addEventListener('click', (e) => {
//     console.log(e)
//     console.log(target) // target va nous donner l'element sur lequel on a veritablement cliquer, par exemple si on va 
//     // <button><spane>Bonjour</span></button>, target va nous retourner <span>Bonjour</span>
//     console.log(e.currentTarget) // currentTarget va nous retourner tout l'element, donc <button><span>Bonjour...

// })

// Pour mieux comprendre c'est qu'on vient de voir, disons qu'on a deux boutons

// /**
//  * 
//  * @param {PointerEvent} e 
//  */
// const onButtonClick = function (e) {
//     console.log(e.currentTarget)
//     console.log(this) // this equivaut a e.currentTarget
//     e.preventDefault() // permet d'empecher le comportement par defaut d'un element
// }

// document.querySelectorAll('button').forEach((button) => {
//     button.addEventListener('click', onButtonClick)
// })
// avec cette exemple, quand on clique sur un boutton en particulier, on obtient precisement ces informations


// Dans cette exemple il faut tout d'abord savoir que quand on click sur un element, le addEventListener verifie si l'element sur le quel on
// a clique a un evenement en particulier a faire puis si ces elements parents ont aussi des evenement en particulier a faire

// /**
//  * 
//  * @param {PointerEvent} e 
//  */
// const onButtonClick = function (e) {
//     console.log(e.offsetX)
//     console.log('button click')
//     e.preventDefault()
//     e.stopPropagation() // cette methode stop la propagation de la addEventListener pourque ca se limite sur le bouton seulement
    
    
// }

// document.querySelectorAll('button').forEach((button) => {
//     button.addEventListener('click', onButtonClick)
// })

// document.querySelector('div').addEventListener('click', (e) => {
//     console.log('click div')
// })

// Regardons le 3eme parametre de notre addEventListener

// /**
//  * 
//  * @param {PointerEvent} e 
//  */
// const onButtonClick = function (e) {
//     console.log(e.offsetX)
//     console.log('button click')
  
    
// }

// document.querySelectorAll('button').forEach((button) => {
//     button.addEventListener('click', onButtonClick, {
//         once: true, // Ca permet d'executer la fonction qu'une fois, quand on clique pour la premiere fois sur l'element
//         capture: true // Ca permet d'executer l'addEventListener de l'element parent avant d'executer celui de l'element qu'on clique
//     })
// })

// document.querySelector('div').addEventListener('click', () => {
//     console.log('click div')
// })

// Form

// document.querySelector("form").addEventListener('submit', (e) => {
//     e.preventDefault()
//     const form = e.currentTarget
//     const data = new FormData(form)
//     console.log(data.get('firstname')) // Apres avoir instacient la classe FormData, on peut recuperer les donnes d'un input qui se trouve dans le forme grace a get('name')

// })

// // Input 
// document.querySelector('input').addEventListener('change', (e) => {
//     // change en premier parametre permet d'executer la fonction que si le curseur est sorti du champ
//     // input en premier parametre permet d'executer la fonction quand on ecrit sur le champ
//     // keydown qui ne marche pas qu'avec les input permet de detecter sur quelle touche on clique
//     // focus permet d'appeler la fonction quand on est focus sur un element
//     // blur permet d'appeler une fonction quand on etait focus sur un element puis on y quitte
//     console.log(e.currentTarget.value)
// })

// // Exemple de keydown qui nous sert de racourci, donc si on clique crt+k, alors on affiche un alert sur la page

// document.addEventListener('keydown', (e) => {
//     if (e.ctrlKey === true && e.key === 'k'){
//         e.preventDefault()
//         alert("Hello world")
//     }
// })

// Checkbox

// document.querySelector('input').addEventListener('change', (e) => {
//     console.log(e.currentTarget.checked)
// })

// Select
// document.querySelector('select').addEventListener('change', (e) => {
    
//     console.log(
//         Array.from(e.currentTarget.selectedOptions).map((option) => {
//             option.value
//         })
//     )
// })

// Exercice 
document.querySelectorAll('.spoiler').forEach((span) => {
    span.addEventListener('click', (e) => {
        e.currentTarget.classList.remove('spoiler')
    })
})
