import { Box, Separator, VStack } from "@chakra-ui/react"

export default function MessagesPane() {
    return (
        <Box p={4} height="100%" bg="blackAlpha.900">
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