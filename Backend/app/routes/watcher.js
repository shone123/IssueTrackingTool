const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentController");
const appConfig = require("../../config/appConfig");
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/watch`;
    
    // body params: issueId, userId.
    app.post(`${baseUrl}`, auth.isAuthorized, commentController.addWatcher);

     

    app.get(`${baseUrl}/get/issueId/:issueId`, auth.isAuthorized, commentController.getWatchers);

    //send friend request
    // app.post(`${baseUrl}/request/create`, userController.sendFriendRequest)


}