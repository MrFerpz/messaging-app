import { Box, Separator, VStack } from "@chakra-ui/react"
import axios from "axios"
import { useState, useEffect } from "react";

export default function MessagesPane() {

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

    const [messages, setMessages] = useState<Message[] | null>(null)
    const [loading, setLoading] = useState(true)

    async function getMessages() {
        try {
        const res = await axios.get("http://localhost:3000/api/messages", {
            withCredentials: true
        });
        setMessages(res.data);

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
            <div>
                    {messages.map(message => (
                        <div key={message.id}>
                            <div>{message.id}</div>
                            <div>{message.content}</div>
                            <div>{message.authorID}</div>
                        </div>
                    ))
                    } 
            </div>
        )
    }

    return (
        <Box p={4} height="calc(100vh - 100px)" bg="blackAlpha.900">
            <VStack>
                <Box h="40px" w="100%" bg="gray.800"></Box>
                <Separator></Separator>
                <Box h="40px" w="100%" bg="gray.800"></Box>
                <Separator></Separator>
                <Box h="40px" w="100%" bg="gray.800"></Box>
                <Separator></Separator>
                <Box h="40px" w="100%" bg="gray.800"></Box>
                <Separator></Separator>
                <Box h="40px" w="100%" bg="gray.800"></Box>
            </VStack>
        </Box>
    )
}