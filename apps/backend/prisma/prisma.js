const { PrismaClient } = require('./app/generated/prisma/client');
const prisma = new PrismaClient()

async function findAllMessages(userID) {
    const messages = await prisma.messages.findMany({
            where: {
                    OR: [
                        {authorID: userID},
                        {recipientID: userID}
                        ]
                },
            include: {
                author: true,
                recipient: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }
    )
    return messages
}

async function signupUser(username, password) {
   try {
    await prisma.users.create({
        data: {
            username: username,
            password: password
        }
    })
    console.log("user created")

    } catch(err) {
        console.log(err)
    }
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