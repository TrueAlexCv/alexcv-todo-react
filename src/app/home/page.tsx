"use client";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import AddItem from "../components/AddItem";
import List from "../components/List";
import { ListProvider } from "../services/ListContext";

export default function Home() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">TO-DO en React</Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" sx={{ mt: 4 }}>
                <ListProvider>
                    <AddItem />
                    <List />
                </ListProvider>
            </Container>

            <Box component="footer" sx={{ textAlign: "center", mt: 4, p: 2 }}>
                Diseñado por Alex Calvo Vergara
            </Box>
        </>
    );
}
