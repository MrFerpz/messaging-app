import { Box, Button, Textarea, Text } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react"

type Props = {
    userID: number,
    setVisibility: any
}

export default function BioPopup({userID, setVisibility}: Props) {
    const [bio, setBio] = useState("");

    function trackBio(e: any) {
        setBio(e.target.value)
    }

    async function postBio(e: any) {
        e.preventDefault();
        await axios.post(`http://localhost:3000/api/bio/${userID}`, {
            bio: bio
        });
    }

    return (
        <Box zIndex="2" position="absolute" top="0" left="0" bg="rgba(0, 0, 0, 0.7)" height="100vh" width="100vw">
            <Box zIndex="100" p={6} overflow="scroll" bg="blue.900" position="absolute" top="20vh" left="20vw" height="35vh" width="60vw">
                <Text marginBottom="10px" fontWeight="bold">Write your bio below...</Text>
                <Box height="100%">
                    <form onSubmit={(e) => {postBio(e); setVisibility()}}>
                        <Textarea autoresize bg="blackAlpha.950" onChange={trackBio} size="xl" height="100%"></Textarea>
                        <Button marginTop="10px" bg="white" type="submit">Submit Bio</Button>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}