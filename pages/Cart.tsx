import { gql } from "@apollo/client";
import { Button, Card, Checkbox, Grid, Input, Link, Loading, Modal, Row, Text } from "@nextui-org/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import client from "../apollo-client";
import { Mail } from "./components/Mail";
import { Password } from "./components/Password";


export default function Cart() {
    const [cart, setCart] = useState([])
    const [openLogin, setOpenLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassowrd] = useState("")
    const route = useRouter()

    const login = async () => {
        setLoading(true)
        const { data } = await client.query({
            query: gql`
            query MyQuery {
                user(where: {password: {_eq: "${password}"}, email: {_eq: "${username}"}}) {
                    id
                }
            }
            `
        })
        if (data) {
            setLoading(false)
            return route.push("/Revision")
        }
    }

    const calculate = () => {
        return cart.reduce((ac, item) => ac + item.quantity * parseFloat(item.value), 0)
    }

    const handleAuthentication = () => {
        if (localStorage.getItem("user")) return route.push("/Revision")
        return setOpenLogin(true)

    }

    useEffect(() => {
        // Perform localStorage action
        setCart(JSON.parse(localStorage.getItem("cart")))
        console.log(cart)
    }, [])

    return (
        <Grid.Container>
            <Row>
                <Card css={{ p: "$6", mw: "400px" }}>
                    <Card.Header>
                        <img
                            alt="nextui logo"
                            src="https://www.clipartmax.com/png/middle/470-4708030_my-order-svg-png-icon-free-download-my-order-icon-png.png"
                            width="34px"
                            height="34px"
                        />
                        <Grid.Container css={{ pl: "$6" }}>
                            <Grid xs={12}>
                                <Text h4 css={{ lineHeight: "$xs" }}>
                                    Detalhes do carrinho
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>

                </Card>
            </Row>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={openLogin}
                onClose={() => { }}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Para seguir com a compra
                        <Text b size={18}>
                            &nbsp;é necessário fazer login
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    {
                        loading ? (<Loading />) : (<><Input
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Email"
                            contentLeft={<Mail fill="currentColor" />}
                        />
                            <Input.Password
                                value={password}
                                onChange={({ target }) => setPassowrd(target.value)}
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                placeholder="Senha"
                                contentLeft={<Password fill="currentColor" />}
                            />
                            <Row justify="space-between">
                                <Checkbox>
                                    <Text size={14}>Lembrar de mim</Text>
                                </Checkbox>
                            </Row></>)
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={() => setOpenLogin(false)}>
                        Fechar
                    </Button>
                    <Button auto onClick={login}>
                        Entrar
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                cart.map((item, index) => (
                    <Grid xs={16} sm={2} key={index} css={{ margin: "0.5rem" }}>
                        <Card isPressable>
                            <Card.Body css={{ p: 0 }}>
                                <Card.Image
                                    src={item.image}
                                    objectFit="contain"
                                    width="60%"
                                    height={80}
                                    alt={item.image}
                                />
                            </Card.Body>
                            <Card.Footer css={{ justifyItems: "flex-start" }}>
                                <Row wrap="wrap" justify="space-between" align="center">
                                    <Row>
                                        <Text weight="bold">{item.name}</Text>
                                    </Row>
                                    <Row wrap="wrap" justify="space-between" align="center">
                                        <Text>Valor</Text>
                                        <Text css={{ fontWeight: "$bold", fontSize: "$sm" }}>
                                            R$ {item.value}
                                        </Text>
                                    </Row>
                                    <Row wrap="wrap" justify="space-between" align="center">
                                        <Text>Quantidade</Text>
                                        <Text css={{ fontWeight: "$bold", fontSize: "$sm" }}>
                                            {item.quantity}
                                        </Text>
                                    </Row>
                                    <Row wrap="wrap" justify="space-between" align="center">
                                        <Text>Subtotal</Text>
                                        <Text css={{ fontWeight: "$bold", fontSize: "$sm" }}>
                                            R$ {item.quantity * parseFloat(item.value)}
                                        </Text>
                                    </Row>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Grid>
                ))
            }
            <Row css={{ margin: "1rem" }}>
                <Row wrap="wrap" justify="space-between" align="center">
                    <Text size={18} weight="bold">Total</Text>
                    <Text css={{ fontWeight: "$bold", fontSize: "$md" }}>
                        R$ {calculate()}
                    </Text>
                </Row>
            </Row>

            <Row justify='center' css={{ marginTop: "1rem" }}>
                <Button size="lg" rounded color="secondary" onPress={() => handleAuthentication()}>
                    <Text
                        css={{ color: "inherit" }}
                        size={14}
                        weight="bold"
                        transform="uppercase"
                    >
                        Finalizar compra
                    </Text>
                </Button>
            </Row>
        </Grid.Container >
    )
}