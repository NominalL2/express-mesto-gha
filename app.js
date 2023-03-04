const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errorNotFoundCode } = require('./errors');

const router = express.Router();

const { PORT = '3000' } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63ff8c1d4556462e4936a88a',
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use(router.use('*', (req, res) => {
  res.status(errorNotFoundCode).json({ message: 'Not Found' });
}));

app.listen(PORT);
