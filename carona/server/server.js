const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbconfig = require('./config/database');
const homeRouter = require('./routes/home');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/home', homeRouter);

const databaseUrl = dbconfig.DatabaseUrl;
const serverPort = dbconfig.ServerPort;
const conOptions = { useNewUrlParser: true }

mongoose.connect(databaseUrl, conOptions)
    .then(() => console.log(`Database connected: ${databaseUrl}`))
    .then(() => app.listen(serverPort, () => console.log(`Listening on port ${serverPort}`)))
    .catch(err => console.log(`Error: ${err}`))

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/api/world', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

//app.listen(port, () => console.log(`Listening on port ${port}`));