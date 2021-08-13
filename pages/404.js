import { Text, Link, Container, Stack } from "@chakra-ui/react";

export default function FourOhFour() {
  return (
    <Container minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Stack alignItems="center">
        <Text fontSize="30px">404 - Page Not Found</Text>
        <Link href="/">Go back home</Link>
      </Stack>
    </Container>
  )
}