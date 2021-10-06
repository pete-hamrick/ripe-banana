const { Router } = require('express');
const Reviewer = require('../models/Reviewer.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const reviewers = await Reviewer.getAll();
      res.send(reviewers);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const reviewer = await Reviewer.getById(id);
      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  });
