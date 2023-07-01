const express = require('express');
const router = express.Router();

const userController = require('../../controllers/v1/userController');

router.get('/:userId', userController.getUserById);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
