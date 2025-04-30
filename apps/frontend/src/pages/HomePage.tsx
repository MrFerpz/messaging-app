// imports
import { Grid, GridItem, Text, Box, Button } from "@chakra-ui/react"
import axios from "axios"
import { Link } from "react-router"
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
    const [message, setMessage] = useState("");
    const [refreshCounter, setRefreshCounter] = useState(0);

    function triggerRefresh(e: any) {
        e.preventDefault();
        setRefreshCounter(prev => prev + 1)
    }

    function setFocusToSelf() {
        if (user)
        setFocusedUser(user.id)
    }

    function onFriendSelect(userID: number) {
        setFocusedUser(userID)
    }

    function messageTrack(e: any) {
        setMessage(e.target.value)
    }

    async function sendMessage(e: any) {
        e.preventDefault();
            try {
            await axios.post("http://localhost:3000/api/message", {
                message: message,
                authorID: user?.id,
                recipientID: focusedUser
            }, {
                withCredentials: true
            });
            setMessage("");
        } catch(err) {
            console.log(err)
        }}

    function toolbarClickHandle() {
        if (toggleMessage) {
            setToggleMessage(false)
        } else {
            setToggleMessage(true)
        }
    }

    interface User {
        id: number;
        username: string,
        bio?: string
    }

    function messageClickHandle(id: number) {
        setFocusedUser(id);
    }

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
            username: userDetails.data.username,
            bio: userDetails.data.bio
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
                        <Grid gridTemplateColumns="1fr 6fr 1fr" gridTemplateRows="auto 4fr auto">
                            <GridItem gridColumn="1" gridRow="1">
                                <Toolbar nameClick={setFocusToSelf} name={user.username} clickHandle={toolbarClickHandle}/>
                            </GridItem>
                            {toggleMessage ? (
                            <GridItem gridColumn="1" gridRow="2 / 4">
                               <MessagesPane onFriendSelect={onFriendSelect} user={user} clickHandle={messageClickHandle}/>
                            </GridItem>) : (
                            <GridItem gridColumn="1" gridRow="2 / 4">
                                <FriendsPane user={user}/>
                            </GridItem>)
                            }
                            <GridItem gridColumn="2" gridRow="1">
                                <MessagesTitleBar onClick={setFocusToSelf} name={user.username}/>
                            </GridItem>
                            <GridItem gridColumn="3" gridRow="1 / 4">
                                <ProfilePane refreshCounter={refreshCounter} triggerRefresh={triggerRefresh} user={user} focusedUserID={focusedUser}/>
                            </GridItem>
                            <GridItem gridColumn="2" gridRow="2">
                                <MessageArea refreshCounter={refreshCounter} currentUser={user} focusedConversation={focusedUser}/>
                            </GridItem>
                            {focusedUser ? (
                            <GridItem gridColumn="2" gridRow="3">
                                <MessageInput triggerRefresh={triggerRefresh} messageTrack={messageTrack} sendMessage={sendMessage}/>
                            </GridItem>
                            ) : ""}
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