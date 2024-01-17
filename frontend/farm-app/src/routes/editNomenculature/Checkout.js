import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./nomenculatureForm";
import { v4 as uuidv4 } from "uuid";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function Checkout() {

  const id=uuidv4()
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="100%" sx={{ mb: 10 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 9 }, p: { xs: 9 }}}>
          <Typography component="h1" variant="h4" align="center"  sx={{mb: 4}}>
            {`Правка номенкулатуры ${id}`}
          </Typography>
          <AddressForm id={id}/>

          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 3, ml: 1 }}>
            Next
          </Button>
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
