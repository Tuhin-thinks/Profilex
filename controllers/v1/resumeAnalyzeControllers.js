const path = require('path');
const { TempFileModel } = require('../../models/TempModel');
const { User } = require('../../models/UserModel');

/**
 * Controller to upload resume file
 */
const uploadResumeFile = async (req, res) => {
    const userId =
        req.user?._id ||
        (await User.findOne({ email: 'guest-user@mail.com' }))._id;
    const filepath = req.file.path;

    const tempFile = new TempFileModel({
        filename: req.file.filename,
        path: filepath,
        size: req.file.size,
        userId: userId,
    });
    const result = await tempFile.save();
    req.session.tempFileId = result._id; // TODO: check if this works

    return res.status(200).json({ message: 'File uploaded successfully' });
};

/**
 * Controller to analyze resume file
 * TODO: write code to analyze the resume file
 * @param {*} req
 * @param {*} res
 * @returns
 **/
const analyzeResumeFile = async (req, res) => {
    const tempFileId = req.session.tempFileId;
    if (!tempFileId || !path.existsSync(tempFileId)) {
        return res.status(400).json({ message: 'File not found' });
    }
    const tempFile = await TempFileModel.findById(tempFileId);
    if (!tempFile) {
        return res.status(400).json({ message: 'Invalid file path' });
    }

    // TODO: write code to analyze the resume file

    return res.status(200).json({ message: 'File analyzed successfully' });
};

module.exports = {
    uploadResumeFile,
    analyzeResumeFile,
};
