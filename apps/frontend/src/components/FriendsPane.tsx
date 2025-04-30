import { useState, useEffect } from "react";
import { Stack, Box, Text, Button, Skeleton, Separator } from "@chakra-ui/react";
import axios from "axios";
import { FaCirclePlus } from "react-icons/fa6";

export default function FriendsPane({user}: any) {

    interface User {
        username: string,
        id: number
    }

    const [friendsList, setFriendsList] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [nonFriends, setNonFriends] = useState<User[] | null>(null);
    const [refresh, setRefresh] = useState(0);


    useEffect(() => {
        async function getFriends(userID: User["id"]) {
            setLoading(true); 
            try {
            const response = await axios.get(`http://localhost:3000/api/friends/${userID}`, {
                withCredentials: true
            });
            const friendsList = response.data;
            setFriendsList(friendsList);
            setLoading(false)
        } catch(err) {
        console.log(err)
    }};

    getFriends(user.id);
    }, [refresh]);

    useEffect(() => {
        async function findRemainingUsers(userID: User["id"]) {
            try {
            const res = await axios.get(`http://localhost:3000/api/nonfriends/${userID}`, {
                withCredentials: true
            });
            setNonFriends(res.data);
        } catch(err) {
            console.log(err)
        }}
        findRemainingUsers(user.id);
    }, [refresh])

    async function friendRequest(recipientID: number) {
        try {
        console.log("friend request sent");
        await axios.post(`http://localhost:3000/api/addfriend/${user.id}`, {
            recipientID: recipientID
        }, {
            withCredentials: true
        });
        setRefresh(prev => prev + 1);
        console.log(refresh);
    } catch(err) {
        console.log(err)
        }
    }

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
            <Text fontWeight="bold">Your friends</Text>
        {friendsList.map((friend) => {
            return (
                <Box key={friend.id} width="100%" p={3} bg="blue.900" margin={0.1} borderRadius="lg">
                    <Text fontWeight="bold">{friend.username}</Text>
                </Box>
            )
        })}
        <Separator height="10px"/>

        {nonFriends ? (
            <>
                <Text fontWeight="bold">Suggested friends</Text>
                {nonFriends.map((nonFriend: User) => {
                    return (
                        <Box _hover={{cursor: "pointer"}} key={nonFriend.id} width="100%" p={3} bg="red.900" margin={0.1} borderRadius="lg">
                            <Text fontWeight="bold">{nonFriend.username}</Text>
                            <FaCirclePlus onClick={() => friendRequest(nonFriend.id)} color="white"/>
                        </Box>
                        )
                    })}
            </>
        ) : (
            <Button bg="whiteAlpha.950">Add friends</Button>
        )}
        </Stack>
        </Box>
         )
        }
}