const InvalidError = require('../utils/invalidError');

module.exports.logout = (req, res) => {
  if (req.cookie.includes('jwt')) {
    res
      .clearCookie('jwt')
      .send('Уже уходите? Возвращайте скорее :)');
  } else {
    throw new InvalidError('Кажется, вы уже вышли');
  }
};
