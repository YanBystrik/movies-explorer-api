const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const ErrorNotFound = require('./utils/errorNotFound');
const { requestLogger, errLogger } = require('./middlewares/logger');
const { PORT, DataMovies } = require('./utils/config');
require('dotenv').config();

const corsAllowed = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://movies-yan.nomoredomains.xyz',
  'https://movies-yan.nomoredomains.xyz',
];

const corsOptions = {
  origin: corsAllowed,
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT);

mongoose.connect(DataMovies, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(require('./routes/signin'));
app.use(require('./routes/signup'));

app.use(auth);

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use(require('./routes/signout'));

app.use((req, res, next) => {
  next(new ErrorNotFound('404 такой страницы нет'));
});

app.use(errLogger);

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
