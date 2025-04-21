import Toolbar from "../components/Toolbar"
import MessagesPane from "../components/MessagesPane"
import MessagesTitleBar from "../components/MessagesTitleBar"
import { Grid, GridItem } from "@chakra-ui/react"

export default function HomePage() {

    return (
        <Grid gridTemplateColumns="1fr 9fr" gridTemplateRows="1fr 9fr">
            <GridItem gridColumn="1" gridRow="1">
                <Toolbar/>
            </GridItem>
            <GridItem gridColumn="1" gridRow="2">
                <MessagesPane/>
            </GridItem>
            <GridItem gridColumn="2" gridRow="1">
                <MessagesTitleBar/>
            </GridItem>
        </Grid>
    )
}