const ratio = .6
let observer = null
/**
 * 
 * @param {HTMLElement} element 
 */
const activate = function (element) {
    const id = element.getAttribute('id')
    const anchor = document.querySelector(`a[href="#${id}"]`)
    if (anchor === null) {
        return
    }
    anchor.parentElement.querySelectorAll('.active').forEach((node) => {
        node.classList.remove('active')
    })
    anchor.classList.add('active')
}

/**
 * 
 * @param {IntersectionObserverEntry} entries 
 * @param {IntersectionObserver} observer 
 */
const callback = function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            activate(entry.target)
        }
    })
}


const spies = document.querySelectorAll('[data-spy]')
/**
 * 
 * @param {NodeList.<HTMLElement>} elements 
 */
const scrollSpy = function(elements) {
    if (observer !== null) {
        elements.forEach(element => observer.unobserve(element))
    }
    const y = Math.round(window.innerHeight * ratio)
    observer = new IntersectionObserver(callback, {
        rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
    })
    spies.forEach((spy) => {
        observer.observe(spy)
    })
}

if (spies.length > 0) {
    scrollSpy(spies)
    let windowH = window.innerHeight
    window.addEventListener('resize', () => {
        if (windowH !== window.innerHeight){
            scrollSpy(spies)
            console.log('test')
            windowH = window.innerHeight
        }
        
    })
}