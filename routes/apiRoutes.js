const fs = require('fs');
const notesData = require('../db/db.json')//   ./db.json??

// ROUTING

module.exports = (app) => {
// API GET Request


  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    notesData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};