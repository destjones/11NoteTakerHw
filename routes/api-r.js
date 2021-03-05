const express = require('express');
const path = require('path');
const fs = require('fs');
const noteJSON = require('./db/db.json');
const PORT = 900;

const app = express();

// Serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));
// Needed to display html in local browser
app.use(express.static('./'));

// User middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API route => GET all notes (json)
app.get('/api/notes', (req, res) => {
    res.json(noteJSON);
  });
  
  // API route => POST new note data to api
  app.post('/api/notes', (req, res) => {
  // get Id of last note if it exists or 0
  const lastId = noteJSON.length ? Math.max(...(noteJSON.map(note => note.id))) : 0;
  const id = lastId + 1;
  noteJSON.push( { id, ...req.body} );
  res.json(noteJSON.slice(-1));
  });
  
  // ###### Server ######
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  