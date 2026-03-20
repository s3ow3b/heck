const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({error: 'Text required'});
    todos.push({ text });
    res.status(201).json({text});
});

app.delete('/todos/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= todos.length) {
        return res.status(404).json({error: 'Todo not found'});
    }
    todos.splice(index, 1);
    res.json({success: true});
});

app.listen(PORT, () => {
    console.log(`Todo API running on http://localhost:${PORT}`);
});
