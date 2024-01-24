import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import axios from 'axios';
import { PORT} from '../../helpers/constants';

import NomencTable from './TableComponent';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="http://e.medilon.ru">
        Medilon
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function NomenculaturesList() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(`http://localhost:${PORT}/nomenculatures`).then((response) => {
      setData(response.data);
    });
  }, []);

  console.log(data)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        maxWidth="lg"
        sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 } }}>
        {" "}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <NomencTable nomenculatures = {data}/>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
