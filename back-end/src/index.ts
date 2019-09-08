import express from 'express';
import bodyParser from 'body-parser';

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
});
