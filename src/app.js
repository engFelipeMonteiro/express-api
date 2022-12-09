const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { notFound, errorHandler } = require('./middlewares');

const app = express();

require('dotenv').config();
// secure
// app.use(helmet());
// log
// app.use(morgan('dev'));
app.use(bodyParser.json());

//const employees = require('./routes/employees');
//app.use('/api/employees', employees);

const Usedcar = require('./routes/cars');
app.use('/api/cars', Usedcar);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
