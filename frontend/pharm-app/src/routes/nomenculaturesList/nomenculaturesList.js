import React, { useState, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import NomenculaturesTableComponent from "./nomenculaturesTableComponent";
import Container from "@mui/material/Container";
import axios from 'axios';
import { BASE_URL, ROUTES_LIST, PORT } from '../../helpers/constants';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Medilon
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function NomenculaturesList() {

  const [nomenculatures, setNomenculatures] = React.useState(null);

  React.useEffect(() => {
    axios.get(`http://localhost:${PORT}${ROUTES_LIST.nomenculatureList}`).then((response) => {
      setNomenculatures(response.data);
    });
  }, []);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        maxWidth="lg"
        sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 } }}>
        {" "}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <NomenculaturesTableComponent nomenculatures={nomenculatures}/>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
