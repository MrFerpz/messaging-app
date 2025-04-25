import { Box, Separator, Stack, Text, Button } from "@chakra-ui/react"
import axios from "axios"
import { useState, useEffect } from "react";

interface MessagesPaneProps {
    clickHandle: (id: number) => void
}

export default function MessagesPane({clickHandle}: MessagesPaneProps) {

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

    const [authors, setAuthors] = useState<string[]>([]);
    const [messages, setMessages] = useState<Message[] | null>(null)
    const [loading, setLoading] = useState(true)

    async function getMessages() {
        try {
        const res = await axios.get("http://localhost:3000/api/messages", {
            withCredentials: true
        });

        const userID: any = await axios.get("http://localhost:3000/api/userID", {
            withCredentials: true
        });


        // way to get all received messages and authors
        function removeReceived(message: Message) {
            return message.authorID !== userID.data
        }
        const filteredMessages = res.data.filter(removeReceived);
        setMessages(filteredMessages)

        // way to get just unique author names but no messages
        const messageAuthors: string[] = filteredMessages.map((message: Message) => message.author.username);
        const uniqAuthors: string[] = [...new Set(messageAuthors)];
        setAuthors(uniqAuthors);
        const reducedMessages = [];

        console.log(filteredMessages);

        // // ideally I want just the first message from each author
        // for (const x of uniqAuthors) {
        //     if (filteredMessages[i].author.username === uniqAuthors[i]) {
        //         reducedMessages.push(filteredMessages[i])
        //     }
        // }

        console.log(reducedMessages);

        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMessages();
    }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (messages) {
        return (
            <Box p={4} position="relative" zIndex="0" height="100%" bgColor="blackAlpha.800">
                <Stack>
                    {messages.map(message => (
                        <Box _hover={{cursor: 'pointer'}} onClick={() => clickHandle(message.author.id)} p={4} borderRadius="md" position="relative" zIndex="1" bgColor="blue.900" h="20" key={message.id}>
                            <Text fontWeight="bolder">{message.author.username}</Text>
                            <div>{message.content}</div>
                        </Box>
                    ))
                    }
                    <Button height="2rem" bg="whiteAlpha.900">New message</Button>
                </Stack>
            </Box>
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