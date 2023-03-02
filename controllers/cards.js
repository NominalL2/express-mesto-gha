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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};
