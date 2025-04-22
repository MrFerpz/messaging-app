const prisma = require("../prisma/prisma")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getMessages(req, res) {
    const messages = await prisma.findAllMessages();
    res.json(messages);
}

async function signup(req, res) {
    const username = req.body.username;
    const password = bcrypt.hash(req.body.password, 10);
    try {
        await prisma.signupUser(username, password);
        res.json("Successfully signed up.");
    } catch(err) {
        res.json(err);
    }
}

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password

    // verify password
    const user = await prisma.findUser(username);
    if (!user) {
        res.json("User does not exist.")
    }

    if (!bcrypt.compare(password, user.password)) {
        res.json("Incorrect password.")
    }

    // extract unnecessary info
    const payload = {
        id: user.id,
        username: user.username,
    }

    const token = jwt.sign({
                    data: payload,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    }, "megasecretkeyshhhh");

    res.json(token);
    }

// auth check middleware
async function checkLoggedIn(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    const headerArray = bearerHeader.split("");
    const bearerToken = headerArray[1];

    try {
        jwt.verify(bearerToken, "megasecretkeyshhhh");
        next()
    } catch(err) {
        res.json(err)
    }
}

// async function postMessage(req, res) {
//     const message = req.body.message;
//     will also need sender and recipient
//     await prisma.sendMessage(message)
// }

module.exports = {
    getMessages,
    signup,
    login,
    checkLoggedIn
}