const router = require('express').Router();

const {
  getUsers,
  getUser,
  postUser,
  patchUserName,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', postUser);

router.patch('/me', patchUserName);

router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
