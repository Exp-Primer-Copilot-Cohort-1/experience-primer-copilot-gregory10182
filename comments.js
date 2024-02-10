// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read the comments.json file
var comments = JSON.parse(fs.readFileSync('./comments.json', 'utf8'));

// Display comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Add comments
app.post('/comments', function(req, res) {
  var newComment = {
    id: comments.length + 1,
  };
    newComment = Object.assign(newComment, req.body);
    comments.push(newComment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.json(newComment);
}
);
