import express from 'express';
const app = express();
import route from './server-settings/routes/route.js'


app.use(express.json());
app.use('/route', route);

app.get('/', (req, res) => {
    res.send('hello from express server');
  });

export default app;

