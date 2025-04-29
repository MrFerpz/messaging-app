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

async function sendMessage(recipientID, authorID, message) {
    await prisma.messages.create({
        data: {
            recipientID: recipientID,
            authorID: authorID,
            content: message,
        }
    })
    return
}

async function findNonFriends(userID) {
    const user = await prisma.users.findUnique({
      where: { id: userID },
      select: {
        friends: { select: { id: true } },
        friendsOf: { select: { id: true } }
      }
    });
  
    const friendIDs = new Set([
      ...user.friends.map(f => f.id),
      ...user.friendsOf.map(f => f.id)
    ]);
  
    const nonFriends = await prisma.users.findMany({
      where: {
        AND: [
          { id: { not: userID } },
          { id: { notIn: Array.from(friendIDs) } }
        ]
      },
      select: {
        id: true,
        username: true
      }
    });
  
    return nonFriends;
  }
  
async function addFriend(userID, recipientID) {
    await prisma.users.update({
        where: {
            id: userID
        },
        data: {
            friends: {
                connect: { id: recipientID }
            }
        }
    });

    await prisma.users.update({
        where: {
            id: recipientID
        },
        data: {
            friends: {
                connect: { id: userID }
            }
        }
    });
}

async function postBio(userID, bio) {
    await prisma.users.update({
        where: {
            id: userID
        },
        data: {
            bio: bio
        }
    })
}

module.exports = { 
    findAllMessages, 
    signupUser, 
    findUser,
    getConversation, 
    getFriends, 
    getProfile, 
    sendMessage, 
    findNonFriends, 
    addFriend,
    postBio 
}