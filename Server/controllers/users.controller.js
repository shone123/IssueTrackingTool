var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

var mongoose= require("mongoose");
//mongoose.connect('mongodb://localhost:27017/IssueTracking', {useNewUrlParser: true});

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);


function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    // userService.create(req.body)
    //     .then(function () {
    //         res.json('success');
    //     })
    //     .catch(function (err) {
    //         res.status(400).send(err);
    //     });

    //userService.create(req.body);

    console.log(req);

    console.log("entering into register");


    // var db = mongoose.connection;
    //     db.on('error', console.error.bind(console, 'connection error:'));
    //     db.once('open', function() {

    //        console.log("connection successful");
    // });

    Schema = mongoose.Schema;

     var nameSchema = new Schema({
                name: {
                    type: String,
                    default: ''
                }
    });
            
    let UserModel = mongoose.model("User", nameSchema);   
            var myData = new UserModel({
                name:req.body.name
            });
            console.log(myData);
            myData.save()
            .then(item => {
            res.send("item saved to database");
            })
            .catch(err => {
            res.status(400).send("unable to save to database");
            });
            

    
    
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


