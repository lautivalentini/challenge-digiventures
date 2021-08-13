import { 
  Checkbox,
} from "@chakra-ui/react";

export default function CustomCheckbox({ handleChange, label }) {
  return (
    <Checkbox
      name="remember"
      size="md"
      isRequired
      onChange={handleChange}
    >
      { label }
    </Checkbox>
  )
}