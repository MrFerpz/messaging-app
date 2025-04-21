import { Avatar, Box, Grid, Text, Flex } from "@chakra-ui/react";
import { FaPhone, FaVideo } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

export default function MessagesTitleBar() {
    return (
        <Box border="1px grey solid" p={2} width="100%" maxHeight="100px">
            <Flex justifyContent="space-between" alignItems="center">
                    <Grid justifyContent="center" alignItems="center" gridTemplateRows="1fr 1fr">
                            <Avatar.Root shape="rounded" size="md" variant="solid">
                                <Avatar.Fallback name="Test User"/>
                            </Avatar.Root>
                            <Text>Test User</Text>
                    </Grid>
                     <Flex gap={3} alignItems="center">
                        <FaPhone size="1.3rem"/>
                        <FaVideo size="1.3rem"/>
                        <BsPersonFill size="1.3rem"/>
                    </Flex>
            </Flex>
        </Box>
    )
}