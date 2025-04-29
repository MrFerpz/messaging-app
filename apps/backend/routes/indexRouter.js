const express = require('express');
const indexRouter = express();
const indexController = require("../controllers/indexController")

indexRouter.get("/api/messages", indexController.getMessages);
indexRouter.post("/api/signup", indexController.signup);
indexRouter.post("/api/login", indexController.login);
indexRouter.get("/api/authcheck", indexController.checkLoggedIn);
indexRouter.get("/api/logout", indexController.logout);
indexRouter.get("/api/messages/with/:userID", indexController.getConversation);
indexRouter.get("/api/userID", indexController.getUserID)
indexRouter.get("/api/friends/:userID", indexController.getFriendsList)

module.exports = indexRouter