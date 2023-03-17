const router = require('express').Router();

const {
  getUsers,
  getUser,
  patchUser,
  getMe,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:userId', getUser);

router.patch('/me', patchUser);

router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
