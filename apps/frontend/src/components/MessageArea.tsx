import { Box, Stack, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    focusedConversation: number
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

export default function MessageArea({focusedConversation}: Props) {
    const [conversation, setConversation] = useState<Message[] | null>(null)

    async function getConversation() {
        const response: any = axios.get(`http://localhost:3000/api/messages/with/${focusedConversation}`, {
            withCredentials: true
        });
        const messages: any = (await response).data;

        if (messages) {
             setConversation(messages)
        }
    }

    useEffect(() => {
        if (focusedConversation !== 0) {
        getConversation()
        }
    }, [focusedConversation])

    if (!focusedConversation) {
        return (
            <Box height="100%" width="100%" bg="gray.900">
                <Flex flexDirection="column" height="100%" alignItems="center" justifyContent="center">
                <Stack>
                    <Text>No message thread selected.</Text>
                </Stack>
                </Flex>
            </Box>
            )
    }

    if (!conversation) {
        return (
            <Box height="100%" width="100%" bg="gray.900">
                <Flex flexDirection="column" height="100%" alignItems="center" justifyContent="center">
                <Stack>
                    <Text>No messages yet.</Text>
                </Stack>
                </Flex>
            </Box>
        )
    }

    if (conversation) {
    return (
        <Box height="100%" width="100%" bg="gray.900">
            <Flex flexDirection="column" height="100%" alignItems="center" justifyContent="center">
            <Stack>
                {conversation.map(message => (
                    <Box width="100%" p={4} borderRadius="md">
                        <Text>{message.author.username}</Text>
                        <Text>{message.content}</Text>
                    </Box>
                    )
                )}
            </Stack>
            </Flex>
        </Box>
    )}
}