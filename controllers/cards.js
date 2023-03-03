const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const deleteCard = await Card.findByIdAndRemove(cardId);

    if (!deleteCard) {
      res.status(404).json({ message: 'Карточка не найдена' });
    } else {
      res.json({ message: 'Карточка успешно удалена' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
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
      res.status(404).json({ message: 'Карточка не найдена' });
    } else {
      res.status(200).json(like);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
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
      res.status(404).json({ message: 'Карточка не найдена' });
    } else {
      res.status(200).json(dislike);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
