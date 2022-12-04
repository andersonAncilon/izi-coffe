import { useRouter } from 'next/router'
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { GetStaticPaths } from 'next';
import { Button, Card, Col, Container, Grid, Link, Row, Text } from '@nextui-org/react';
import { useState } from 'react';

export const getServerSideProps = async (context) => {
    const { data } = await client.query({
        query: gql`
      query MyQuery {
        product(where: {id: {_eq: ${context.params.id}}}) {
          id, name, value, image, value, fullDescription
        }
      }`
    })

    return {
        props: {
            product: data.product[0]
        }
    }
};

export default function ProductDetail({ product: { id, name, fullDescription, image, value } }) {
    const [quantity, setQuantity] = useState(1)

    const handleCartItem = () => {
        const product = { id, name, image, value, quantity }
        let cart = localStorage.getItem("cart")
        if (!cart) return localStorage.setItem("cart", JSON.stringify([product]))
        cart = JSON.parse(cart)
        cart = [...cart, product]
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    const handleSetItem = (value: number) => {
        if (quantity == 1 && value < 0) return
        return setQuantity(quantity + value)
    }

    return (
        <Grid.Container css={{ backgroundColor: 'white', height: "100vh" }} justify="center">
            <style global jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                    height: 100%;
                }
            `}</style>
            <Row>
                <Card>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    </Card.Header>
                    <Card.Image
                        src={image}
                        objectFit="cover"
                        width="100%"
                        height={300}
                        alt="Card image background"
                    />
                </Card>
            </Row>
            <Row justify='flex-start' css={{ backgroundColor: 'white', marginLeft: "1rem" }}>
                <Text h4 color="black" weight="bold">
                    {name}
                </Text>
            </Row>
            <Row css={{ backgroundColor: 'white', marginLeft: "1rem", marginRight: "1rem" }} justify='flex-start'>
                <Text h6 color="black">
                    {fullDescription}
                </Text>
            </Row>
            <Row css={{ backgroundColor: 'white', marginLeft: "1rem", marginTop: "1rem" }} justify='flex-start'>
                <Text h4 color="black" weight="bold">
                    R$ {value}
                </Text>
            </Row>
            <Row justify='center' align='center'>
                <Button
                    onPress={() => handleSetItem(+1)}
                    auto
                    rounded
                    color="error"
                    icon={<Text weight="bold" color='white' size={32} css={{ marginBottom: "0.2rem" }} >+</Text>}
                />
                <Text weight="bold" size={24} css={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>{quantity}</Text>
                <Button
                    onPress={() => handleSetItem(-1)}
                    auto
                    rounded
                    color="error"
                    icon={<Text weight="bold" color='white' size={32} css={{ marginBottom: "0.2rem" }} >-</Text>}
                />
            </Row>
            <Row justify='center' css={{ marginTop: "1rem" }}>
                <Link href={`/Cart`}>
                    <Button size="lg" rounded color="secondary" onPress={() => handleCartItem()}>
                        <Text
                            css={{ color: "inherit" }}
                            size={14}
                            weight="bold"
                            transform="uppercase"
                        >
                            Adicionar ao carrinho
                        </Text>
                    </Button>
                </Link>
            </Row>
        </Grid.Container>
    )
}