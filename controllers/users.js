const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports.patchUserName = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  try {
    const newName = await User.findByIdAndUpdate(userId, { name }, { new: true });

    if (newName) {
      res.status(200).json(newName);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports.patchUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const newAvatar = await User.findByIdAndUpdate(userId, { avatar }, { new: true });

    if (newAvatar) {
      res.status(200).json(newAvatar);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
