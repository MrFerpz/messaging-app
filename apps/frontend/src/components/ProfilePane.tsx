import { Box, Avatar, Text } from "@chakra-ui/react";

export default function ProfilePane() {
    return (
        <Box width="200px" height="100vh" bg="blackAlpha.950">
                <Avatar.Root _hover={{opacity: "0.8"}} shape="rounded" size="lg" variant="solid">
                            <Avatar.Fallback name="Test User"/>
                </Avatar.Root>
                <Text>Your friend's profile</Text>
        </Box>
    )
}