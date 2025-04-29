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
                // need to fix problem here where it includes their password
                author: {
                    select: {
                        username: true,
                        id:true,
                    }
                },
                recipient: {
                    select: {
                        username: true,
                        id: true
                    }
                }
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

async function getConversation(primaryID, secondaryID) {
    const conversation = await prisma.messages.findMany({
        where: {
            OR: [
                {
                    authorID: primaryID,
                    recipientID: secondaryID
                },
                {
                    recipientID: primaryID,
                    authorID: secondaryID
                }
            ]
        }, 
        orderBy: { createdAt: "asc" },
        include: { 
            author: {
                select: {
                    id: true,
                    username: true
                        }
                    },
             recipient: {
                select: {
                    id: true,
                    username: true
                         }
                    }
                }
            });

    return conversation
}

async function getFriends(userID) {
    const friendsList = await prisma.users.findUnique({
        where: {
            id: userID
        },
        include: {
            friends: {
                select: {
                    username: true,
                    id: true
                }
            }
        }
    })
    return friendsList.friends
}

async function getProfile(userID) {
    const profile = await prisma.users.findUnique({
        where: {
            id: userID
        },
        select: {
            username: true,
            bio: true,
            id: true
        }
    })

    return profile
}

module.exports = { findAllMessages, signupUser, findUser, getConversation, getFriends, getProfile }