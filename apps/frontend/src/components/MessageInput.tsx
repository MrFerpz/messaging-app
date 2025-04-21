import { Textarea, Field, Flex } from "@chakra-ui/react"
import { IoMdSend } from "react-icons/io";

export default function MessageInput() {
    function onSubmit(e: any) {
        e.preventDefault();
        // axios post message
    }

    return (
            <Flex justifyContent="center" alignItems="center" width="100%" height="120px">
                <form onSubmit={onSubmit}>
                    <Field.Root>
                        <Textarea borderRadius="3xl" flex="1" bg="blackAlpha.950" name="message" width="100%"/>
                    </Field.Root>
                </form>
                <IoMdSend/>
            </Flex>
    )
}