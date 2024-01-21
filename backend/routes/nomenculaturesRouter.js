const express = require('express')
const app = express()
const nomenculaturesRepository = require ("./dbRepository/nomenculaturesRepository.js");

// const router = Router();


app.get('/', async (req, res) => {
    const result = await nomenculaturesRepository.getAll();
    res.json(result)
})

// app.get('/:id', async (req, res) => {
//     const result = await nomenculaturesRepository.findOne(+req.params.id);

//     res.json(result)
// })

// app.put('/:id', async (req, res) => {
//     const result = await nomenculaturesRepository.updateOne(+req.params.id, req.body);

//     res.json(result)
// })

// app.delete('/:id', async (req, res) => {
//     const result = await nomenculaturesRepository.deleteOne(+req.params.id);

//     res.json(result)
// })

module.exports = app;