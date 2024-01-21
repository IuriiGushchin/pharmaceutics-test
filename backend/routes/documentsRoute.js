const express = require('express')
const app = express()
const todoRepository = require ("./dbRepository/nomenculaturesRepository.js");

// const router = Router();

app.post('/', async (req, res) => {
    const result = await todoRepository.findAll();
    res.status(201).json(result)
})

app.get('/', async (req, res) => {
    console.log(process.env.DB_HOST,process.env.DB_PORT,process.env.DB_USER,process.env.DB_PASSWORD,process.env.DB_NAME )

    const result = await todoRepository.getAll();

    res.json(result)
})

app.get('/:id', async (req, res) => {
    const result = await todoRepository.findOne(+req.params.id);

    res.json(result)
})

app.put('/:id', async (req, res) => {
    const result = await todoRepository.updateOne(+req.params.id, req.body);

    res.json(result)
})

app.delete('/:id', async (req, res) => {
    const result = await todoRepository.deleteOne(+req.params.id);

    res.json(result)
})

module.exports = app;