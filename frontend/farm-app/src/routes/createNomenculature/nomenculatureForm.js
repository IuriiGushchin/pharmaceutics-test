import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import { v4 as uuidv4 } from "uuid";

export default function AddressForm() {
  const [consCount, setConsCount] = React.useState(0);
  const [consIds, setConsIds] = React.useState([]);

  const handleNext = () => {
    const tempIds = consIds;
    tempIds.push(uuidv4());
    setConsIds(tempIds);
    setConsCount(consCount + 1);
  };

  const handleDelete = (id) => {
    const tempIds = consIds.filter(function (item) {
      return item !== id;
    });
    setConsIds(tempIds);
    setConsCount(consCount - 1);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nomId"
            name="nomId"
            label="Номер нуменкулатуры"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nomName"
            name="nomName"
            label="Название номенкулатуры"
            fullWidth
            autoComplete="family-name"
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
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        {consCount > 0 &&
          consIds.map((consId) => (
            <Grid key={consId} container item spacing={3}>
              <Grid item xs={10}>
                <TextField
                  required
                  id={consId}
                  name={consId}
                  label="Номер партии"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <RemoveIcon onClick={e => handleDelete(consId)} xs={2} />
              </Grid>
            </Grid>
          ))}
        <Grid item>
          <AddIcon onClick={handleNext} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
