const mongoose = require('mongoose');
const validator = require('validator');
const InvalidError = require('../utils/invalidError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isUrl(value)) {
        throw new InvalidError('Неверная ссылка');
      }
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isUrl(value)) {
        throw new InvalidError('Неверная ссылка');
      }
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isUrl(value)) {
        throw new InvalidError('Неверная ссылка');
      }
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('card', movieSchema);
