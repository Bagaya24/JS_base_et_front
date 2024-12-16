import { ToDoList } from "./components/todoList.js";
import { fetchJSON } from "./function/api.js";
import { createElement } from "./function/dom.js";

try {
    // on va se dire que par defaut, on n'a pas de taches a faire
    //const todos = await fetchJSON("https://jsonplaceholder.typicode.com/todos?_limit=5")

    // Alors une fois on a stocker nos taches sur le localstorage, on peut maintenant les recuperer
    // le localStorage sauvergade les donnees sur les noms de domaines meme si on a plusieurs onglet
    // le sessionStorage sauvergade les donnees sur l'ongles, donc si on a un autre onglets avec le meme noms de domaine
    // ca n'aura pas ses donnees
    const todosInStorage = localStorage.getItem('todos')?.toString()
    let todos = []
    if (todosInStorage) {
        todos = JSON.parse(todosInStorage)
    }
    
    const list = new ToDoList(todos)
    list.appendTo(document.querySelector('#todolist'))
    
} catch (e) {
    const alertElement = createElement('div',
        {
            class: 'alert alert-danger m-2',
            role: 'alert'
        }
    )
    alertElement.innerText = "Impossible de charger les elements"
    document.body.prepend(alertElement)
    console.error(e)

}
