import { Avatar, Box, Grid, Tabs } from "@chakra-ui/react";

type ToolbarProps = {
    clickHandle: () => void;
    name: string;
    nameClick: any;
};

export default function Toolbar({clickHandle, name, nameClick} : ToolbarProps) {

    return (
        <Box width="100%" maxHeight="100px">
                <Grid bgColor="blackAlpha.900" gridTemplateColumns="1fr 4fr">
                        <Avatar.Root onClick={nameClick} margin={2} _hover={{opacity: "0.8"}} padding={2} shape="rounded" size="sm" variant="solid">
                            <Avatar.Fallback name={name}/>
                        </Avatar.Root>
                        <Tabs.Root margin={2} lazyMount unmountOnExit defaultValue="messages">
                            <Tabs.List>
                                <Tabs.Trigger width="100%" p={4} onClick={clickHandle} value="messages">Messages</Tabs.Trigger>
                                <Tabs.Trigger width="100%" p={4} onClick={clickHandle} value="friends">Friends</Tabs.Trigger>
                            </Tabs.List>
                            <Tabs.Content height="0px" p={0} value="messages">
                            </Tabs.Content>
                            <Tabs.Content height="0px" p={0} value="friends">
                            </Tabs.Content>
                        </Tabs.Root>
                </Grid>
        </Box>
    )
}