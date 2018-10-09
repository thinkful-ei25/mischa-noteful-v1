'use strict';

// Load array of notes
const express = require('express');
const app = express();
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data); 
const { PORT } = require('./config');
const { log } = require('./middleware/logger');
// const morgan = require('morgan');

console.log('Hello World!');
app.use(log);
// app.use(morgan('common'));
app.use(express.static('public'));
// INSERT EXPRESS APP CODE HERE...
// ADD STATIC SERVER HERE
app.get('/api/notes', (req,res,next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err){
      return next(err);
    }
    res.json(list);
  });
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = data.find(item => item.id === id);
  res.json(item);
});

app.use(function (req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found'});
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
