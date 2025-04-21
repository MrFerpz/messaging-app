import Toolbar from "../components/Toolbar"
import MessagesPane from "../components/MessagesPane"
import MessagesTitleBar from "../components/MessagesTitleBar"
import ProfilePane from "../components/ProfilePane"
import MessageArea from "../components/MessageArea"
import MessageInput from "../components/MessageInput"
import { Grid, GridItem } from "@chakra-ui/react"

export default function HomePage() {

    return (
        <Grid gridTemplateColumns="1fr 6fr 1fr" gridTemplateRows="1fr 5fr 2fr">
            <GridItem gridColumn="1" gridRow="1">
                <Toolbar/>
            </GridItem>
            <GridItem gridColumn="1" gridRow="2 / 4">
                <MessagesPane/>
            </GridItem>
            <GridItem gridColumn="2" gridRow="1">
                <MessagesTitleBar/>
            </GridItem>
            <GridItem gridColumn="3" gridRow="1 / 4">
                <ProfilePane/>
            </GridItem>
            <GridItem gridColumn="2" gridRow="2">
                <MessageArea/>
            </GridItem>
            <GridItem gridColumn="2" gridRow="3">
                <MessageInput/>
            </GridItem>
        </Grid>
    )
}