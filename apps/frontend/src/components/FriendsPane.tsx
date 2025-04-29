import { useState, useEffect } from "react";
import { Stack, Box, Text, Button, Skeleton } from "@chakra-ui/react";
import axios from "axios";

export default function FriendsPane({user}: any) {

    interface User {
        username: string,
        id: number
    }

    const [friendsList, setFriendsList] = useState<User[] | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFriends(userID: User["id"]) {
            const response = await axios.get(`http://localhost:3000/api/friends/${userID}`, {
                withCredentials: true
            });
            const friendsList = response.data;
            console.log(friendsList);
            setFriendsList(friendsList);
            setLoading(false)
        }
        getFriends(user.id);
    },[])

    if (loading) {
        return (
            <Box>
                <Skeleton height="80px"></Skeleton>
                <Skeleton height="80px"></Skeleton>
                <Skeleton height="80px"></Skeleton>
            </Box>
        )
    }

    if (friendsList) {
    return (
        <Box p={4} position="relative" zIndex="0" height="100%" bgColor="blackAlpha.800">
        <Stack>
        {friendsList.map((friend) => {
            return (
                <Box _hover={{cursor: "pointer"}} key={friend.id} width="100%" p={3} bg="blue.900" margin={0.1} borderRadius="lg">
                    <Text fontWeight="bold">{friend.username}</Text>
                </Box>
            )
        })}
        <Button bg="whiteAlpha.950">Add Friends</Button>
        </Stack>
        </Box>
    )
    }

    if (!friendsList) {
        return (
            <Box p={4} position="relative" zIndex="0" height="100%" bgColor="blackAlpha.800">
                <Text>It appears you have no friends yet.</Text>
                <Text>Add friends below!</Text>
                <Button bg="whiteAlpha.950">Add Friends</Button>
            </Box>
        )
    }

}