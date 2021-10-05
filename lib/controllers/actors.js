const { Router } = require('express');
const Actor = require('../models/Actor.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const actor = await Actor.getAll();
      res.send(actor);
    } catch (error) {
      next(error);
    }
  });
