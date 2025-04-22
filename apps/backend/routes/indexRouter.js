const express = require('express');
const indexRouter = express();
const indexController = require("../controllers/indexController")

indexRouter.get("/api/messages", indexController.getMessages);

module.exports = indexRouter