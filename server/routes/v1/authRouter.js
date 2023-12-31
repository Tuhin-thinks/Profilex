const express = require('express');
const router = express.Router();
const currentUser = require('../../middleware/currentUser');

const authController = require('../../controllers/v1/authController');

router.post('/signup', authController.signup);
router.get('/verify', currentUser, authController.authUser);
router.post('/logout', currentUser, authController.logout);

module.exports = router;
