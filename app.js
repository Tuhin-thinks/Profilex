const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
require('dotenv').config();
const app = express();
const errorHandler = require('./middleware/errorHandler');
const jwt = require('jsonwebtoken');

const { PORT } = process.env;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
corsConfig = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

const v1Routes = require('./routes/v1');
const { connectDB, initGuestUser } = require('./config');

app.use('/api/v1', v1Routes);

const server = app.listen(PORT, async () => {
    // connect to the database
    await connectDB();

    // initialize guest user (only for testing)
    // await initGuestUser();

    console.log(`Server running on port ${PORT} ... ${new Date()}`);
});

// error handler middleware
app.use(errorHandler);
