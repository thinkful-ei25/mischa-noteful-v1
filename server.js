'use strict';

// Load array of notes
const express = require('express');
const app = express();
const data = require('./db/notes');
const { PORT } = require('./config');
const { log } = require('./middleware/logger');
// const morgan = require('morgan');

console.log('Hello World!');
app.use(log);
// app.use(morgan('common'));
app.use(express.static('public'));
// INSERT EXPRESS APP CODE HERE...
// ADD STATIC SERVER HERE
app.get('/api/notes', (req,res) => {
  const { searchTerm } = req.query;
  if(searchTerm) {
    const response = data.filter(item => item.title.includes(searchTerm));
    res.json(response);
  }else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = data.find(item => item.id === id);
  res.json(item);
});

app.listen(PORT, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
