const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const AuthError = require('../utils/authError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
