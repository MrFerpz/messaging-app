import { Box, Stack, Text, Flex } from "@chakra-ui/react"
import { IoIosCloseCircle } from "react-icons/io";
 
type Props = {
    friendsList: User[] | null,
    onFriendSelect: any,
    toggleVisibility: any
}

interface User {
    username: string,
    id: number
}

export default function FriendPopup({friendsList, onFriendSelect, toggleVisibility}: Props) {

    if (friendsList)
    return (
        <Box zIndex="2" position="absolute" top="0" left="0" bg="rgba(0, 0, 0, 0.7)" height="100vh" width="100vw">
            <Box zIndex="100" p={6} overflow="scroll" bg="blue.900" position="absolute" top="30vh" left="35vw" height="40vh" width="30vw">
                <Flex justifyContent="end"><Box _hover={{cursor: "pointer"}}><IoIosCloseCircle onClick={toggleVisibility}/></Box></Flex>
                <Text marginBottom="10px" fontWeight="bold">Send a message to...</Text>
                <Stack>
                    {friendsList.map(friend => {
                        return (
                            <>
                                <Text key={(friend.id)} color="whiteAlpha.800" onClick={() => {onFriendSelect(friend.id); toggleVisibility()}} _hover={{cursor: "pointer", opacity: "0.9", transform: "scale(1.03)"}} p={2} borderRadius="md" bg="blue.600">{friend.username}</Text>
                            </>
                        )
                    })}
                </Stack>
            </Box>
        </Box>
    )
}