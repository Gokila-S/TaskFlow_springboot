document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    const apiUrl = 'http://localhost:8082/api/todos';

    // Fetch and display all todos
    async function fetchTodos() {
        try {
            const response = await fetch(apiUrl);
            const todos = await response.json();
            todoList.innerHTML = ''; // Clear existing list
            todos.forEach(todo => {
                addTodoToDOM(todo);
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    // Add a todo item to the DOM
    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        li.classList.add('fade-in'); // Add fade-in class for animation
        if (todo.completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = todo.task;
        span.addEventListener('click', () => toggleTodo(todo.id, !todo.completed));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the toggle event
            deleteTodo(todo.id);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // Add a new todo
    async function addTodo() {
        const task = todoInput.value.trim();
        if (task === '') return;

        const newTodo = {
            task: task,
            completed: false
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });
            const todo = await response.json();
            addTodoToDOM(todo);
            todoInput.value = '';
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    // Toggle todo completion status
    async function toggleTodo(id, completed) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed }),
            });
            if (response.ok) {
                // Find the li element and toggle its class
                const li = document.querySelector(`li[data-id='${id}']`);
                li.classList.toggle('completed');
                 // Update the local todo object state in the DOM element if needed
                const todoSpan = li.querySelector('span');
                const originalTask = todoSpan.textContent;
                const updatedTodo = await response.json(); // get the full updated object
                todoSpan.onclick = () => toggleTodo(id, !updatedTodo.completed); // Re-bind event with new state
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    // Delete a todo
    async function deleteTodo(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                document.querySelector(`li[data-id='${id}']`).remove();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Initial fetch
    fetchTodos();
});