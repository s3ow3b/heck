
hbdsflHSVLFjds
SDbsjdfl
';k;ksjdbcSDB  
  A'DSD ;FLH K 
  SF /SDF LL/SAKJDF  a /;'' ;LHSF; SF  SDF'


 'OSJF; LAS'DF  SA'DF ASD/';'
   const API_URL = 'http://localhost:3000/todos';
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Load todos
async function loadTodos() {
    try {
        const res = await fetch(API_URL);
        todos = await res.json();
    } catch (e) {
        console.log('Using localStorage');
    }
    render();
}

function render() {
    localStorage.setItem('todos', JSON.stringify(todos));
    todoList.innerHTML = todos.map((todo, i) => `
        <li>${todo.text} <button class="delete" onclick="deleteTodo(${i})">Delete</button></li>
    `).join('');
}

async function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text})
        });
        todoInput.value = '';
        loadTodos();
    } catch (e) {
        todos.push({text});
        todoInput.value = '';
        render();
    }
}

async function deleteTodo(i) {
    try {
        await fetch(`${API_URL}/${i}`, {method: 'DELETE'});
        loadTodos();
    } catch (e) {
        todos.splice(i, 1);
        render();
    }
}

loadTodos();
