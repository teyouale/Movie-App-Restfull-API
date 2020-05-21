const express = require('express');
const Joi = require('joi');
const genres = require('./routes/genres');
const logging = require('./middleware/logging');
const authenticating = require('./middleware/authenticating');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logging);
app.use(authenticating);
app.use('/api/genres', genres);

app.get('/', (req, res) => res.send('Welcome!!!'));
app.listen(port, () => console.log(`Example app listening on ${port} port!`));
