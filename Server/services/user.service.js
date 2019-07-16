var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
//var mongo = require('mongoskin');
//var mongo= require("mongoose");
//var db = mongo.connect("mongodb://localhost:27017/IssueTracking");
//db.bind('user');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
   // var deferred = Q.defer();

    // validation
    // db.users.findOne(
    //     { username: userParam.username },
    //     function (err, user) {
    //         if (err) deferred.reject(err.name + ': ' + err.message);

    //         if (user) {
    //             // username already exists
    //             deferred.reject('Username "' + userParam.username + '" is already taken');
    //         } else {
    //             createUser();
    //         }
    //     });

     // set user object to userParam without the cleartext password
     //var user = _.omit(userParam, 'password');

     // add hashed password to user object
     //user.hash = bcrypt.hashSync(userParam.password, 10);
 
//      db.users.insert(
//          user,
//          function (err, doc) {
//              if (err) deferred.reject(err.name + ': ' + err.message);
 
//              deferred.resolve();
//          });

 
//  return deferred.promise;

var nameSchema = new mongo.Schema({
    Name: String
   });

var User = mongo.model("User", nameSchema);   
var myData = new User(userParam);
myData.save()
.then(item => {
res.send("item saved to database");
})
.catch(err => {
res.status(400).send("unable to save to database");
});



console.log("api is ready");
   
}

   

