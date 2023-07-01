const getUserById = async (req, res, next) => {
    try {
        const { userName } = req.body;

        res.status(200).json({ userName });
    } catch (error) {
        next(error);
    }
};

const signup = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        res.status(200).json({ userName, password });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        res.status(200).json({ userName, password });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserById,
    signup,
    login,
};
