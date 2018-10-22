/**
 * @description
 * Entry file for The Province Man's Web App
 */
const express = require('express');
const path = require('path');
const app = express();
const port = 3300;

app.use(express.static('public'));

// NOTE: The __dirname is important for setting up the directory of the views
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  let model = {
    title: 'Cardo - Ang Probinsyano S1',
    seasons: [2015, 2016, 2017, 2018],
    actors: [
      { name: 'Coco Martin' },
      { name: 'Philip Salvador' },
      { name: 'Yassi Pressman' }
    ]
  };
  res.render('index.pug', model);
});

app.get('/about', (req, res) => {
  res.send('What about us?');
});

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
