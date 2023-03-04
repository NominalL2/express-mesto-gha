const Card = require('../models/card');
const { errorCode, errorNotFoundCode, errorIncorrectCode } = require('../errors');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(errorCode).json({ message: 'Произошла ошибка' });
  }
};

module.exports.postCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  const card = new Card({ name, link, owner });

  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errorIncorrectCode).json({ message: 'ValidationError' });
    } else {
      res.status(errorCode).json({ message: 'Произошла ошибка' });
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const deleteCard = await Card.findByIdAndRemove(cardId);

    if (!deleteCard) {
      res.status(errorNotFoundCode).json({ message: 'Карточка не найдена' });
    } else {
      res.json({ message: 'Карточка успешно удалена' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errorIncorrectCode).json({ message: 'Некорректный Id' });
    } else {
      res.status(errorCode).json({ message: 'Произошла ошибка' });
    }
  }
};

module.exports.likeCard = async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const like = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!like) {
      res.status(errorNotFoundCode).json({ message: 'Карточка не найдена' });
    } else {
      res.json(like);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errorIncorrectCode).json({ message: 'Некорректный Id' });
    } else {
      res.status(errorCode).json({ message: 'Произошла ошибка' });
    }
  }
};

module.exports.dislikeCard = async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const dislike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );

    if (!dislike) {
      res.status(errorNotFoundCode).json({ message: 'Карточка не найдена' });
    } else {
      res.json(dislike);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errorIncorrectCode).json({ message: 'Некорректный Id' });
    } else {
      res.status(errorCode).json({ message: 'Произошла ошибка' });
    }
  }
};
