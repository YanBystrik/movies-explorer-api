const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/createUser');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(/\S+@\S+\.\S+/),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = router;
