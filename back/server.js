const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const { portServer } = require('./conf');
require('./passport-strategy');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', require('./auth'));

app.all('/*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next();
});

app.get('/authrequired', (req, res) => {
  res.send(`You're in, congrats !\n`);
});

app.get('/monespace', (req, res) => {
  console.log(`Request for 'GET /monespace'`);
  res.status(200).send('Mon espace');
});
