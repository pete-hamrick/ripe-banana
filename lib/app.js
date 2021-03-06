const express = require('express');

const app = express();

app.use(express.json());

app.use('/reviewers', require('./controllers/reviewer.js'));
app.use('/studios', require('./controllers/studios.js'));
app.use('/actors', require('./controllers/actors.js'));
app.use('/films', require('./controllers/films.js'));
app.use('/reviews', require('./controllers/reviews.js'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
