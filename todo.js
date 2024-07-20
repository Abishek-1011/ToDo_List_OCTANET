
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

let editingTodo = null;

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleButtonClick);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();

    if (editingTodo) {
       
        editingTodo.querySelector('.todo-item').innerText = todoInput.value;
        todoInput.value = '';
        editingTodo = null;
    } else {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todoInput.value;
        todoDiv.appendChild(newTodo);

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        todoDiv.appendChild(editButton);

        const completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        todoInput.value = '';
    }
}

function handleButtonClick(e) {
    const item = e.target;
    const todo = item.parentElement;

    if (item.classList.contains('trash-btn')) {
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    } else if (item.classList.contains('complete-btn')) {
        todo.classList.toggle('completed');
    } else if (item.classList.contains('edit-btn')) {
        startEditing(todo);
    }
}

function startEditing(todo) {
    editingTodo = todo;
    todoInput.value = todo.querySelector('.todo-item').innerText;
    todoInput.focus();
}

function filterTodo(e) {
    const todos = Array.from(todoList.children);

    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                todo.style.display = todo.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'uncompleted':
                todo.style.display = !todo.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
}
