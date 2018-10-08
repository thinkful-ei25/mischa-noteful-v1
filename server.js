'use strict';

// Load array of notes
const express = require('express');
const app = express();
const data = require('./db/notes');

console.log('Hello World!');

app.use(express.static('public'));
// INSERT EXPRESS APP CODE HERE...
// ADD STATIC SERVER HERE
app.get('/api/notes', (req,res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = data.find(item => item.id === id);
  res.json(item);
});

app.listen(8080, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
