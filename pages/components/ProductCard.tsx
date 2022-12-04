import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import Link from 'next/link'

export interface ProductCardProps {
    id: number;
    name: string;
    image: string;
    value: string;
}

export const ProductCard = ({ id, name, image, value }: ProductCardProps) => (
    <Card css={{ w: "45%", h: "13rem", marginRight: "1rem", marginBottom: "1rem" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
                <Text h5 color="black">
                    {name}
                </Text>
            </Col>
        </Card.Header>
        <Card.Body css={{ p: 0, justifyContent: 'center' }}>
            <Card.Image
                src={image}
                width="100%"
                height="50%"
                objectFit="fill"
                alt="Card example background"
            />
        </Card.Body>
        <Card.Footer
            isBlurred
            css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
            }}
        >
            <Row>
                <Col>
                    <Row justify="center" align="center">
                        <Text color="#000" size={14} weight="bold">
                            R$ {value}
                        </Text>
                    </Row>
                </Col>
                <Col>
                    <Row justify="flex-end">
                        <Link href={`/productDetails/${id}`}>
                            <Button flat auto rounded color="secondary">
                                <Text
                                    css={{ color: "inherit" }}
                                    size={10}
                                    weight="bold"
                                    transform="uppercase"
                                >
                                    Buy
                                </Text>
                            </Button>
                        </Link>
                    </Row>
                </Col>
            </Row>
        </Card.Footer>
    </Card>
);
