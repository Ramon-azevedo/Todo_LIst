const form_adicionar = document.getElementById('form_adicionar')
const edit_form = document.getElementById('edit_form')
const adcTarefa = document.getElementById('adcTarefa')
const todo_list = document.getElementById('todo_list')
const editTa = document.getElementById('editTa')

const buscarInput = document.getElementById('buscarInput');
const deleteBtn = document.getElementById('deleteBtn');
const selectFil = document.getElementById('selectFil')

const cancelar = document.getElementById('cancelar')

let oldInputValue;


const adicionar = (text, done = 0 , save = 1) => {
    const div = document.createElement('div');
    div.classList.add('todo');

    const h3 = document.createElement('h3');
    h3.innerText = text;

    div.appendChild(h3);

    const bot1 = document.createElement('button');
    bot1.classList.add('finish_todo');
    bot1.innerHTML = '<i class="fa-solid fa-check"></i>';
    div.appendChild(bot1);

    const bot2 = document.createElement('button');
    bot2.classList.add('edit_todo');
    bot2.innerHTML = '<i class="fa-solid fa-pen"></i>';
    div.appendChild(bot2);

    const bot3 = document.createElement('button');
    bot3.classList.add('remove_todo');
    bot3.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    div.appendChild(bot3);

    todo_list.appendChild(div);

    adcTarefa.focus();

    adcTarefa.value = ''


    if (done) {
        div.classList.add('done')
    }

    if (save) {
        saveTodoLocalStorage({text, done})
    }

    
}




form_adicionar.addEventListener('submit', (e) => {
    e.preventDefault();

    const addTa = adcTarefa.value;

    if (addTa) {
        adicionar(addTa)
    }
});

const toggleForms = () => {
    form_adicionar.classList.toggle('displayNone');
    todo_list.classList.toggle('displayNone');
    edit_form.classList.remove('apagar')
};


document.addEventListener('click', (e) => {
    const eleClick = e.target;

    const paiClick = eleClick.closest('div');

    let todoTitle;

    if (paiClick && paiClick.querySelector('h3')) {
        todoTitle = paiClick.querySelector('h3').innerText;
    }

    if (eleClick.classList.contains('finish_todo')) {
        paiClick.classList.toggle('done')
    }


    if (eleClick.classList.contains('remove_todo')) {
        paiClick.remove()
    }

    if (eleClick.classList.contains('edit_todo')) {
        toggleForms();

        editTa.value = todoTitle;
        oldInputValue = todoTitle;

        editTa.focus();
        
    }
});


cancelar.addEventListener('click' , (e) => {
    e.preventDefault();
    form_adicionar.classList.remove('displayNone');
    todo_list.classList.remove('displayNone');
    edit_form.classList.toggle('apagar')






});



const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}


edit_form.addEventListener('submit', (e) => {
    e.preventDefault();

    updateTodo(editTa.value);


    form_adicionar.classList.remove('displayNone');
    todo_list.classList.remove('displayNone');
    edit_form.classList.toggle('apagar')


});



const getSearchTodos = (search) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3').innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

        todo.style.display = 'flex';

        if (!todoTitle.includes(normalizedSearch)) {
            todo.style.display = 'none';
        }

    })
}

buscarInput.addEventListener('keyup', (e) => {
    const search = e.target.value;

    getSearchTodos(search)
});

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();

    buscarInput.value = '';

    buscarInput.dispatchEvent(new Event('keyup'));
});







const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll('.todo');

    switch (filterValue) {
        case 'all': 
            todos.forEach((todo) => todo.style.display = 'flex')
            break;

        case 'feats':
            todos.forEach((todo) => todo.classList.contains('done') ? todo.style.display = 'flex' : todo.style.display = 'none')
            break;

        case 'todo':
            todos.forEach((todo) => !todo.classList.contains('done') ? todo.style.display = 'flex' : todo.style.display = 'none')
            break;

        default :
            break;
    }
}












selectFil.addEventListener('change', (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
})




//Local Storage

const getTodosLocalStore = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    return todos;
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStore();

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}