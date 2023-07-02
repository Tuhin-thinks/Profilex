const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { User } = require('../../models/UserModel');
const { TempFileModel } = require('../../models/TempModel');

const signup = async (req, res) => {
    const { email, email_verified, given_name, name, locale, picture, sub } =
        req.body;
    const user = {
        sub,
        email,
        email_verified,
        given_name,
        name,
        locale,
        picture,
    };
    const result = await saveUser(user);
    const uploadedUserId = result._id;
    const token = jwt.sign(
        { ...result, id: uploadedUserId, __v: undefined },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h',
        }
    );

    res.status(200).json({
        message: 'User created successfully',
        user: result,
        token: token,
    });
};

const authUser = async (req, res) => {
    const user = req.user; // obtained from middleware
    res.status(200).json({
        message: 'User authenticated successfully',
        user: user,
    });
};

const logout = async (req, res) => {
    const userId = req.user._id;
    const allTempFiles = await TempFileModel.find({
        userId: new mongoose.Types.ObjectId(userId),
    });
    await userDataCleanUp(allTempFiles.map((item) => item._doc.path));

    await TempFileModel.deleteMany({
        userId: { $in: allTempFiles.map((item) => item._doc._id) },
    });

    res.status(200).json({
        message: 'User logged out successfully',
    });
};
// ------------------------------ Helper functions ------------------------------
/**
 * Saves the user in the database.
 * @param {Object} user - The user object
 */
const saveUser = async (user) => {
    const existingUser = await User.findOne({ email: user.email }); // TODO: check if this works, or findOne supports chaining using .then() or we need .exec().
    if (!existingUser) {
        // save the user in the database
        const newUser = new User(user);
        const result = await newUser.save();

        console.log('New user created: ', newUser); // TODO: remove this once testing is done.

        return result._doc;
    }

    console.log('User already exists: ', existingUser); // TODO: remove this once testing is done.
    return existingUser._doc;
};

const userDataCleanUp = async (tempFilePaths) => {
    await Promise.all(
        tempFilePaths.map((filePath) => {
            console.log('filePath: ', filePath);
            if (fs.existsSync(filePath)) return fs.rm(filePath);
        })
    );
};

module.exports = {
    signup,
    authUser,
    logout,
};
