document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    const API_URL = '/api'; // Netlify redirect handles this

    const renderTasks = async () => {
        const response = await fetch(`${API_URL}`);
        const tasks = await response.json();

        todoList.innerHTML = '';
        doneList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.textContent = task.text;

            if (task.status === 'todo') {
                const doneButton = document.createElement('button');
                doneButton.textContent = 'Done';
                doneButton.className = 'done-btn';
                doneButton.onclick = () => completeTask(task.id); 
                taskItem.appendChild(doneButton);
                todoList.appendChild(taskItem);
            } else {
                doneList.appendChild(taskItem);
            }
        });
    };

    const addTask = async () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        await fetch(`${API_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText }),
        });
        taskInput.value = '';
        renderTasks();
    };

    const completeTask = async (taskId) => {
        await fetch(`${API_URL}/${taskId}/complete`, { method: 'PUT' });
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    renderTasks();
});
