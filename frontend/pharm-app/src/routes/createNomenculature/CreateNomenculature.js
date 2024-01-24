import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CreateNomenculatureForm from "./CreateNomenculatureForm";

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

export default function CreateNomenculature() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <React.Fragment>
      <Container component="main">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 } }}>
          <Typography component="h1" variant="h4" align="center">
            Создание номенкулатуры
          </Typography>
          <CreateNomenculatureForm />
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
