const express = require('express');
const app = express();
const documentsRouter = require('./routes/documentsRoute.js')
const nomenculaturesRouter = require('./routes/nomenculaturesRouter.js')

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello from express server');
});

app.use('/documents', documentsRouter);
app.use('/nomenculatures', nomenculaturesRouter);


module.exports = app