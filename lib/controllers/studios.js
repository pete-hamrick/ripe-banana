const { Router } = require('express');
const Studio = require('../models/Studio.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const studios = await Studio.getAll();
    res.send(studios);
  } catch (error) {
    next(error);
  }
});
