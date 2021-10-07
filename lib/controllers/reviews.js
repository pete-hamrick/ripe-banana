const { Router } = require('express');
const Review = require('../models/Review.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const reviews = await Review.getAll();
      res.send(reviews);
    } catch (err) {
      next(err);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const reviews = await Review.insert(req.body);
      res.send(reviews);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedReview = await Review.deleteReview(id);
      res.send(deletedReview);
    } catch (err) {
      next(err);
    }
  });
