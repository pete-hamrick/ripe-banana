const { Router } = require('express');
const Review = require('../models/Review.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const reviews = await Review.getAll();
    res.send(reviews);
  } catch (err) {
    next(err);
  }
});
