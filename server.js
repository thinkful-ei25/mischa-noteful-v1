'use strict';

// Load array of notes
const express = require('express');
const app = express();
const data = require('./db/notes');

console.log('Hello World!');

app.use(express.static('public'));
// INSERT EXPRESS APP CODE HERE...
// ADD STATIC SERVER HERE
// app.get('/', (req,res) => {

// });

app.listen(8080, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
