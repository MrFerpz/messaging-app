const express = require('express');
const indexRouter = express();
const indexController = require("../controllers/indexController")

indexRouter.get("/api/messages", indexController.getMessages);
indexRouter.post("/api/signup", indexController.signup)

module.exports = indexRouter