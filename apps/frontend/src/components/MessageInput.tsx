import { Textarea, Field, Flex, Box, Button } from "@chakra-ui/react"
import { IoMdSend } from "react-icons/io";

type MessageProps = {
    sendMessage: any,
    messageTrack: any
}

export default function MessageInput({sendMessage, messageTrack}: MessageProps) {

    return (
            <Flex justifyContent="center" alignItems="center" width="100%" height="120px">
                <Box width="80%">
                    <form onSubmit={sendMessage}>
                        <Flex>
                        <Field.Root>
                            <Textarea onChange={messageTrack} size="sm" borderRadius="md" flex="1" bg="blackAlpha.950" autoresize name="message"/>
                        </Field.Root>
                        <Button maxWidth="20px" type="submit" bg="whiteAlpha.900" borderRadius="50%" p={3} margin={3}>
                            <IoMdSend color="black"/>
                         </Button>
                         </Flex>
                    </form>
                </Box>
            </Flex>
    )
}