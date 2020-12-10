const express = require('express');
const logger = require('morgan');
const fs = require('fs');
let notesData = require('./db/db.json');
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

app.use(logger("dev"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTER

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if(err) throw err;
   return res.json(JSON.parse(data))
  }) 
 });

 app.post('/api/notes', (req, res) => {
  req.body["id"] = Math.floor(Math.random()*1231241234512);
  let newNote = req.body;
  notesData.push(newNote);
   fs.writeFile('./db/db.json', JSON.stringify(notesData), err => {
       if(err) throw err;
       return res.json(req.body);
   })
  })

  app.delete('/api/notes/:id', (req, res) => {
    let idToBeDeleted = req.params.id;
    for (i=0; i<notesData.length; i++){
      if(idToBeDeleted == notesData[i].id){
        notesData.splice(i, 1);
      }
    }
    fs.writeFile('./db/db.json', JSON.stringify(notesData), err => {
      if(err) throw err;
      return res.json(req.body);
  })
  })
require('./routes/htmlRoutes')(app);

// LISTENER

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});