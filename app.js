const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
require('dotenv').config();
const app = express();
const errorHandler = require('./middleware/errorHandler');

const { PORT } = process.env;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'tops-grass-production.up.railway.app',
        credentials: true,
    })
);

// cookie session middleware
app.use(
    cookieSession({
        name: 'session',
        keys: [
            process.env.COOKIE_KEY1, // cookie key 1
            process.env.COOKIE_KEY2, // cookie key 2
        ],

        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);

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
