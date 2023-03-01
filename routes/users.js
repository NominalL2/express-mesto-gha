const router = require('express').Router();

const { getUsers, getUser, postUser } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', postUser);

module.exports = router;
