const tbody = document.querySelector('tbody')

const ajoutSurTableau = function(id, name) {
    const tr = document.createElement('tr')
    const tdid = document.createElement('td')
    const tdnom = document.createElement('td')
    const tdbutton = document.createElement('td')
    const button = document.createElement('button')
    button.innerText = "action"

    tdid.append(id)
    tdnom.append(name)
    tdbutton.append(button)

    tr.append(tdid)
    tr.append(tdnom)
    tr.append(button)

    tbody.prepend(tr)


}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const id = data.get('id')
    const name = data.get('nom')
    ajoutSurTableau(id, name)
})