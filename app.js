const express = require('express');
const cookieSession = require('cookie-session');
require('dotenv').config();
const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.listen(PORT, async () => {
    // connect to the database
    await connectDB();

    // initialize guest user
    await initGuestUser();

    console.log(`Server running on port ${PORT} ... ${new Date()}`);
});
