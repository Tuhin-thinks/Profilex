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
    await tempFile.save();

    return res.status(200).json({ message: 'File uploaded successfully' });
};

module.exports = {
    uploadResumeFile,
};
