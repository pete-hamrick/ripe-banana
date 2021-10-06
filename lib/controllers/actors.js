const { Router } = require('express');
const Actor = require('../models/Actor.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const actors = await Actor.getAll();
      res.send(actors);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const actor = await Actor.getById(id);
      res.send(actor);
    } catch (err) {
      next(err);
    }
  });
