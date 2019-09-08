import express from 'express';
import bodyParser from 'body-parser';

<<<<<<< HEAD
import { SERVER_OK, PORT } from './constants';
import apiRouter from './routers';

let app = express();

let db = {
  tasks: [
    {
      id: 1,
      name: 'masak nasi',
    },
    {
      id: 2,
      name: 'masak air',
    },
  ],
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(SERVER_OK);
  res.send('Accessing server back-end success!');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`App is listening on http://127.0.0.1:${PORT}`);
=======
let app = express();

let db = {
  tasks: [
    {
      id: 1,
      name: 'masak nasi',
    },
    {
      id: 2,
      name: 'masak air',
    },
  ],
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('success');
});

app.get('/task/', (req, res) => {
  res.json(db.tasks);
});

app.get('/task/:id', (req, res) => {
  let id = req.params.id;
  for (let i = 0; i < db.tasks.length; i++) {
    if (db.tasks[i].id === Number(id)) {
      res.json(db.tasks[i]);
    }
  }
});

app.post('/task', (req, res) => {
  let body = req.body;

  res.json(body);
  db.tasks.push(body);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
>>>>>>> 763092422e4417be4c3a2ed42d9e30834ec78d3c
});
