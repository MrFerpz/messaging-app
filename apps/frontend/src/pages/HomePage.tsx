// imports
import { Grid, GridItem, Text, Box, Button } from "@chakra-ui/react"
import axios from "axios"
import { useLocation, Link } from "react-router"
import { useEffect, useState } from "react"

// components
import Toolbar from "../components/Toolbar"
import MessagesPane from "../components/MessagesPane"
import MessagesTitleBar from "../components/MessagesTitleBar"
import ProfilePane from "../components/ProfilePane"
import MessageArea from "../components/MessageArea"
import MessageInput from "../components/MessageInput"
import FriendsPane from "../components/FriendsPane"

export default function HomePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [focusedUser, setFocusedUser] = useState(0)
    const [toggleMessage, setToggleMessage] = useState(true);

    function toolbarClickHandle() {
        if (toggleMessage) {
            setToggleMessage(false)
        } else {
            setToggleMessage(true)
        }
    }

    interface User {
        id: number;
        username: string
    }

    function messageClickHandle(id: number) {
        setFocusedUser(id);
    }

    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        authCheck()
    }, []);

    async function logOut() {
        await axios.get("http://localhost:3000/api/logout");
        setUser(null);
    }

    async function authCheck() {
        try {
            const userDetails = await axios.get("http://localhost:3000/api/authcheck", {
            withCredentials: true
        })

        const user: User = {
            id: userDetails.data.id,
            username: userDetails.data.username
        }
        setUser(user);

        } catch(err) {
            console.log(err);
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <Box p={6}>
                <Text>Loading...</Text>
            </Box>
        )
    }

    if (user) {
        return (
                <div>
                    <Text>{message}</Text>
                        <Grid gridTemplateColumns="1fr 6fr 1fr" gridTemplateRows="auto 5fr 3fr">
                            <GridItem gridColumn="1" gridRow="1">
                                <Toolbar name={user.username} clickHandle={toolbarClickHandle}/>
                            </GridItem>
                            {toggleMessage ? (
                            <GridItem gridColumn="1" gridRow="2 / 4">
                               <MessagesPane clickHandle={messageClickHandle}/>
                            </GridItem>) : (
                            <GridItem gridColumn="1" gridRow="2 / 4">
                                <FriendsPane user={user}/>
                            </GridItem>)
                            }
                            <GridItem gridColumn="2" gridRow="1">
                                <MessagesTitleBar name={user.username}/>
                            </GridItem>
                            <GridItem gridColumn="3" gridRow="1 / 4">
                                <ProfilePane focusedUserID={focusedUser}/>
                            </GridItem>
                            <GridItem gridColumn="2" gridRow="2">
                                <MessageArea focusedConversation={focusedUser}/>
                            </GridItem>
                            <GridItem gridColumn="2" gridRow="3">
                                <MessageInput/>
                            </GridItem>
                            <GridItem gridColumn="3" gridRow="3">
                                <Button bg="whiteAlpha.900" onClick={logOut}>Log out</Button>
                            </GridItem>
                        </Grid>
                </div>
            )
        }

    if (!user) {
        return (
            <Box p={6} boxShadow="md">
                <Text>It appears you are not logged in. Login <Link to="/login">here!</Link></Text>
            </Box>
        )
    }
}