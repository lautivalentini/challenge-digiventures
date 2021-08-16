import { useState } from "react";
import { useRouter } from 'next/router'

import { 
  Container,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'
import Link from '../components/Link'
import Checkbox from '../components/Checkbox'

export default function Page({ data }) {
  const [information, setInformation] = useState({})
  const [errors, setErrors] = useState({})
  const toast = useToast()
  const router = useRouter()
  const { path } = router.query
  
  function handleChange(name, value, error) {
    setInformation({ ...information, [name]: value })
    setErrors({ ...errors, [name]: error })
  }

  async function onSubmit(e) {
    e.preventDefault()
    for (const error in errors) {
      if (errors[error]) {
        toast({
          position: "top",
          title: 'Check all your fields',
          status: "warning",
          duration: 1000,
          isClosable: true,
        })
        return
      }
    }
    try {
      const response = await fetch(`http://localhost:3000/${path}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(information),
      })
      const data = await response.json();
      toast({
        position: "top",
        title: data.msg,
        status: data.account ? "success" : "warning",
        duration: 1000,
        isClosable: true,
      })
    } catch(e) {
      console.log(e)
    }
  }
  
  return (
    <Container minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Stack width="100%">
        <Text fontSize="30px" fontWeight="bold" textAlign="center">{data?.title}</Text>
        <Stack as="form" onSubmit={onSubmit}>
          {data?.inputs.map(({ 
            type, 
            name, 
            label, 
            regex, 
            target, 
            required, 
            text, 
            options, 
            to, 
            conditions = { validations: [], render: [] } 
          }, index) => {
            if (
              type === 'password' || 
              type === 'text' || 
              type === 'email'
            ) return (
              <Input
                key={index}
                type={type}
                name={name} 
                label={label} 
                handleChange={handleChange} 
                required={required}
                regex={regex}
                conditions={conditions}
                information={information}
                errors={errors}
                setErrors={setErrors}
              />
            )
            if (type === 'select') return (
              <Select
                key={index}
                required={required} 
                name={name} 
                label={label} 
                handleChange={handleChange} 
                options={options}
                errors={errors}
              />
            )
            if (type === 'button') return <Button key={index} label={label} />
            if (type === 'checkbox') return (
              <Checkbox 
                key={index} 
                label={label}
                name={name}
                required={required}
                handleChange={handleChange}
                errors={errors}
              />
            )
            if (type === 'link') return <Link key={index} target={target} to={to} text={text} />
          })}
        </Stack>
      </Stack>
    </Container>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: 'login' } },
      { params: { path: 'register' } }
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { path } = context.params
  const res = await fetch(`http://localhost:3000/configuration/${path}`)
  const data = await res.json()

  return {
    props: { data },
    revalidate: 3600,
  }
}
