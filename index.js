/**
 * @description
 * Entry file for The Province Man's Web App
 */
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 3100;

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.raw());

// NOTE: The __dirname is important for setting up the directory of the views
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

const API_URL = 'http://localhost:3300';

app.get('/', (req, res) => {
  axios.get(`${API_URL}/notes`)
    .then(function (response) {
      res.render('index.pug', { notes: response.data });
    })
    .catch(function (err) {
      console.log(err);
    })
});

app.post('/notes', (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description
  }

  axios.post(`${API_URL}/notes`, payload)
    .then(function (response) {
      res.redirect('/');
    })
    .catch(function (err) {
      console.log(err);
    })
});

app.get('/notes/:id', (req, res) => {
  axios.get(`${API_URL}/notes/${req.params.id}`)
    .then(response => res.render('note.pug', { note: response.data }))
    .catch(err => console.log(err));
});

app.get('/notes/:id/delete', (req, res) => {
  axios.delete(`${API_URL}/notes/${req.params.id}`)
    .then(response => res.redirect('/'))
    .catch(err => console.log(err));
});

app.post('/notes/:id', (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description
  }

  axios.put(`${API_URL}/notes/${req.params.id}`, payload)
    .then(response => res.redirect('/'))
    .catch(err => console.log(err));
});

app.get('/about', (req, res) => {
  res.send('What about us?');
});

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
