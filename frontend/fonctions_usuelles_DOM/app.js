// POSITIONNEMENT

// const h1 = document.querySelector('h1')

// // fonction qui permet d'avoir la position d'un element par rapport a un autre
// console.log(h1.getBoundingClientRect())
// // les valeurs de y et x sont relatives par rapport a la fenetre

// // pour avoir la position par rapport a l'element parent
// console.log(`Position de l'element par rapport a son parent ${h1.offsetTop}, l'element parent en question ${h1.offsetParent}`)

// // fonction qui permet d'avoir le niveau de defilement de l'utilisteur

// console.log(window.scrollY)

// // pour trouver exactement a quel position est un element par rapport a Y

// console.log(`Position par rapport au haut ${window.scrollY + h1.getBoundingClientRect().y}, autre methode ${recursiveOffsetTop(h1)}`)

// // une autre approche, avec les boucles, on la prefere par que ca donne un solution exacte

// function recursiveOffsetTop(element) {
//     let top = 0
//     while (element.offsetParent) {
//         top += element.offsetTop
//         element = element.offsetParent
//     }
//     return top

// }

// // recuperons la position de la souris sur un div
// document.querySelector('div').addEventListener('mousemove', e => console.log(e))
// // la position de la souris par rapport a l'ecran avec screen y et x, par rapport a la page pagex et y

// RECUPERER ATTRIBUTS DATA
// const div = document.querySelector('div')
// console.log(div.dataset.user)
// div.dataset.hello = 'hello'
// console.log(div.dataset)

// ANNULER OU SUPPRIMER UN EVENEMENT AU BOUT D'UNE CERTAINE CONDITION

// const button = document.querySelector('button')
// let i = 0
// const listener = () => {
//     i++
//     console.log(button.dataset.user)
//     if (i === 3) {
//         button.removeEventListener('click', listener)
//     }
// }
// button.addEventListener('click', listener)

// ANIMATION

// const button = document.querySelector('button')
// button.animate([
//     {transform: 'translateY(0)'},
//     {transform: 'translateY(50px)'},
//     ],
//     {
//         duration: 1000,
//         iterations: 2, // c'est le nombre d'iteration, donc si on veut on peut preciser ca ou mettre Infinity
//         fill: 'both', // Dans quel posistion l'element va rester apres l'iteration
//     }
// )

// DEFOIS ON PEUT AVOIR BESOIN DE MASQUER UN ELEMENT EN FONCTION DE LA TAILLE DE L'ECRAN

// const button = document.querySelector('button')
// const mediaQuery = window.matchMedia('(min-height: 300px)')
// mediaQuery.addEventListener('change', () => console.log(mediaQuery.matches))

// RECUPER LES DIMENSSION D'UNE IMAGE

const img = document.querySelector('img')
img.addEventListener('load', () => console.log(`Dimension de la balise img: ${img.height}, vraie dimension de l'image ${img.naturalHeight}`))
