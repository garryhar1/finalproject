function disTodo() {
    const tod = JSON.parse(localStorage.getItem('tod'))

    let list = ''

    if(tod){
        for (let i = 0; i < tod.length; i++) {
            list += `
            <ul class="list-group list-group-horizontal rounded-0 bg-transparent m-2">
                <li class="list-group-item d-flex align-items-center ps-0 pe- py-1 rounded-0 border-0 bg-transparent">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input me-0" value="" id=${tod[i].id} onchange="setComplete(checked,id)" aria-label="..." ${tod[i].checked ? 'checked': ''}/>
                </div>
                </li>
                <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                    <p class="lead fw-normal mb-0">${tod[i].name}</p>
                </li>
                <li class="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                    <button type="button" class="btn btn-danger" id=${tod[i].id} onclick="deleteTodo(id)">Delete</button>
                </li>
            </ul>
            `
        }
    }

    document.getElementById('todo').innerHTML= list
}

function submitTodo() {
    const todo = document.getElementById('tambah').value

    let tod = JSON.parse(localStorage.getItem('tod'))

    if(tod) {
        tod.push({
            id: tod[tod.length-1].id +1,
            name : todo,
            checked: false
        })
     } else{
        tod= [{
            id: 0,
            name: todo,
            checked: false
        }]
    }

    localStorage.setItem('tod', JSON.stringify(tod))

    document.getElementById('tambah').value= ''

    disTodo()
}


function setComplete(checked, id) {
    let tod= JSON.parse(localStorage.getItem('tod'))

    tod = tod.map(el => {
        if (el.id === Number(id)) {
            el.checked = checked
        }
        return el
    })
    
    localStorage.setItem('tod', JSON.stringify(tod))

    disTodo()
}

function deleteTodo(id) {
    let tod= JSON.parse(localStorage.getItem('tod'))

    tod = tod.filter(el => el.id !== Number(id))

    if (tod.length) {
        localStorage.setItem('tod', JSON.stringify(tod))
    }else{
        localStorage.removeItem('tod')
    }

    disTodo()
}
