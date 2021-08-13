import { 
  Link,
} from "@chakra-ui/react";

export default function CustomLink({ target, to, text }) {
  return (
    <Link
      target={target}
      href={to}
    >
      { text }
    </Link>
  )
}