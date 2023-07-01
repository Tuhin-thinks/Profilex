const express = require('express');
const router = express.Router();

const authController = require('../../controllers/v1/authController');

router.get('/google/', authController.authGoogle);
router.get('/google/callback', authController.authGoogleCallback);

module.exports = router;
