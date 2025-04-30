import { Box, Stack, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    focusedConversation: number,
    currentUser: User,
    refreshCounter: number
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
    username: string,
}

export default function MessageArea({focusedConversation, currentUser, refreshCounter}: Props) {
    const [conversation, setConversation] = useState<Message[] | null>(null)

    async function getConversation() {
        console.log("message area get convo called")
        const response: any = await axios.get(`http://localhost:3000/api/messages/with/${focusedConversation}`, {
            withCredentials: true
        });
        const messages = response.data;

        if (messages) {
             setConversation(messages)
        }
    }

    useEffect(() => {
        if (focusedConversation !== 0) {
            getConversation()
        }
        // I want to add a dependency for when a new message is sent from MessageInput.
        // I should do this from HomePage (shared parent of MessageArea and MessageInput).
    }, [focusedConversation, refreshCounter])

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
        <Box height="100%" width="100%" bg="gray.900" overflow="scroll">
            <Stack>
                {conversation.map(message => {
                    const isOwnMessage = message.author.username === currentUser?.username;
                
                return (
                    <Flex key={message.id} justify={isOwnMessage ? "end" : "start"} marginLeft={3} marginRight={3}>
                        <Box width="60%" p={4} bg="blue.600" borderRadius="lg" margin={1}>
                            <Text fontWeight="bold">{message.author.username}</Text>
                            <Text>{message.content}</Text>
                        </Box>
                    </Flex>
                    )
                }
                )}
            </Stack>
        </Box>
    )}
}