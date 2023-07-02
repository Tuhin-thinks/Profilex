const express = require('express');
const router = express.Router();

const { resumeAnalyzeController } = require('../../controllers/v1');
const { fileUpload } = require('../../config');

/**
 * Endpoint to accept resume pdf or text file.
 */
router.post('/upload', fileUpload, resumeAnalyzeController.uploadResumeFile);
router.get('/suggestions', resumeAnalyzeController.getSuggestions);

module.exports = router;
