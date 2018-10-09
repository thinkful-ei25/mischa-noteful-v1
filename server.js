'use strict';

// Load array of notes
const express = require('express');
const app = express();
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data); 
const { PORT } = require('./config');
const { logger } = require('./middleware/logger');
// const morgan = require('morgan');

console.log('Hello World!');
app.use(logger);
// app.use(morgan('common'));
app.use(express.static('public'));
// INSERT EXPRESS APP CODE HERE...
app.use(express.json());
// ADD STATIC SERVER HERE

app.get('/api/notes', (req,res,next) => {
  const { searchTerm } = req.query;
  console.log(searchTerm);

  notes.filter(searchTerm, (err, list) => {
    if (err){
      return next(err);
    }
    res.json(list);
  });
});


app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  console.log (id);
  notes.find(id, (err, item) => {
    if(err){
      return next(err);
    }
    res.json(item);
  });
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  console.log('req.body: ', req.body);
  console.log('updateObj: ', updateObj);

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
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
