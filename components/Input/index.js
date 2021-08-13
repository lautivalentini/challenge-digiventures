import {
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export default function CustomInput({ type, name, label, required, handleChange }) {
  return (
    <FormControl id={name} isRequired={required ? true : false}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        name={name}
        onChange={handleChange}
      />
    </FormControl>
  )
}