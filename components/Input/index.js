import { useEffect, useState } from "react";

import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

export default function CustomInput({ 
  type, 
  name, 
  label, 
  required, 
  handleChange, 
  regex, 
  conditions, 
  information, 
  errors,
  setErrors
}) {
  const error = errors[name]
  const { validations = [], render = [] } = conditions
  const [comparision, setComparision] = useState(true)
  const [isSame, setIsSame] = useState({ same: true, text: '' })

  useEffect(() => {
    validator()
  }, [information])

  function validator() {
    render
      .map(item => {
        item.map(({ values = [], comparision = '', input = '' }) => {
          const value = information[input]
          setComparision(value && values.includes(value))
        })
      })
    validations
      .map(({ values = [], comparision = '', input = '' }) => {
          const value = information[input]
          const inputValue = information[name]
          if (comparision === 'not_includes') {
            const value = information[name] || ''
            const assertion = values.includes(value.toLowerCase())
            if (value) {
              setErrors({ ...errors, [name]: assertion })
              setIsSame({ same: !assertion, text: `You must include another country other than ${value}` })
            }
          } else if (comparision === 'same') {
              if (inputValue) {
                const same = value === inputValue
                setIsSame({ same, text: 'Passwords do not match' })
                setErrors({ ...errors, [name]: !same })
              }
          }
      })
  }

  function onChangeInput(e) {
    const value = e.target.value
    const name = e.target.name
    const re = new RegExp(regex);
    const test = re.test(value)
    handleChange(name, value, !test)
  }

  return (
    <>
      { comparision && (
        <FormControl id={name} isRequired={required ? true : false}>
          <FormLabel>{label}</FormLabel>
          <Input
            isInvalid={error}
            errorBorderColor="red.300"
            type={type}
            name={name}
            onChange={onChangeInput}
          />
          { !isSame.same && <FormHelperText color="red.500">{ isSame.text }</FormHelperText> }
        </FormControl>
      )
      }
    </>
  )
}