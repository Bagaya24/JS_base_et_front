/** Permet d'ajouter la navigation tactile pour le carousel */
class CarouselTouchPlugin {
    /**
     * 
     * @param {Carousel} carousel 
     */
    constructor(carousel) {
        carousel.panorama.addEventListener('dragstart', e => e.preventDefault())
        carousel.panorama.addEventListener('mousedown', this.startDrag.bind(this))
        carousel.panorama.addEventListener('touchstart', this.startDrag.bind(this))
        window.addEventListener('mousemove', this.drag.bind(this))
        window.addEventListener('touchmove', this.drag.bind(this))
        window.addEventListener('touchend', this.endDrag.bind(this))
        window.addEventListener("mouseup", this.endDrag.bind(this))
        window.addEventListener('touchcancel', this.endDrag.bind(this))
        this.carousel = carousel
        
    }
    /**
     * Demarre le deplacement au touche
     * @param {MouseEvent | TouchEvent} e 
     */
    startDrag (e) {
        if (e.touches) {
            if (e.touches.length > 1) {
                return
            }
            else {
                e = e.touches[0]
            }
        }
        this.origin = {x: e.screenX, y:e.screenY}
        this.width = this.carousel.containerWidth
        this.carousel.disableTransition()
        console.log("Huummm")

    }

    /**
     * deplacement de la souris 
     * @param {MouseEvent | TouchEvent} e 
     */
    drag(e) {
        if(this.origin) {
            let point = e.touches ? e.touches[0] : e
            let translate = {x: point.screenX - this.origin.x, y: point.screenY - this.origin.y}
            if(e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
                e.preventDefault()
                e.stopPropagation()
            }
            let baseTranslate = this.carousel.currentItem * -100 / this.carousel.items.length
            this.lastTranslate = translate
            this.carousel.translate(baseTranslate + 100 * translate.x / this.width)
        }

    }

    /**
     * fin du deplacement de la souris 
     * @param {MouseEvent | TouchEvent} e 
     */
    endDrag(e) {
        if(this.origin && this.lastTranslate) {
            this.carousel.enableTransition()
            if(Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2) {
                if(this.lastTranslate.x < 0) {
                    this.carousel.next()
                }
                else {
                    this.carousel.prev()
                }
            }
            else {
                this.carousel.gotTo(this.carousel.currentItem)
            }

        }
        this.origin = null
    }   
}

class Carousel {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {number} options.slidesToScroll nombre d'elements a faire defiler 
     * @param {number} options.slidesVisible nombre d'elements visible dans un slide
     * @param {boolean} options.loop=false doit-t-on boucler en fin de slides
     * @param {boolean} options.pagination=false 
     * @param {boolean} options.navigation=true
     * @param {boolean} options.infinite=false
     */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false,
            pagination: false, 
            navigation: true,
            infinite: false
        }, options)

        if(this.options.loop && this.options.infinite) {
            throw new Error("Un cqrousel ne peut etre a la fois en boucle et en infinite");
            
        }

        // permet de recuperer les elements qu'au moment ou la page se charge
        const children = [].slice.call(element.children)

        
        this.root = this.createDivWithClass('carousel')
        this.panorama = this.createDivWithClass('carousel__container')
        this.currentItem = 0
        this.moveCallbacks = []
        this.isMobile = false
        this.offset = 0
        // cette attribut permet de naviguer sur une page avec la tabulation
        this.root.setAttribute('tabindex', '0')
        this.root.append(this.panorama)
        this.element.append(this.root)

        // ici on peut supposer qu'on deplace les elements de la div carousel1 a la div carousel__container
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.append(child)
            this.panorama.append(item)
            return item
        })
        if(this.options.infinite) {
            this.offset = this.getSlidesVisible() * 2 - 1
            if(this.offset > children.length) {
                console.error(`Vous n'avez pas asser d'elements dans le carousel ${element}`)
            }
            this.items = [
                 ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
                 ...this.items,
                 ...this.items.slice(0, this.offset).map(item => item.cloneNode(true))
                ]
            this.gotTo(this.offset, false)
        }
        this.items.forEach(item => this.panorama.append(item))
        this.setStyle()
        if (this.options.navigation === true) {
            this.createNavigation()
        }
        if (this.options.pagination === true) {
            this.createPagination()
        }
        
        

        // Evenement

        this.moveCallbacks.forEach(callback => callback(this.currentItem))
        this.resizeWindows()
        window.addEventListener('resize', this.resizeWindows.bind(this))
        this.root.addEventListener('keyup', (e) => {
            if (e.key == 'ArrowRight'){
                this.next()
            }
            else if (e.key === 'ArrowLeft') {
                this.prev()
            }
        })
        if(this.options.infinite){
            this.panorama.addEventListener('transitionend', this.resetInfinite.bind(this))
        }

        new CarouselTouchPlugin(this)
        
        
    }


    /**
     * 
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    /** Applique les bonnes dimensions aux elements du carousel */
    setStyle() {
        let ratio = this.items.length / this.getSlidesVisible()
        this.panorama.style.width = (ratio * 100) + '%'
        this.items.forEach(item => item.style.width = ((100 / this.getSlidesVisible()) / ratio) + '%')

    }

    /** Cree les fleches de navigation */
    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.append(nextButton)
        this.root.append(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        if(this.options.loop === true) {
            return
        }
        this.onMove(index => {
            if(index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            }
            else {
                prevButton.classList.remove('carousel__prev--hidden')
            }

            if (this.items[this.currentItem + this.getSlidesVisible()] === undefined) {
                nextButton.classList.add('carousel__next--hidden')
            }
            else {
                nextButton.classList.remove('carousel__next--hidden')
            }
                
        })

    }

    createPagination() {
        let pagination = this.createDivWithClass("carousel__pagination")
        let buttons = []
        this.root.append(pagination)
        for (let i = 0; i < (this.items.length - 2 * this.offset); i += this.getSlidesToScroll()) {
            let button = this.createDivWithClass('carousel__pagination__button')
            button.addEventListener('click', () => this.gotTo(i + this.offset))
            pagination.append(button)
            buttons.push(button)
        }
        this.onMove(index => {
            let count = this.items.length - 2 * this.offset 
            let activateButton = buttons[Math.floor(((index - this.offset) % count) / this.getSlidesToScroll())]
            if(activateButton) {
                buttons.forEach(button => button.classList.remove('carousel__pagination__button--active'))
                activateButton.classList.add('carousel__pagination__button--active')
            }
        })
            
    }

    disableTransition() {
        this.panorama.style.transition = 'none'
    }

    enableTransition() {
        this.panorama.style.transition = ''
    }

    next() {
        
        this.gotTo(this.currentItem + this.getSlidesToScroll())
    }

    prev() {
        this.gotTo(this.currentItem - this.getSlidesToScroll())
    }

    /**
     * Ca deplace le carousel vers l'element cible
     * @param {number} index 
     * @param {boolean} animation=true 
     */
    gotTo(index, animation=true) {
        if(index < 0) {
            if(this.options.loop) {
                index = this.items.length - this.getSlidesVisible()
            }
            else{
                return
            }
            
        }
        else if(index >= this.items.length || (this.items[this.currentItem + this.getSlidesVisible()] === undefined) && index > this.currentItem) {
            if(this.options.loop) {
                index = 0
            }
            else{
                return
            }
            
        }
        let translateX = index * -100/ this.items.length
        if (!animation) {
            this.disableTransition()
        }
        this.translate(translateX)
        this.panorama.offsetHeight // force le navigateur a faire un repaint
        if (!animation) {
            this.enableTransition()
        }
        this.currentItem = index
        this.moveCallbacks.forEach(callback => callback(index))
    }

    /** Deplacer le panorama pour donner l'impression d'un slide infini */
    resetInfinite() {
        if(this.currentItem <= this.getSlidesToScroll()) {
            this.gotTo(this.currentItem + (this.items.length - 2 * this.offset), false)
        }
        else if(this.currentItem >= this.items.length - this.offset) {
            this.gotTo(this.currentItem - (this.items.length - 2 * this.offset), false)
        }
    }

    
    onMove(callback) {
        this.moveCallbacks.push(callback)
    }

    resizeWindows() {
        let mobile = window.innerWidth < 800
        if(mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
        }
    }

    translate(percent) {
        this.panorama.style.transform = `translate3d(${percent}% , 0, 0)`
    }

    /**
     * 
     * @returns {number}
     */
    getSlidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }

    /**
     * 
     * @returns {number}
     */
    getSlidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible
    }

    /**
     * @returns {number}
     */
    get containerWidth() {
        return this.panorama.offsetHeight
    }
    
    /**
     * @returns {number}
     */
    get carouselWidth() {
        return this.root.offsetWidth
    }


}

// pour attendre le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    new Carousel(document.querySelector('#carousel0'),{
        slidesToScroll: 2,
        slidesVisible: 2,
        loop: true
    })

    new Carousel(document.querySelector('#carousel2'),{
        slidesToScroll: 1,
        slidesVisible: 3,
    })

    new Carousel(document.querySelector('#carousel1'),{
        slidesToScroll: 2,
        slidesVisible: 2,
        infinite: true,
        pagination: true
    })
    new Carousel(document.querySelector('#carousel3'),{
        slidesToScroll: 2,
        slidesVisible: 3,
        pagination: true,
        loop: true
    })
})

