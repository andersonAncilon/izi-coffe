import { Button, Card, Grid, Link, Row, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Finish() {
    const [order, setOrder] = useState("")

    useEffect(() => {
        try {
            setOrder(localStorage.getItem("order") || "")
        } catch (error) {

        }

    }, [])

    return (
        <Grid.Container>
            <Row>
                <Card css={{ p: "$6", mw: "400px" }}>
                    <Card.Header>
                        <img
                            alt="nextui logo"
                            src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                            width="34px"
                            height="34px"
                        />
                        <Grid.Container css={{ pl: "$6" }}>
                            <Grid xs={12}>
                                <Text h4 css={{ lineHeight: "$xs" }}>
                                    Pedido realizado com sucesso
                                </Text>
                            </Grid>
                            <Grid xs={12}>
                                <Text css={{ color: "$accents8" }}>Nº { }</Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                        <Text>
                            Agora é só aguardo no conforto da sua casa!
                        </Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row wrap="wrap" justify="space-between" align="center">
                            <Text>Previsão de entrega: </Text>
                            <Text>{new Date().toLocaleDateString("pt-BR")}</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Row>
            <Row justify='center' css={{ marginTop: "1rem" }}>
                <Link href="/">
                    <Button size="lg" rounded color="secondary" >
                        <Text
                            css={{ color: "inherit" }}
                            size={14}
                            weight="bold"
                            transform="uppercase"
                        >
                            Continuar comprando
                        </Text>
                    </Button>
                </Link>
            </Row>
        </Grid.Container>
    )
}