const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const port = 3300;

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  let model = {
    title: 'Cardo - Ang Probinsyano S1',
    seasons: [2015, 2016, 2017, 2018],
    actors: [
      {name: 'Coco Martin'},
      {name: 'Philip Salvador'},
      {name: 'Yassi Pressman'}
    ]
  };
  res.render('../server/views/index.pug', model);
});

app.get('/about', (req, res) => {
  res.send('What about us?');
});
//- npm install --only=dev nodemon

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});

// const server = http
//   .createServer();

// server.listen(port, (err) => {
//   if(err) { return console.error(err); }
//   console.log(`Listening to ${port}...`);
// });

