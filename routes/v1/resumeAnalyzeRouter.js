const express = require('express');
const router = express.Router();

const { resumeAnalyzeController } = require('../../controllers/v1');
const { fileUpload } = require('../../config');
const currentUser = require('../../middleware/currentUser');

/**
 * Endpoint to accept resume pdf or text file.
 */
router.post(
    '/upload',
    fileUpload,
    currentUser,
    resumeAnalyzeController.uploadResumeFile
);
router.get('/suggestions', currentUser, resumeAnalyzeController.getSuggestions);

module.exports = router;
