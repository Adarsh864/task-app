
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, text: 'Deploy project to Netlify', status: 'todo' },
    { id: 2, text: 'Celebrate!', status: 'todo' },
];
let nextId = 3;


router.get('/', (req, res) => res.json(tasks));
router.post('/', (req, res) => {
    const newTask = { id: nextId++, text: req.body.text, status: 'todo' };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
router.put('/:id/complete', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        task.status = 'done';
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});


app.use('/.netlify/functions/tasks', router);

module.exports.handler = serverless(app);