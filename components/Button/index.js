import { 
  Stack, 
  Button,
} from "@chakra-ui/react";

export default function CustomButton({ label }) {
  return (
    <Stack alignItems="flex-end">
      <Button type="submit" size="md" variant="outline">{ label }</Button>
    </Stack>
  )
}