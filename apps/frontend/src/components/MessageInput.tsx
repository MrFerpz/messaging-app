import { Textarea, Field, Flex, Box } from "@chakra-ui/react"
import { IoMdSend } from "react-icons/io";

export default function MessageInput({sendMessage}: any) {
    function onSubmit(e: any) {
        e.preventDefault();
        // axios post message
    }

    return (
            <Flex justifyContent="center" alignItems="center" width="100%" height="120px">
                <Box width="80%">
                    <form onSubmit={onSubmit}>
                        <Field.Root>
                            <Textarea size="sm" borderRadius="md" flex="1" bg="blackAlpha.950" autoresize name="message"/>
                        </Field.Root>
                    </form>
                </Box>
                <Box bg="whiteAlpha.900" borderRadius="50%" p={3} margin={3}>
                    <IoMdSend onClick={sendMessage} color="black"/>
                </Box>
            </Flex>
    )
}