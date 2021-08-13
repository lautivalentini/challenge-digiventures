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
  const toast = useToast()
  const router = useRouter()
  const { path } = router.query
  
  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value || e.target.checked
    setInformation({
      ...information,
      [name]: value
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/${path}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(information)
    })
    const data = await response.json();
    toast({
      position: "top",
      title: data.msg,
      status: "success",
      duration: 1000,
      isClosable: true,
    })
  }
  
  return (
    <Container minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Stack width="100%">
        <Text fontSize="30px" fontWeight="bold" textAlign="center">{data?.title}</Text>
        <Stack as="form" onSubmit={onSubmit}>
          {data?.inputs.map(({ type, name, label, regex, target, required, text, options, to }, index) => {
            if (
              (type === 'password' || 
              type === 'text') &&
              name !== 'custom_country'
            ) return (
              <Input
                key={index}
                type={type}
                name={name} 
                label={label} 
                handleChange={handleChange} 
                required={required} 
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
              />
            )
            if (
              type === 'text' && 
              name === 'custom_country' && 
              information?.country === 'other'
            ) return (
              <Input
                key={index}
                type={type}
                name={name} 
                label={label} 
                handleChange={handleChange} 
                required={required} 
              />
            )
            if (type === 'button') return <Button key={index} label={label} />
            if (type === 'checkbox') return <Checkbox key={index} label={label} handleChange={handleChange} />
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
      { params: { path: '/login' } },
      { params: { path: '/register' } }
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { path } = context.params
  const res = await fetch(`http://localhost:3000/configuration/${path}`)
  const data = await res.json()

  if (res.status === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data },
    revalidate: 1,
  }
}
