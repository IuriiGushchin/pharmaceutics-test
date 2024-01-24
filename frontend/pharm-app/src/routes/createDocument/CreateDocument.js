import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import DocumentForm from "./documentForm";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

const StyledSelect = styled(Select)`
  text-align: left;
`;


const initialDocument = {
  docNumber: "",
  docDate: Date,
  isIncome: true,
  isNewProductsOutcoming: true,
  numenculatureNumber: "",
  numenculatureName: "",
  partionNumber: 0,
  partionSeries: "",
  partionManufacturrer: "",
  partionExpDate: "",
  partionIncomeDate: ""
}

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
  const [activeStep, setActiveStep] = React.useState(0);
  const [isDocTypeIncome, setIsDoctypeIncome] = React.useState(true);
  const [isNewProductsOutcoming, setIsNewProductsOutcoming] = React.useState(true)
  const [document, setDocument] = React.useState(initialDocument)

  const handleNext = () => {


    setActiveStep(activeStep + 1);
  };

  const handleDocTypeChange = (event) => {
    setDocument({...document , isIncome: event.target.value})
    setIsDoctypeIncome(event.target.value);
  };
  
  const handleProductOutcomeType = (event) => {
    setDocument({...document , isNewProductsOutcoming: event.target.value})
    setIsNewProductsOutcoming(event.target.value);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xl">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 } }}>
          <Typography component="h1" variant="h4" align="center">
            {`Документ`}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} mb={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Тип документа</InputLabel>
                <StyledSelect
                  value={isDocTypeIncome}
                  onChange={handleDocTypeChange}
                  label="Тип документа">
                  <MenuItem value={true}>Поступление</MenuItem>
                  <MenuItem value={false}>Реализация</MenuItem>
                </StyledSelect>
              </FormControl>
            </Grid>
            {!isDocTypeIncome && (
              <Grid item xs={6} sm={6} mb={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Тип отгрузки</InputLabel>
                <StyledSelect
                  value={isNewProductsOutcoming}
                  onChange={handleProductOutcomeType}
                  label="Вид отгрузки">
                  <MenuItem value={true}>Старый товар</MenuItem>
                  <MenuItem value={false}>Новый товар</MenuItem>
                </StyledSelect>
              </FormControl>
            </Grid>
            )}
            
          </Grid>
          <DocumentForm document={document} />

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
