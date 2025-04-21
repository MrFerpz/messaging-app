import { Box, Stack, Text } from "@chakra-ui/react";

export default function MessageArea() {
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