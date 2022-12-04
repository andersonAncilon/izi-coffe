import { Button, Card, Grid, Link, Row, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function getStaticProps() {
    let orderNumber = (Math.floor(Math.random() * 100) + 1).toFixed(0)

    return {
        props: {
            orderNumber
        }
    }
}

export default function Revision({ orderNumber }: any) {
    const [cart, setCart] = useState([])

    const calculate = () => {
        return cart.reduce((ac, item: any) => ac + item.quantity * parseFloat(item.value), 0)
    }

    useEffect(() => {
        // Perform localStorage action
        try {
            setCart(JSON.parse(localStorage.getItem("cart") || ""))
        } catch (error) {

        }

        localStorage.setItem("order", orderNumber)
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
                                    Revise seu pedido
                                </Text>
                            </Grid>
                            <Grid xs={12}>
                                <Text css={{ color: "$accents8" }}>Nº {orderNumber}</Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                        <Text>
                            Make beautiful websites regardless of your design experience.
                        </Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row wrap="wrap" justify="space-between" align="center">
                            <Text>Valor total</Text>
                            <Text css={{ fontWeight: "$bold", fontSize: "$sm" }}>
                                R$ {calculate()}
                            </Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Row>
            <Row>
                <Card css={{ p: "$6", mw: "400px" }} variant="flat">
                    <Card.Header>
                        <img
                            alt="nextui logo"
                            src="https://www.pngfind.com/pngs/m/140-1407971_back-payment-payment-icon-png-transparent-png-download.png"
                            width="34px"
                            height="34px"
                        />
                        <Grid.Container css={{ pl: "$6" }}>
                            <Grid xs={12}>
                                <Text h4 css={{ lineHeight: "$xs" }}>
                                    Pagamento
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                        <Text>
                            Em dinheiro na entrega
                        </Text>
                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
            </Row>
            <Row>
                <Card css={{ p: "$6", mw: "400px" }} >
                    <Card.Header>
                        <img
                            alt="nextui logo"
                            src="https://w1.pngwing.com/pngs/546/859/png-transparent-food-icon-delivery-icon-sushi-pizza-delivery-scooter-courier-food-delivery-text-thumbnail.png"
                            width="34px"
                            height="34px"
                        />
                        <Grid.Container css={{ pl: "$6" }}>
                            <Grid xs={12}>
                                <Text h4 css={{ lineHeight: "$xs" }}>
                                    Entrega
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                        <Text>
                            Rua Professor José Horácio, 890
                        </Text>
                    </Card.Body>
                    <Card.Footer>
                        <Text>
                            05630-090
                        </Text>
                    </Card.Footer>
                </Card>
            </Row>
            <Row justify='center' css={{ marginTop: "1rem" }}>
                <Link href="/Finish">
                    <Button size="lg" rounded color="secondary" >
                        <Text
                            css={{ color: "inherit" }}
                            size={14}
                            weight="bold"
                            transform="uppercase"
                        >
                            Finalizar compra
                        </Text>
                    </Button>
                </Link>
            </Row>
        </Grid.Container >
    )
}