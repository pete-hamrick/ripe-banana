const { Router } = require('express');
const Film = require('../models/Film.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const film = await Film.getAll();
      res.send(film);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const film = await Film.getById(id);
      res.send(film);
    } catch (error) {
      next(error);
    }
  });

