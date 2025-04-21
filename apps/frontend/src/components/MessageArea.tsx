import { Box, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";


export default function MessageArea() {
    useEffect(() => {
        async function getMessages() {
            const response: any = axios.get("http://localhost:3000/api/messages");
            const messages: any = (await response).data;
            console.log(messages);
        }
        getMessages()
    }, [])


    return (
        <Box height="100%" width="100%" bg="gray.700">
            <Stack>
                <Text textAlign="left">Message 1</Text>
                <Text textAlign="right">Message 2</Text>
                <Text textAlign="left">Message 3</Text>
                <Text textAlign="right">Message 4</Text>
                <Text textAlign="left">Message 5</Text>
                <Text textAlign="right">Message 6</Text>
            </Stack>
        </Box>
    )
}