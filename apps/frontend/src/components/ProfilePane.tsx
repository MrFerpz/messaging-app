import { useState, useEffect } from "react"
import { Box, Text, Avatar, Flex, Button } from "@chakra-ui/react";
import BioPopup from "../components/BioPopup"
import axios from "axios"

interface User {
    username: string;
    bio?: string;
    id: number
}

type ProfilePaneProps = {
    focusedUserID: number,
    user: User,
    refresh: any
}

export default function ProfilePane({focusedUserID, user, refresh} : ProfilePaneProps) {

    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [bioPopupVisible, setBioPopupVisible] = useState(false);

    function toggleBioPopup() {
        if (bioPopupVisible) {
            setBioPopupVisible(false)
        } else {
            setBioPopupVisible(true);
        }
    }

    useEffect(() => {
        async function getProfile(userID: number) {
            const response = await axios.get(`http://localhost:3000/api/profile/${userID}`, {
                withCredentials: true
            });

            const userProfile = response.data;
            setUserProfile(userProfile);
        }
        getProfile(focusedUserID);
    }, [focusedUserID, refresh])

    if (userProfile) {
        const isSelf = userProfile.id === user.id
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
                        {isSelf ? (
                            <Flex height="50%" justifyContent="center" alignItems="end" p={4}>
                                <Button onClick={() => toggleBioPopup()}fontSize="0.8rem" marginBottom="50px" p={3} bg="whiteAlpha.950">Edit your bio</Button>
                            </Flex> 
                        ) : null}
                        {bioPopupVisible ? <BioPopup setVisibility={toggleBioPopup} userID={user.id}/> : null}
                    </Box>
            </Box>
        )
    }

    else {
        return (
            <Box width="200px" height="100vh" bg="blackAlpha.950">
                <Flex height="100%" justifyContent="center" alignItems="center">
                    <Text>No user selected.</Text>
                </Flex>
            </Box>
        )
    }
}