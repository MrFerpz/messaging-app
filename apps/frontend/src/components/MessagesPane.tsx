import { Box, Separator, Stack, Text, Button, Skeleton } from "@chakra-ui/react"
import axios from "axios"
import { useState, useEffect } from "react";
import FriendPopup from "../components/FriendPopup"

interface MessagesPaneProps {
    clickHandle: (id: number) => void,
    user: User,
    onFriendSelect: any
}

interface Message {
    id: number,
    author: User,
    authorID: number
    recipient: User,
    recipientID: number,
    createdAt: Date,
    content: string
}

interface User {
    id: number,
    username: string
}

export default function MessagesPane({clickHandle, user, onFriendSelect}: MessagesPaneProps) {

    const [messages, setMessages] = useState<Message[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [friendsList, setFriendsList] = useState<User[] | null>(null)
    const [popup, setPopup] = useState(false);

    function toggleVisibility() {
        setPopup(false);
        console.log("popup is" + popup)
    }

    async function getMessages() {
        try {
        const res = await axios.get("http://localhost:3000/api/messages", {
            withCredentials: true
        });

        // way to get all received messages and authors
        function removeReceived(message: Message) {
            return message.authorID !== user.id
        }
        const filteredMessages = res.data.filter(removeReceived);

        const reducedMessages = filteredMessages.reduce((acc: Message[], current: Message) => {
            // check if current author exists in the accumulator array
            if (!acc.some((message: Message) => message.author.username === current.author.username))
            // if they don't exist, add message to the accumulator
            acc.push(current);
            return acc;
        // initial value is empty array []
        }, []);

        setMessages(reducedMessages);

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
    }, [])

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
                    {messages.map(message => (
                        <Box _hover={{cursor: 'pointer'}} onClick={() => clickHandle(message.author.id)} p={4} borderRadius="md" position="relative" zIndex="1" bgColor="blue.900" h="20" key={message.id}>
                            <Text fontWeight="bolder">{message.author.username}</Text>
                            <div>{message.content}</div>
                        </Box>
                    ))
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