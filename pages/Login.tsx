import { Button, Container, Grid, Input, Row } from "@nextui-org/react";

export default function Login() {
    return (
        <Grid.Container justify="center" alignContent="center" css={{ height: "100%" }} >
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
                    placeholder="Digite seu nome de usuário"
                    type="search"
                    size="lg"
                    css={{ width: "85%", marginTop: "1rem", textAlign: 'center' }}
                />
            </Grid>
            <Grid xs={12} justify="center">
                <Input
                    placeholder="Digite sua senha"
                    type="search"
                    size="lg"
                    css={{ width: "85%", marginTop: "0.5rem", textAlign: 'center' }}
                />
            </Grid>
            <Grid xs={12} justify="center">
                <Button size="md" bordered css={{ marginTop: "1rem" }}>Entrar</Button>
            </Grid>
        </Grid.Container >
    )
}