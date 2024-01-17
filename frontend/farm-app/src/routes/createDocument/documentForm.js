import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function DocumentForm(document) {
  const [value, setValue] = React.useState();

  const initialDocument = {
    isIncome: true,
    isNewProductsOutcoming: true,

    // docNumber: "",
    docDate: Date,

    // numenculatureNumber: "",
    // numenculatureName: "",
    // partionNumber: 0,
    // partionSeries: "",
    // partionManufacturrer: "",
    partionExpDate: "",
    partionIncomeDate: "",
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid
          item
          container
          spacing={3}
          xs={12}
          display={"flex"}
          alignItems={"right"}>
          <Grid item xs={6}>
            <TextField
              required
              id="docId"
              name="docId"
              label="Номер документа"
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item container xs={6} alignItems={"flex-end"}>
            <Grid item xs={4} >
              <Typography >Дата документа:</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                id="docDate"
                name="docDate"
                fullWidth
                variant="standard"
                type="date"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="numId"
            name="numId"
            label="Номер нуменкулатуры"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="numId"
            name="numId"
            label="Название нуменкулатуры"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="consId"
            name="consId"
            label="Номер партии"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="consId"
            name="consId"
            label="Серия партии"
            fullWidth
            variant="standard"
          />
        </Grid>
          
        <Grid item xs={12}>
          <TextField
            required
            id="consId"
            name="consId"
            label="Производитель партии"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item container xs={6} alignItems={"flex-end"} >
            <Grid item xs={4} >
              <Typography align="left" >Дата прихода:</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                id="incomeDate"
                name="incomeDate"
                fullWidth
                variant="standard"
                type="date"
              />
            </Grid>
          </Grid>

          <Grid item container xs={6} alignItems={"flex-end"}>
            <Grid item xs={4} >
              <Typography >Срок годности:</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                id="expirationDate"
                name="expirationDate"
                fullWidth
                variant="standard"
                type="date"
              />
            </Grid>
          </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="productCount"
            name="productCount"
            label="Количество товара"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
