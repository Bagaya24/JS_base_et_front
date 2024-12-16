// const observer = new IntersectionObserver((entries) => {
//     for (let entry of entries) {
//         console.log(
//             entry.target, // permet d'obtenir l'element actuelle
//             entry.isIntersecting, // permet de savoir si l'element est visible ou pas
//         )
//     }
// })

// Imaginons que l'on veut faire une animation quand on detecte un element,  on fera comme suit
const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            // entry.target.classList.add('is-visible')
            entry.target.animate([
                {transform: 'translate(-30px)', opacity: 0},
                {transform: 'translate(0px)', opacity: 1},
            ],
            {
                duration: 500
            }
        )
        observer.unobserve(entry.target) // c'est pour l'observation ne sa fasse qu'une seule fois
        }
    }
}
// ,{
//     rootMargin: '50px 50px 50px 50px', // permet d'agrandir la zone a partir du quel l'element sera detecter comme visible
//     threshold: 0.1, // permet de dectecter a quel pourcentage on peut considerer que l'element est visible
// }
)

// C'est qu'on peut aussi faire, ca sera de detecter quand un attend a un certain element, faire une requete fetch
// qui va amener plus de textes, c'est qui peut creer un effet de scroll infinie

observer.observe(document.querySelector('.btn1'))
observer.observe(document.querySelector('.btn2'))