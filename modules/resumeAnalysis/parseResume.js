const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * Function to parse the resume pdf and get the txt content
 * @param tempFile - The tempfiles collection object
 * @returns
 */
const parseResumePDF = async (tempFile) => {
    const resumeFilePath = tempFile;
    const resumeFileContent = await pdfParse(fs.readFileSync(resumeFilePath));
    return resumeFileContent.text;
};

module.exports = {
    parseResumePDF,
};
