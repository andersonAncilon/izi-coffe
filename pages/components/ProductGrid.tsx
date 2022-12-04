import { Grid } from "@nextui-org/react"


export const ProductGrid = ({ children }: any) => {
    return (
        < Grid xs={12} sm={4} css={{ marginBottom: "0.5rem" }
        } justify="space-between" >{[...children]}</Grid>
    )
}