import { Box, Stack, Flex, Button, Field, Input, Text, Separator, Heading } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onUsernameChange(e: any) {
        setUsername(e.target.value)
    }

    function onPasswordChange(e: any) {
        setPassword(e.target.value)
    }

    async function onSubmit(e: any) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/signup", {
                username: username,
                password: password
            })
            console.log("User successfully signed up.");
            navigate("/home");
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Flex flexDirection="column">
            <Box boxShadow="lg" bg="blackAlpha.900" p={6} borderRadius="md">
                <Field.Root>
                    <form onSubmit={onSubmit}>
                        <Stack gap="3" w="sm">
                            <Heading>Sign up for Black Book</Heading>
                            <Heading marginTop="-20px" fontSize="0.8rem">Create a free account below</Heading>
                            <Separator size="md"></Separator>
                            <Field.Label htmlFor="username">Username</Field.Label>
                            <Input onChange={onUsernameChange} placeholder="Jenkins123" name="username"></Input>
                            <Field.Label htmlFor="password">Password</Field.Label>
                            <PasswordInput onChange={onPasswordChange} placeholder="********" name="password"></PasswordInput>
                            <Button border="0.5px solid lightgreen" color="whiteAlpha.900" type="submit">Signup</Button>
                        </Stack>
                    </form>
                </Field.Root>
                <Separator marginBottom="10px" marginTop="15px" size="md"/>
                <Stack maxW="sm">
                        <Text>Have an account already?</Text>
                        <Link to="/login"><Text _hover={{cursor: "pointer", color: "blue.400"}} marginTop="-10px" color="blue.500">Log in here!</Text></Link>
                </Stack>
            </Box>
        </Flex>
    )
}