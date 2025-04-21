import { Box, Stack, Flex, Button, Field, Input, Text, Separator } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"

export default function LoginPage() {

    function onSubmit(e: any) {
        e.preventDefault();
        return
    }

    return (
        <Flex flexDirection="column">
            <Box boxShadow="lg" bg="blackAlpha.900" p={6} borderRadius="md">
                <Field.Root>
                    <form onSubmit={onSubmit}>
                        <Stack gap="3" maxW="sm">
                            <Field.Label htmlFor="username">Username</Field.Label>
                            <Input placeholder="Jenkins123" name="username"></Input>
                            <Field.Label htmlFor="password">Password</Field.Label>
                            <PasswordInput name="password"></PasswordInput>
                            <Button border="0.5px solid lightgreen" color="whiteAlpha.900" type="submit">Login</Button>
                        </Stack>
                    </form>
                </Field.Root>
                <Separator marginBottom="10px" marginTop="15px" size="md"/>
                <Stack maxW="sm">
                        <Text>Don't have an account?</Text>
                        <Text _hover={{cursor: "pointer", color: "blue.400"}} marginTop="-10px" color="blue.500">Sign up here!</Text>
                </Stack>
            </Box>
        </Flex>
    )
}