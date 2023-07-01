const { fileUpload } = require('../../config');
const { TempFileModel } = require('../../models/TempModel');

const uploadResumeFile = async (req, res) => {
    await fileUpload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: 'Error uploading file' });
        } else {
            res.status(200).json({ message: 'File uploaded successfully' });
        }
    });

    const filepath = req.file.path;

    const tempFile = new TempFileModel({
        filename: req.file.filename,
        path: filepath,
        size: req.file.size,
        userId: req.user._id,
    });
    const result = await tempFile.save();
    req.cookies.tempFileId = result._id; // TODO: check if this works

    return res.status(200).json({ message: 'File uploaded successfully' });
};

const analyzeResumeFile = async (req, res) => {
    const tempFileId = req.cookies.tempFileId;
    const tempFile = await TempFileModel.findById(tempFileId);
    if (!tempFile) {
        return res.status(400).json({ message: 'File not found' });
    }

    // TODO: write code to analyze the resume file

    return res.status(200).json({ message: 'File analyzed successfully' });
};

module.exports = {
    uploadResumeFile,
    analyzeResumeFile,
};
