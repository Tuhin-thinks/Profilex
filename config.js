const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { User } = require('./models/UserModel');

const RESUME_UPLOAD_PATH = path.resolve(__dirname, './uploads');
if (!fs.existsSync(RESUME_UPLOAD_PATH)) {
    fs.mkdirSync(RESUME_UPLOAD_PATH);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const fileUpload = async (req, res, callback) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, RESUME_UPLOAD_PATH);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const uniqueFileName = `${uuidv4()}${ext}`;
            cb(null, uniqueFileName);
        },
    });

    const upload = multer({ storage }).single('file');

    upload(req, res, callback);
};

/**
 * Initialize guest user in mongodb
 */
const initGuestUser = async () => {
    // check if guest user already exists
    const guestUserExists = await User.findOne({
        email: 'guest-user@mail.com',
    });
    if (guestUserExists) {
        console.log('Guest user already exists');
        return;
    } else {
        const guestUser = new User({
            email: 'guest-user@mail.com',
            name: 'Guest User',
            isGuest: true,
            googleId: 'guest-user',
        });
        await guestUser.save();
        console.log('Guest user initialized');
    }
};

module.exports = {
    connectDB,
    fileUpload,
    initGuestUser,
};
