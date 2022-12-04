import { Container, Avatar, Text, Row, Input, Grid } from "@nextui-org/react";
import { ProductCard } from "./components/ProductCard";
import { ApolloClient, ApolloProvider, gql } from "@apollo/client";
import client from "../apollo-client";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        product {
          id, name, description, value, image, value
        }
      }`
  })

  return {
    props: {
      products: data.product
    }
  }
}

export default function Home({ products }) {
  const [user, setUser] = useState()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])
  return (
    <Container fluid>
      {user && <Row justify="flex-start" css={{ marginTop: "2rem" }}>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="lg" />
        <Text h5 css={{ marginLeft: "0.5rem" }}>Olá,</Text>
        <Text h5 css={{ fontWeight: "bold" }}>{user.name}</Text>
      </Row>}
      <Row justify="center">
        <Input
          type="search"
          size="lg"
          css={{ width: "100%", marginTop: "1rem", textAlign: 'center' }}
        />
      </Row>
      <Grid.Container gap={0} justify="center" alignContent="center" css={{ marginTop: "1.5rem" }}>
        {
          products.map(({ id, name, value, image }) => <ProductCard key={id} id={id} name={name} image={image} value={value} />)
        }
      </Grid.Container>
    </Container>
  )
}
