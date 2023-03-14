const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
  about: Joi.string().min(2).max(30).default('Исследователь'),
  avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = mongoose.model('user', userSchema);
