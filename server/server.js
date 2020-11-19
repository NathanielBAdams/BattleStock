const express = require('express');
const app = express();

require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const fs = require('fs');
const User = require('./models/userModel.js');
const userController = require('./controllers/userController.js');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('../public/'))

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log('connected to mongo DB');
  })
  .catch((err) => {
    console.log('error connecting to mongo DB');
  });

app.get('/', (req, res) => {
  // const index = fs.readFile(path.resolve(process.cwd() + '../public/index.html'));
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/login', userController.verifyUser, (req, res) => {
  if (res.locals.verified) {
    res.send(JSON.stringify({ userVerified: true, username: res.locals.username, favs: res.locals.favs }));
  } else {
    res.send({ userVerified: false });
  }
});

app.post('/signup', userController.createUser, (req, res) => {
  if (res.locals.verified) {
    res.send(JSON.stringify({ userVerified: true, username: res.locals.username, favs: res.locals.favs }));
  } else {
    res.send({ userVerified: false });
  }
});

app.use('/dist/bundle.js', express.static(path.join(__dirname, '../dist/bundle.js')));

app.use((err, req, res, next) => {
  // console.log('global error handler triggered', err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { error: 'An error occurred' }
  };

  const errorObj = Object.assign({}, defaultErr, err);

  // console.log(errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
