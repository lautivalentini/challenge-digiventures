import { 
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

export default function CustomSelect({ name, required, label, options, handleChange }) {
  return (
    <FormControl id={name} isRequired={required ? true : false}>
      <FormLabel>{label}</FormLabel>
      <Select name={name} onChange={handleChange}>
        <option value="">Choose an option</option>
        {options.map(({ value, label }, index) => <option key={index} value={value}>{label}</option>)}
      </Select>
    </FormControl>
  )
}