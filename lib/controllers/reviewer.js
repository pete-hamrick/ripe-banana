const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const reviewers = await Reviewer.getAll();
    res.send(reviewers);
  } catch (error) {
    next(error);
  }
});
