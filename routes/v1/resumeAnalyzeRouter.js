const express = require('express');
const router = express.Router();

const { resumeAnalyzeController } = require('../../controllers/v1');

/**
 * Endpoint to accept resume pdf or text file.
 */
router.post('/upload', resumeAnalyzeController.uploadResumeFile);

module.exports = router;
