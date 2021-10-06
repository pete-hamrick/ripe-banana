const { Router } = require('express');
const Studio = require('../models/Studio.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const studios = await Studio.getAll();
      res.send(studios);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const studio = await Studio.getById(id);
      res.send(studio);
    } catch (err) {
      next(err);
    }
  });
