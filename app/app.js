const express = require('express');
const morgan = require('morgan');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const auth = require('./middlewares/auth');
const homes = require('./routes/homes');
const reservations = require('./routes/reservations');
const app = express();

const PORT = process.env.PORT;

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(auth);

app.use('/users', users);
app.use('/homes', homes);
app.use('/reservations', reservations);

app.get('/', (_req, res) => {
    res.send('Backend airbnb');
});

app.listen(PORT, () => {
    console.log('Estoy corriendo en el puerto ', PORT);
});

module.exports = app;

