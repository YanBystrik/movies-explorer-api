const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser, getUserMe,
} = require('../controllers/users');

const regExp = /\S+@\S+\.\S+/;

router.get('/users/me', getUserMe);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(regExp),
  }),
}), updateUser);

module.exports = router;
