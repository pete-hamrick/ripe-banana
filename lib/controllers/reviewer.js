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
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const updatedReviewer = await Reviewer.updateById({ id, ...updates });
      res.send(updatedReviewer);
    } catch (err) {
      next(err);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.insert(req.body);
      res.send(reviewer);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedReviewer = await Reviewer.remove(id);
      res.send(deletedReviewer);
    } catch(error){
      next(error);
    }
  });
