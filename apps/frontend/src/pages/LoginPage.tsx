import { Box, Stack, Flex, Button, Field, Input, Text, Separator, Heading } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    function onUsernameChange(e: any) {
        setUsername(e.target.value)
    }

    function onPasswordChange(e: any) {
        setPassword(e.target.value)
    }

    async function onSubmit(e: any) {
        e.preventDefault();
        try { 
            await axios.post("http://localhost:3000/api/login", {
            username: username,
            password: password
        }, {
            withCredentials: true
        })
        navigate("/home")
    
    } catch(err) {
            console.log(err);
            navigate("/signup", {state: {message: err}})
        }
    }

    return (
        <Flex flexDirection="column">
            <Box boxShadow="lg" bg="blackAlpha.900" p={6} borderRadius="md">
                <Field.Root>
                    <form onSubmit={onSubmit}>
                        <Stack gap="3" w="sm">
                            <Heading>Log in to Black Book</Heading>
                            <Heading marginTop="-20px" fontSize="0.8rem">Enter your details below</Heading>
                            <Separator size="md"></Separator>
                            <Field.Label htmlFor="username">Username</Field.Label>
                            <Input id="username" onChange={onUsernameChange} placeholder="Jenkins123" name="username"></Input>
                            <Field.Label htmlFor="password">Password</Field.Label>
                            <PasswordInput id="password" onChange={onPasswordChange} placeholder="********" name="password"></PasswordInput>
                            <Button border="0.5px solid lightgreen" color="whiteAlpha.900" type="submit">Login</Button>
                        </Stack>
                    </form>
                </Field.Root>
                <Separator marginBottom="10px" marginTop="15px" size="md"/>
                <Stack maxW="sm">
                        <Text>Don't have an account yet?</Text>
                        <Link to="/signup"><Text _hover={{cursor: "pointer", color: "blue.400"}} marginTop="-10px" color="blue.500">Sign up here!</Text></Link>
                </Stack>
            </Box>
        </Flex>
    )
}