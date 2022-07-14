const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/(www\.)?[^@]{1,256}\.[a-z0-9()]{1,6}\b([^@]*)/i),
    trailerLink: Joi.string().required().pattern(/https?:\/\/(www\.)?[^@]{1,256}\.[a-z0-9()]{1,6}\b([^@]*)/i),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(/https?:\/\/(www\.)?[^@]{1,256}\.[a-z0-9()]{1,6}\b([^@]*)/i),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
}), deleteMovie);

module.exports = router;
