const express = require('express');
require('dotenv').config();
const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const v1Routes = require('./routes/v1');
app.use('/api/v1', v1Routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
