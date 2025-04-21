import { Avatar, Box, Grid, Separator, Stack, Tabs } from "@chakra-ui/react";

export default function Toolbar() {
    return (
        <Box width="100%" maxHeight="90px">
            <Grid gridTemplateColumns="1fr 4fr">
                    <Avatar.Root shape="rounded" size="lg" variant="solid">
                        <Avatar.Fallback name="Test User"/>
                    </Avatar.Root>
                    <Tabs.Root lazyMount unmountOnExit defaultValue="messages">
                        <Tabs.List>
                            <Tabs.Trigger value="messages">Messages</Tabs.Trigger>
                            <Tabs.Trigger value="friends">Friends</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="messages">
                            {/* backend logic needed to map from db here */}
                            <Stack>Message 1</Stack>
                            <Separator></Separator>
                            <Stack>Message 2</Stack>
                            <Separator></Separator>
                            <Stack>Message 3</Stack>
                        </Tabs.Content>
                        <Tabs.Content value="friends">
                            <Stack>Friend 1</Stack>
                            <Separator></Separator>
                            <Stack>Friend 2</Stack>
                            <Separator></Separator>
                            <Stack>Friend 3</Stack>
                        </Tabs.Content>
                    </Tabs.Root>
            </Grid>
        </Box>
    )
}