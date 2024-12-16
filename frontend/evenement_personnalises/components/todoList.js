import { cloneTemplate, createElement } from "../function/dom.js"

/**
 * @typedef {objet} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class ToDoList{

    /** @type {Todo[]} */
    #todos = []
    
    /** @type {HTMLUListElement} */
    #listeElements = []

    /**
     * @param {Todo[]} todos 
     */
    constructor(todos){
        this.#todos = todos
    }

    /**
     * @param {HTMLElement} element 
     */
    appendTo(element){
        element.append(cloneTemplate('todolist-layout'))
        
        this.#listeElements = element.querySelector('.list-group')
        for (let todo of this.#todos){
            const t = new TodoListItem(todo)
            this.#listeElements.append(t.element)
        }
        element.querySelector("form").addEventListener("submit", (e) => this.#onSubmit(e))
        element.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', (e) => this.#toggleFilter(e))
        })
        this.#listeElements.addEventListener('delete', ({detail: todo}) => {
            this.#todos = this.#todos.filter((t) => {
                return t !== todo
            })
            
        })

        this.#listeElements.addEventListener('toggle', ({detail: todo}) => {
            todo.completed = !todo.completed
            
        })
    
    }

    /**@param {SubmitEvent} e */
    #onSubmit (e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(form).get('title').toString().trim()
        if (title === '') {
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listeElements.prepend(item.element)
        form.reset()


    }

    /**
     * @param {PointerEvent} e 
     */
    #toggleFilter(e) {
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')
        if (filter === 'todo') {
            this.#listeElements.classList.add('hide-completed')
            this.#listeElements.classList.remove('hide-todo')
        }
        else if (filter === 'done') {
            this.#listeElements.classList.remove('hide-completed')
            this.#listeElements.classList.add('hide-todo')
        }
        else {
            this.#listeElements.classList.remove('hide-completed')
            this.#listeElements.classList.remove('hide-todo')
        }
    }
}

class TodoListItem {
    #element
    #todo

    /** @type(Todo) */
    constructor(todo) {
        this.#todo = todo
        const id = `todo-${todo.id}`
        const li = cloneTemplate('todolist-item').firstElementChild
        
        this.#element = li
        const checkbox = li.querySelector('input')
        checkbox.setAttribute('id', id)
        if (todo.completed) {
            checkbox.setAttribute('checked', '')
        }
        const label = li.querySelector('label')
    
        label.setAttribute('for', id)

        label.innerText = todo.title 

        const button = li.querySelector('button')
        
        button.innerHTML = '<i class="bi-trash"></i>'

        
        this.toggle(checkbox)

        button.addEventListener('click', (e) => this.remove(e))
        checkbox.addEventListener('change', (e) => this.toggle(e.currentTarget))

        this.#element.addEventListener('delete', (e) => {
            console.log(e.detail)
        })
        
    }

    /**
     * @return {HTMLElement}
     */
    get element () {
        return this.#element
    }

    
    /** @param {PointEvent} e*/
    remove (e) {
        e.preventDefault()
        // on cree un evenement personnalise 'delete'
        const event = new CustomEvent('delete', {
                        detail: this.#todo, // permet d'avoir les information de l'element
                        cancelable: true, // permet d'indiquer qu'un evenement peut etre annule grace a preventDefault
                        bubbles: true
                        })
        this.#element.dispatchEvent(event)
        // grace a cancelable, si y'a un preventDefault quand on appelle l'evenement, alors ca ne va pas effacer l'element
        if (event.defaultPrevented) {
            return
        }
        this.#element.remove()
    }

    /**
    * Change l'etat (a faire / fait) de la tache
    * @param {HTMLElement} checkbox 
    */
    toggle(checkbox) {
        if(checkbox.checked) {
            this.#element.classList.add('is-completed')
        }
        else {
            this.#element.classList.remove('is-completed')
        }
        const event = new CustomEvent('toggle', {
                            detail: this.#todo, // permet d'avoir les information de l'element
                            bubbles: true 

                        })
        this.#element.dispatchEvent(event)
    }
    
}