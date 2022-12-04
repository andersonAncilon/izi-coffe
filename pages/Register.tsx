import { Button, Grid, Input, Loading, Modal, useInput, Text, Link, Row, Card } from "@nextui-org/react";
import { ApolloProvider, gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    insert_user_one(object: {name: $name, email: $email, password: $password}) {
      id
    }
  }
`;
export default function Register() {
    const { value, reset, bindings } = useInput("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmationPassword, setConfirmationPassword] = useState("")
    const [register, { data, loading, error }] = useMutation(REGISTER);

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const handleRegister = () => {
        const user = { name }
        localStorage.setItem("user", JSON.stringify(user))
        register({
            variables: {
                name, email, password
            }
        })
    }

    const helper = React.useMemo(() => {
        if (!value)
            return {
                text: "",
                color: "",
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "Correct email" : "Enter a valid email",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    return (
        <Grid.Container justify="center" alignContent="center" css={{ height: "100%" }} gap={1}>
            <Row justify="center">
                <Card css={{ p: "$6", mw: "85%" }} variant="flat">
                    <Card.Header>
                        <img
                            alt="nextui logo"
                            src="https://cdn-icons-png.flaticon.com/512/3054/3054889.png"
                            width="34px"
                            height="34px"
                        />
                        <Grid.Container css={{ pl: "$6" }}>
                            <Grid xs={12}>
                                <Text h4 css={{ lineHeight: "$xs" }}>
                                    Izi Coffe
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                        <Text>
                            Faça seu cadastro para continuar
                        </Text>
                    </Card.Body>
                </Card>
            </Row>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={loading}
                onClose={() => { }}
            >
                <Modal.Header justify="center">
                    <Text size={18}>
                        Carregando...
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Loading />
                </Modal.Body>
            </Modal>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={data}
                onClose={() => { }}
            >
                <Modal.Header justify="center">
                    <Text size={18}>
                        Sucesso ao criar conta!
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Row justify="center">
                        <Link href="/">
                            <Button size="md" bordered css={{ marginTop: "1rem" }}>Continuar</Button>
                        </Link>
                    </Row>
                </Modal.Body>
            </Modal>

            <style global jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                    height: 100%;
                }
            `}</style>
            <Grid xs={12} justify="center">
                <Input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Digite seu nome"
                    type="search"
                    size="lg"
                    css={{ width: "85%", marginTop: "1rem", textAlign: 'center' }}
                />
            </Grid>
            <Grid xs={12} justify="center">
                <Input
                    {...bindings}
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={helper.color}
                    color={helper.color}
                    helperColor={helper.color}
                    helperText={helper.text}
                    type="email"
                    placeholder="Digite seu e-mail"
                    size="lg"
                    css={{ width: "85%", marginTop: "0.5rem", textAlign: 'center' }}
                />
            </Grid>
            <Grid xs={12} justify="center">
                <Input
                    placeholder="Digite seu endereço completo"
                    type="search"
                    size="lg"
                    css={{ width: "85%", marginTop: "1rem", textAlign: 'center' }}
                />
            </Grid>
            <Grid xs={12} justify="center">
                <Input.Password
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    clearable
                    placeholder="Digite sua senha"
                    size="lg"
                    css={{ width: "85%", marginTop: "0.5rem", textAlign: 'center' }}
                />
            </Grid>
            <Grid xs={12} justify="center">
                <Input.Password
                    clearable
                    placeholder="Confirme sua senha"
                    color={password === confirmationPassword ? "success" : "error"}
                    helperColor={password === confirmationPassword ? "success" : "error"}
                    helperText={password === confirmationPassword ? "" : "Confirme as senhas"}
                    value={confirmationPassword}
                    onChange={({ target }) => setConfirmationPassword(target.value)}
                    size="lg"
                    css={{ width: "85%", marginTop: "0.5rem", textAlign: 'center' }}
                />
            </Grid>
            <Grid xs={12} justify="center">
                <Button size="md" bordered css={{ marginTop: "1rem" }} onPress={handleRegister}>Cadastrar-se</Button>
            </Grid>
        </Grid.Container >
    )
}