const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Mengatur EJS sebagai template engine
app.set('views', path.join(__dirname, 'views')); // Mengatur direktori views

app.get('/', (req, res) => {
    const projects = './projects/';

    fs.readdir(projects, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        res.render('index', { files }); // Mengirim variabel files ke template
    });
});

app.get('/projects/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'projects', filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.header('Content-Type', 'text/html'); // Atur tipe konten sesuai dengan jenis file yang diharapkan
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});