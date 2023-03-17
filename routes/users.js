const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  patchUser,
  getMe,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^(http|https):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?)?$/),
  }),
}), patchUserAvatar);

router.get('/:userId', celebrate({
  params: Joi.string().length(24).hex(),
}), getUser);

module.exports = router;
