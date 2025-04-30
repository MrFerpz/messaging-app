import { Avatar, Box, Grid, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { FaPhone, FaVideo } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";

type messagesTitleBarProps = {
    name: string,
    onClick: any
}

export default function MessagesTitleBar({name, onClick} : messagesTitleBarProps) {
    const [cantCallVisibility, setCantCallVisibility] = useState(false)

    function cantCallToggle() {
        if (cantCallVisibility) {
            setCantCallVisibility(false)
        } else {
            setCantCallVisibility(true)
        }
    }

    return (
        <Box bgColor="blackAlpha.500" p={2} width="100%" maxHeight="60px">
            <Flex justifyContent="space-between" alignItems="center">
                    <Grid marginLeft="20px" justifyContent="center" alignItems="center" gridTemplateColumns="1fr 1fr">
                            <Avatar.Root _hover={{cursor: "pointer"}} onClick={onClick} shape="rounded" size="md" variant="solid">
                                <Avatar.Fallback name={name}/>
                            </Avatar.Root>
                            <Text _hover = {{cursor: "pointer"}} onClick={onClick} marginLeft="10px" fontWeight="bolder">{name}</Text>
                    </Grid>
                     <Flex _hover = {{cursor: "pointer"}} gap={3} alignItems="center" marginRight="20px">
                        <FaPhone onClick={cantCallToggle} size="1.5rem"/>
                        <FaVideo onClick={cantCallToggle} size="1.5rem"/>
                        <BsPersonFill onClick={onClick} size="1.5rem"/>
                    </Flex>
            </Flex>
            {cantCallVisibility ? (
                    <Box zIndex="2" position="absolute" top="0" left="0" bg="rgba(0, 0, 0, 0.7)" height="100vh" width="100vw">
                        <Box zIndex="100" p={6} overflow="scroll" bg="blue.900" position="absolute" top="30vh" left="35vw" height="40vh" width="30vw">
                            <Flex justifyContent="end"><Box _hover={{cursor: "pointer"}}><IoIosCloseCircle onClick={cantCallToggle}/></Box></Flex>
                            <Flex height="calc(100% - 40px)" flexDirection="column" justifyContent="center" alignItems="center">
                                <Text fontSize="1.5rem" fontWeight="bolder">Sorry!</Text>
                                <Text>You can't call this person right now.</Text>
                            </Flex>
                        </Box>
                    </Box>
            ) : null}
        </Box>
    )
}