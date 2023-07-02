const fs = require('fs');
const { TempFileModel } = require('../../models/TempModel');
const { User } = require('../../models/UserModel');
const { parseResumePDF } = require('../../modules/resumeAnalysis/parseResume');
const { analyzeResume } = require('../../modules/resumeAnalysis/analyzeResume');

/**
 * Controller to upload resume file
 */
const uploadResumeFile = async (req, res) => {
    const userId = req.user._id;
    const filepath = req.file.path;

    const tempFile = new TempFileModel({
        filename: req.file.filename,
        path: filepath,
        size: req.file.size,
        userId: userId,
    });
    const result = await tempFile.save();
    // req.session.tempFileId = result._id; // TODO: check if this works

    // store the _id for the next request
    await User.updateOne(
        { email: req.user.email },
        { uploadedFileId: result._id }
    );

    return res.status(200).json({ message: 'File uploaded successfully' });
};

/**
 * Controller to analyze resume file
 * TODO: write code to analyze the resume file
 * @param {*} req
 * @param {*} res
 * @returns
 **/
const getSuggestions = async (req, res) => {
    const tempFileId = (
        await User.findById(req.user._id, { uploadedFileId: 1 })
    ).uploadedFileId;
    if (!tempFileId) {
        return res.status(400).json({ message: 'File not found' });
    }
    const tempFile = await TempFileModel.findById(tempFileId);
    if (!tempFile || !fs.existsSync(tempFile.path)) {
        return res.status(400).json({ message: 'Invalid file path' });
    }

    // TODO: write code to analyze the resume file
    const textData = await parseResumePDF(tempFile.path);

    const suggestionsArray = await analyzeResume(textData);

    return res.status(200).json({
        message: 'File analyzed successfully',
        suggestions: suggestionsArray,
    });
};

module.exports = {
    uploadResumeFile,
    getSuggestions,
};
