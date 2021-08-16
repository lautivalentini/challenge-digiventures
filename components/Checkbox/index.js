import { 
  Checkbox,
} from "@chakra-ui/react";

export default function CustomCheckbox({ handleChange, name, label, required, errors }) {
  const error = errors[name]
  return (
    <Checkbox
      name={name}
      size="md"
      isRequired={required ? true : false}
      onChange={(e) => {
        const name = e.target.name
        const value = e.target.checked
        handleChange(name, value, required ? !e.target.checked : false)
      }}
      isInvalid={error}
      errorBorderColor="red.300"
    >
      { label }
    </Checkbox>
  )
}