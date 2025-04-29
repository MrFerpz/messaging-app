import { useState, useEffect } from "react"
import { Box, Text, Avatar } from "@chakra-ui/react";
import axios from "axios"

interface User {
    username: string;
    bio: string;
    id: string
}

type ProfilePaneProps = {
    focusedUserID: number
}

export default function ProfilePane({focusedUserID} : ProfilePaneProps) {

    const [userProfile, setUserProfile] = useState<User | null>(null)

    useEffect(() => {
        async function getProfile(userID: number) {
            const response = await axios.get(`http://localhost:3000/api/profile/${userID}`, {
                withCredentials: true
            });

            const userProfile = response.data;
            setUserProfile(userProfile);
        }
        getProfile(focusedUserID)
    }, [focusedUserID])

    if (userProfile) {
        return (
            <Box width="200px" height="100vh" bg="blackAlpha.950" p={6}>
                    <Avatar.Root marginBottom="10px" _hover={{opacity: "0.8"}} shape="rounded" size="lg" variant="solid">
                                <Avatar.Fallback name={userProfile.username}/>
                    </Avatar.Root>
                    <Text fontWeight="bolder" marginBottom="10px">{userProfile.username}</Text>
                    <Box p={4} height="50%" bg="blue.900" borderRadius="lg">
                        <Text marginBottom="10px">About {userProfile.username}</Text>
                        {userProfile.bio ? (
                            <Text fontSize="0.7rem">{userProfile.bio}</Text>
                        ): (
                            <Text fontSize="0.7rem">{userProfile.username} has not written a biography yet.</Text>
                        )}
                    </Box>
            </Box>
        )
    }

    else {
        return (
            <Box width="200px" height="100vh" bg="blackAlpha.950">
                <Text>No user selected.</Text>
            </Box>
        )
    }
}