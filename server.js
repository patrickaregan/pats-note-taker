// ****************************************
// Require resources
// ****************************************
const express = require('express');
const fs = require('fs');
const notes = require('./db/db');
const path = require('path');

// ****************************************
// Functions
// ****************************************
const createNewNote = (body) => {
    
    return notes;
}

// ****************************************
// Configure App
// ****************************************
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ****************************************
// Create Routes
// ****************************************
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
})

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length;
    const newNote = req.body;
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes), null, 2);
    res.json(newNote);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// ****************************************
// Start App
// ****************************************
app.listen(PORT, () => {
    console.log('App server now listening on port ${PORT}!');
})