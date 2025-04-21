import { Avatar, Box, Grid, Separator, Stack, Tabs } from "@chakra-ui/react";
import { Link } from "react-router";

export default function Toolbar() {
    return (
        <Box width="100%" maxHeight="100px">
            <Grid gridTemplateColumns="1fr 4fr">
                    <Link to="/profile">
                        <Avatar.Root _hover={{opacity: "0.8"}} shape="rounded" size="lg" variant="solid">
                            <Avatar.Fallback name="Test User"/>
                        </Avatar.Root>
                    </Link>
                    <Tabs.Root lazyMount unmountOnExit defaultValue="messages">
                        <Tabs.List>
                            <Tabs.Trigger value="messages">Messages</Tabs.Trigger>
                            <Tabs.Trigger value="friends">Friends</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="messages">
                            {/* backend logic needed to map from db here */}
                            <Stack>Message 1</Stack>
                            <Separator></Separator>
                        </Tabs.Content>
                        <Tabs.Content value="friends">
                            <Stack>Friend 1</Stack>
                            <Separator></Separator>
                        </Tabs.Content>
                    </Tabs.Root>
            </Grid>
        </Box>
    )
}