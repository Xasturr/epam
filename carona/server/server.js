const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbconfig = require('./config/database');
const homeRouter = require('./routes/home');
const contactsRouter = require('./routes/contacts');
const carsRouter = require('./routes/cars');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/home', homeRouter);
app.use('/contacts', contactsRouter);
app.use('/cars', carsRouter);

const databaseUrl = dbconfig.DatabaseUrl;
const serverPort = dbconfig.ServerPort;
const conOptions = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(databaseUrl, conOptions)
    .then(() => console.log(`Database connected: ${databaseUrl}`))
    .then(() => app.listen(serverPort, () => console.log(`Listening on port ${serverPort}`)))
    .catch(err => console.log(`Error: ${err}`))