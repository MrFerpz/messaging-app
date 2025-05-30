const prisma = require("../prisma/prisma")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getMessages(req, res) {
    const user = jwt.verify(req.cookies.token, "megasecretkeyshhhh");
    const messages = await prisma.findAllMessages(user.id);
    res.json(messages);
}

async function getUserID(req, res) {
    const user = jwt.verify(req.cookies.token, "megasecretkeyshhhh");
    res.json(user.id)
}

async function signup(req, res) {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    try {
        await prisma.signupUser(username, password);
        return res.json("Successfully signed up.");
    } catch(err) {
        return res.json(err);
    }
}

async function login(req, res) {
    res.clearCookie("token");
    const username = req.body.username;
    const password = req.body.password;

    // verify password
    const user = await prisma.findUser(username);
    if (!user) {
        return res.status(401).send("User does not exist.")
    }

    if (!bcrypt.compare(password, user.password)) {
        return res.status(401).send("Incorrect password.")
    }

    // extract unnecessary info
    const payload = {
        id: user.id,
        username: user.username,
    }

    // generate token
    const token = jwt.sign(payload, "megasecretkeyshhhh", {expiresIn: "1h"});

    // store token as a cookie (sets req.cookies.token)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
    });

    return res.json("Logged in successfully.")
    }

async function logout(req, res) {
    res.clearCookie("token");
    return res.json("Logged out successfully.")
}

// auth check middleware
async function checkLoggedIn(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.send("Not authenticated, please log-in.")
    }

    try {
        // check the token is legit & decode it
        const user = jwt.verify(token, "megasecretkeyshhhh");
        // attach to future req objects so we can use the info
        req.user = user;
        return res.json(user);
    } catch(err) {
        return res.status(401).send("Couldn't verify the token")
    }
}

async function getConversation(req, res) {
    const user = jwt.verify(req.cookies.token, "megasecretkeyshhhh");
    const primaryID = Number(user.id);
    const secondaryID = Number(req.params.userID);
    const conversation = await prisma.getConversation(primaryID, secondaryID);
    res.json(conversation);
}

async function getFriendsList(req, res) {
    const userID = Number(req.params.userID);
    const friendsList = await prisma.getFriends(userID);
    res.json(friendsList)
}

async function getProfile(req, res) {
    const userID = Number(req.params.userID); 
    const profileDetails = await prisma.getProfile(userID);
    res.json(profileDetails)
}

async function sendMessage(req, res) {
    const recipientID = req.body.recipientID;
    const authorID = req.body.authorID;
    const message = req.body.message;
    await prisma.sendMessage(recipientID, authorID, message);
    res.json("Success");
}

async function getNonFriends(req, res) {
    const userID = Number(req.params.userID);
    const nonFriends = await prisma.findNonFriends(userID);
    res.json(nonFriends)
}

async function addFriend(req, res) {
    const userID = Number(req.params.userID);
    const recipientID = req.body.recipientID;
    await prisma.addFriend(userID, recipientID);
}

async function postBio(req, res) {
    const userID = Number(req.params.userID);
    const bio = req.body.bio;
    await prisma.postBio(userID, bio)
}

module.exports = {
    getMessages,
    signup,
    login,
    logout,
    checkLoggedIn,
    getConversation,
    getUserID,
    getFriendsList,
    getProfile,
    sendMessage,
    getNonFriends,
    addFriend,
    postBio
}