const { fileUpload } = require('../../config');

const uploadResumeFile = async (req, res) => {
    await fileUpload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: 'Error uploading file' });
        } else {
            res.status(200).json({ message: 'File uploaded successfully' });
        }
    });
};

module.exports = {
    uploadResumeFile,
};
