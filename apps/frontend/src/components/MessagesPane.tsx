import { Box, Separator, Stack, Text, Button, Skeleton } from "@chakra-ui/react"
import axios from "axios"
import { useState, useEffect } from "react";
import FriendPopup from "../components/FriendPopup"

interface MessagesPaneProps {
    clickHandle: (id: number) => void,
    user: User,
    onFriendSelect: any,
    refreshCounter: number
}

interface Message {
    id: number,
    author: User,
    authorID: number
    recipient: User,
    recipientID: number,
    createdAt: Date,
    content: string,
    convKey?: string
}

interface User {
    id: number,
    username: string
}

export default function MessagesPane({clickHandle, user, onFriendSelect, refreshCounter}: MessagesPaneProps) {

    const [messages, setMessages] = useState<Message[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [friendsList, setFriendsList] = useState<User[] | null>(null)
    const [popup, setPopup] = useState(false);

    function toggleVisibility() {
        setPopup(false);
    }

    async function getMessages() {
        try {
        const res = await axios.get("http://localhost:3000/api/messages", {
            withCredentials: true
        });

        // I need one message per CONVERSATION
        // What is a conversation?
        // authorID = x && recipientID = y || authorID = y && recipientID = x


        const messages = res.data;

        const onePerRecipient: Message[] = messages.reduce(
            (acc: Message[], current: Message) => {
                if (!acc.some(message => message.recipientID === current.recipientID)) {
                    acc.push(current);
                }
                return acc;
        },[]);

        // add a key to each message (9-13)
        const getConversationKey = (a: number, b: number) => {
            return [a, b].sort().join("-")
        };

        onePerRecipient.map((message) => {
            // assign keys to each message object
            let conversationKey = getConversationKey(message.authorID, message.recipientID);
            message.convKey = conversationKey;
        })

        let onePerConversation: any = onePerRecipient.reduce(
                (acc: any, current: any) => {
                    if (!acc.some((message: any) => message.convKey === current.convKey)) {
                        acc.push(current)
                    }
                    return acc
            },[])

        setMessages(onePerConversation);

        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    async function openFriendsPopup() {
        const res = await axios.get(`http://localhost:3000/api/friends/${user.id}`);
        setFriendsList(res.data);
        setPopup(true);
    }

    useEffect(() => {
        getMessages();
    }, [refreshCounter])

    if (loading) {
        return (
            <Box>
                <Skeleton height="80px"></Skeleton>
                <Skeleton height="80px"></Skeleton>
                <Skeleton height="80px"></Skeleton>
            </Box>
        )
    }

    if (messages) {
        return (
            <>
            <Box p={4} position="relative" zIndex="0" height="100%" bgColor="blackAlpha.800">
                <Stack>
                    {messages.map((message) => {
                        let youSent = message.author.username === user.username;
                        if (youSent) {
                            return (
                                <Box _hover={{cursor: 'pointer'}} onClick={() => clickHandle(message.recipient.id)} p={4} borderRadius="md" position="relative" zIndex="1" bgColor="blue.900" h="20" key={message.id}>
                                    <Text fontWeight="bolder">{message.recipient.username}</Text>
                                     <Text fontSize="0.7rem">{message.content}</Text>
                                </Box>
                            )
                        }
                        else return (
                                <Box _hover={{cursor: 'pointer'}} onClick={() => clickHandle(message.author.id)} p={4} borderRadius="md" position="relative" zIndex="1" bgColor="green.900" h="20" key={message.id}>
                                    <Text fontWeight="bolder">{message.author.username}</Text>
                                    <Text fontWeight="bold" fontSize="0.7rem">{message.content}</Text>
                                </Box>
                            )
                        })
                    }
                    <Button height="2rem" bg="whiteAlpha.900" onClick={openFriendsPopup}>New message</Button>
                </Stack>
            </Box>
            {popup ? (<FriendPopup toggleVisibility={toggleVisibility} onFriendSelect={onFriendSelect} friendsList={friendsList}/>) : null}
            </>
        )
    }

    return (
        <Box p={4} height="calc(100vh - 100px)" bg="blackAlpha.900">
            <Stack>
                <Box h="40px" w="100%" bg="gray.800"></Box>
                <Separator></Separator>
                <Box h="40px" w="100%" bg="gray.800"></Box>
                <Separator></Separator>
                <Box h="40px" w="100%" bg="gray.800"></Box>
                <Separator></Separator>
                <Box h="40px" w="100%" bg="gray.800"></Box>
                <Separator></Separator>
                <Box h="40px" w="100%" bg="gray.800"></Box>
            </Stack>
        </Box>
    )
}