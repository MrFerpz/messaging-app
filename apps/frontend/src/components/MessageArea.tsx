import { Box, Stack, Text, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";

interface Props {
    focusedConversation: number
}

export default function MessageArea({focusedConversation}: Props) {

    async function getConversation() {
        const response: any = axios.get(`http://localhost:3000/api/messages/with/${focusedConversation}`, {
            withCredentials: true
        });
        const messages: any = (await response).data;
        console.log(messages);
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

    return (
        <Box height="100%" width="100%" bg="gray.900">
            <Flex flexDirection="column" height="100%" alignItems="center" justifyContent="center">
            <Stack>
                <Text>Read thread in console.</Text>
            </Stack>
            </Flex>
        </Box>
    )
}