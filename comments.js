// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/Comment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');

// Configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8080;

// Set router
var router = express.Router();

// Middleware
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// Test router
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api!' });
});

// Routes
router.route('/comments')
    .post(function(req, res) {
        var comment = new Comment();
        comment.name = req.body.name;
        comment.body = req.body.body;
        comment.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Comment created!' });
        });
    })
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err) {
                res.send(err);
            }
            res.json(comments);
        });
    });

router.route('/comments/:comment_id')
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.send(err);
            }
            res.json(comment);
        });
    })
    .put(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.send(err);
            }
            comment.name = req.body.name;
            comment.body = req.body.body;
            comment.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Comment updated!' });
            });
        });
    })
    .delete(function(req, res) {
        Comment.remove({
            _id: req.params.comment_id
        }, function(err, comment) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

// Register routes
app.use('/api', router);

// Start server
app.listen(port);
console.log('Server is running on port ' + port);