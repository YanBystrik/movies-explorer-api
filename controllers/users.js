const User = require('../models/user');
const ErrorNotFound = require('../utils/errorNotFound');
const InvalidError = require('../utils/invalidError');

module.exports.getUserMe = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Нет пользователя с таким id');
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        let errorMessage = 'Переданны неверные данные: ';
        const errorValues = Object.values(err.errors);
        errorValues.forEach((errVal) => {
          if (typeof errVal === 'object') {
            errorMessage += `Ошибка в поле ${errVal.path}, `;
          }
        });
        next(new InvalidError(errorMessage));
      }
      next(err);
    });
};
