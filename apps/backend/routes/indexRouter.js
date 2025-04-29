const express = require('express');
const indexRouter = express();
const indexController = require("../controllers/indexController")

// GET
indexRouter.get("/api/messages", indexController.getMessages);
indexRouter.get("/api/authcheck", indexController.checkLoggedIn);
indexRouter.get("/api/logout", indexController.logout);
indexRouter.get("/api/messages/with/:userID", indexController.getConversation);
indexRouter.get("/api/userID", indexController.getUserID)
indexRouter.get("/api/friends/:userID", indexController.getFriendsList);
indexRouter.get("/api/profile/:userID", indexController.getProfile);
indexRouter.get("/api/nonfriends/:userID", indexController.getNonFriends);

// POST
indexRouter.post("/api/signup", indexController.signup);
indexRouter.post("/api/login", indexController.login);
indexRouter.post("/api/message", indexController.sendMessage);
indexRouter.post("/api/addfriend/:userID", indexController.addFriend);

module.exports = indexRouter