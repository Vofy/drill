const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/random-meme', (req,res) => {
    const memeDir = __dirname + '/api/static/images/memes/';

    fs.readdir(memeDir, (err, files) => {
        var image = files[Math.floor(Math.random() * files.length)];

        res.json({
            image: {
                name: path.parse(image).name,
                path: "/images/memes/" + image 
            }
        });
    })
});


app.use(express.static(path.join(__dirname, 'api/static')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);