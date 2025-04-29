import { Avatar, Box, Grid, Text, Flex } from "@chakra-ui/react";
import { FaPhone, FaVideo } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

type messagesTitleBarProps = {
    name: string,
    onClick: any
}

export default function MessagesTitleBar({name, onClick} : messagesTitleBarProps) {
    return (
        <Box bgColor="blackAlpha.500" p={2} width="100%" maxHeight="60px">
            <Flex justifyContent="space-between" alignItems="center">
                    <Grid marginLeft="20px" justifyContent="center" alignItems="center" gridTemplateColumns="1fr 1fr">
                            <Avatar.Root onClick={onClick} shape="rounded" size="md" variant="solid">
                                <Avatar.Fallback name={name}/>
                            </Avatar.Root>
                            <Text marginLeft="10px" fontWeight="bolder">{name}</Text>
                    </Grid>
                     <Flex gap={3} alignItems="center" marginRight="20px">
                        <FaPhone size="1.5rem"/>
                        <FaVideo size="1.5rem"/>
                        <BsPersonFill onClick={onClick} size="1.5rem"/>
                    </Flex>
            </Flex>
        </Box>
    )
}