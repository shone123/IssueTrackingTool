require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var mongoose= require("mongoose");
//const cookieParser = require('cookie-parser');
mongoose.connect('mongodb://localhost:27017/IssueTracking', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser());

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./controllers/users.controller'));

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});

// start server
var port = 3000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});