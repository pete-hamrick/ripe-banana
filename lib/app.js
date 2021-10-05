const express = require('express');

const app = express();

app.use(express.json());

app.use('/reviewer', require('./controllers/reviewer.js'));
app.use('/studios', require('./controllers/studios.js'));
app.use('/actors', require('./controllers/actors.js'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
