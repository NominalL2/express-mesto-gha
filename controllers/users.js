const User = require('../models/user');
const { errorCode, errorNotFoundCode, errorIncorrectCode } = require('../errors');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(errorCode).json({ message: 'Произошла ошибка' });
  }
};

module.exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(errorNotFoundCode).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errorIncorrectCode).json({ message: 'Некорректный Id' });
    } else {
      res.status(errorCode).json({ message: 'Произошла ошибка' });
    }
  }
};

module.exports.postUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  const user = new User({ name, about, avatar });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errorIncorrectCode).json({ message: 'ValidationError' });
    } else {
      res.status(errorCode).json({ message: 'Произошла ошибка' });
    }
  }
};

module.exports.patchUser = async (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const newName = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (newName) {
      res.status(200).json(newName);
    } else {
      res.status(errorNotFoundCode).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errorIncorrectCode).json({ message: 'ValidationError' });
    } else {
      res.status(errorCode).json({ message: 'Произошла ошибка' });
    }
  }
};

module.exports.patchUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const newAvatar = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (newAvatar) {
      res.status(200).json(newAvatar);
    } else {
      res.status(errorNotFoundCode).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errorIncorrectCode).json({ message: 'ValidationError' });
    } else {
      res.status(errorCode).json({ message: 'Произошла ошибка' });
    }
  }
};
