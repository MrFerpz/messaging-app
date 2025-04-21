import { Box, Stack, Flex, Button, Field, Input, Text, Separator, Heading } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"
import { Link } from "react-router";

export default function SignupPage() {

    function onSubmit(e: any) {
        e.preventDefault();
        return
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
                            <Input placeholder="Jenkins123" name="username"></Input>
                            <Field.Label htmlFor="password">Password</Field.Label>
                            <PasswordInput placeholder="********" name="password"></PasswordInput>
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