const { PrismaClient } = require('./app/generated/prisma/client');
const prisma = new PrismaClient()

async function findAllMessages() {
    const messages = await prisma.messages.findMany()
    return messages
}

async function signupUser(username, password) {
    await prisma.users.create({
        data: {
            username: username,
            password: password
        }
    })
}

async function findUser(username) {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    return user
}

module.exports = { findAllMessages, signupUser, findUser }