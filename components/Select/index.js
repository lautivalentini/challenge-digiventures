import { 
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

export default function CustomSelect({ name, required, label, options, handleChange, errors }) {
  const error = errors[name]
  return (
    <FormControl id={name} isRequired={required ? true : false}>
      <FormLabel>{label}</FormLabel>
      <Select 
        name={name} 
        isInvalid={error}
        errorBorderColor="red.300"
        onChange={(e) => {
          const error = e.target.value === ''
          const name = e.target.name
          const value = e.target.value
          handleChange(name, value, error)
        }}
      >
        <option value=""></option>
        {options.map(({ value, label }, index) => <option key={index} value={value}>{label}</option>)}
      </Select>
    </FormControl>
  )
}