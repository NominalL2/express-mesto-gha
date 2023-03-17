const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/^(http|https):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?)?$/),
    owner: Joi.ref('User'),
    likes: Joi.array().items(Joi.string().hex().length(24).required()),
    createdAt: Joi.date(),
  }),
}), postCard);

router.delete('/:cardId', celebrate({
  params: Joi.string().length(24).hex(),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.string().length(24).hex(),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.string().length(24).hex(),
}), dislikeCard);

module.exports = router;
