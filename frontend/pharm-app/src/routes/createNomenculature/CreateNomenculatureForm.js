import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { SEVER_REQUESTS, PORT } from "../../helpers/constants";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { makeStyles } from "@mui/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const initialNomenculature = {
  nomenculatureCode: "",
  nomenculatureName: "",
  consignmentId: "",
  consignmentNumber: 0,
  series: "",
  manufacturer: "",
  bestBeforeDate: "",
  receiptDate: "",
  count: 0,
};

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      padding: 0,
      paddingLeft: 15,
      marginLeft: 15,
      "& .MuiButtonBase-root": {
        padding: 1,
        paddingLeft: 10,
        marginLeft: 15,
      },
      "& .MuiInputBase-input": {
        padding: 15,
        paddingLeft: 5,
        marginLeft: 15,
      },
    },
  },
});

//todo: 2 и более заказов , где взять mmake styles ?

export default function CreateNomenculatureForm() {
  const [consCount, setConsCount] = React.useState(0);
  const [consIds, setConsIds] = React.useState([]);
  const [nomenculature, setNomenculature] =
    React.useState(initialNomenculature);

  const classes = useStyles();

  React.useEffect(() => {
    const nomenculatureId = uuidv4();
    const consignmentId = uuidv4();
    setNomenculature({
      ...nomenculature,
      nomenculatureId: nomenculatureId,
      consignmentId: consignmentId,
    });
  }, []);
  // const [consignment, setConsignment] = React.useState(initialConsignment);

  // const handleNext = () => {
  //   const tempIds = consIds;
  //   tempIds.push(uuidv4());
  //   setConsIds(tempIds);
  //   setConsCount(consCount + 1);
  // };

  // const handleDelete = (id) => {
  //   const tempIds = consIds.filter(function (item) {
  //     return item !== id;
  //   });
  //   setConsIds(tempIds);
  //   setConsCount(consCount - 1);
  // };

  const handleCreate = () => {
    console.log(nomenculature);
    axios
      .post(
        `http://localhost:${PORT}${SEVER_REQUESTS.createNomenculature}/`,
        nomenculature
      )
      .then((response) => {
        // this.setState({ articleId: response.data.id })
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} justifyContent={"center"} xs={12}>
        <Grid item xs={12}>
          <TextField
            required
            id="nomId"
            name="nomId"
            label="Код нуменкулатуры"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(event) =>
              setNomenculature({
                ...nomenculature,
                nomenculatureCode: event.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="nomName"
            name="nomName"
            label="Название номенкулатуры"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            sx={{ mb: 1 }}
            onChange={(event) =>
              setNomenculature({
                ...nomenculature,
                nomenculatureName: event.target.value,
              })
            }
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          sx={{
            backgroundColor: "#cffcda",
            border: 1,
            borderRadius: 3,
            ml: 2,
            justifyContent: "center",
            mt: 2,
          }}>
          <Typography>Партия</Typography>
          <Grid item xs={12} sx={{ mt: -3 }}>
            <TextField
              required
              id="consId"
              name="consId"
              label="Номер партии"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              sx={{ width: "95%" }}
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  consignmentNumber: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="series"
              name="series"
              label="Серия"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              sx={{ width: "95%" }}
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  series: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="manufacturer"
              name="manufacturer"
              label="Производитель"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              sx={{ width: "95%" }}
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  manufacturer: event.target.value,
                })
              }
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "space-between",
            }}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]} sx={{ ml: "5%" }}>
                  <DatePicker
                    label="Срок годности"
                    slotProps={{ textField: { variant: "standard" } }}
                    sx={{ width: "95%" }}
                    onChange={(value) => {
                      console.log(value);
                      setNomenculature({
                        ...nomenculature,
                        bestBeforeDate: value,
                      })
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]} >
                  <DatePicker
                    label="Дата прихода"
                    slotProps={{ textField: { variant: "standard" } }}
                    sx={{ width: "95%" }}
                    onChange={(value) => {
                      console.log(value);
                      setNomenculature({
                        ...nomenculature,
                        receiptDate: value,
                      })
                    }}
                    
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="count"
              name="count"
              label="Остаток"
              sx={{ mb: 3, width: "95%" }}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  count: event.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        {/* {consCount > 0 &&
          consIds.map((consId) => (
            <Grid key={consId} container item spacing={3}>
              <Grid
                item
                container
                xs={12}
                sx={{
                  backgroundColor: "#cffcda",
                  border: 1,
                  borderRadius: 3,
                  ml: 2,
                  mt: 2,
                  justifyContent: "center",
                }}>
                <Typography>Партия</Typography>
                <Grid item xs={12} sx={{ mt: -4 }}>
                  <TextField
                    required
                    id="consId"
                    name="consId"
                    label="Номер партии"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    sx={{ mt: 2 }}
                    onChange={(event) =>
                      setConsignment({
                        ...consignment,
                        consignmentNumber: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="series"
                    name="series"
                    label="Серия"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(event) =>
                      setConsignment({
                        ...consignment,
                        series: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="manufacturer"
                    name="manufacturer"
                    label="Производитель"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(event) =>
                      setConsignment({
                        ...consignment,
                        manufacturer: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="bestBeforeDate"
                    name="bestBeforeDate"
                    label="Срок годности"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(event) =>
                      setConsignment({
                        ...consignment,
                        bestBeforeDate: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="receiptDate"
                    name="receiptDate"
                    label="Дата прихода"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(event) =>
                      setConsignment({
                        ...consignment,
                        receiptDate: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="count"
                    name="count"
                    label="Остаток"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    sx={{ mb: 3 }}
                    onChange={(event) =>
                      setConsignment({
                        ...consignment,
                        count: event.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={(e) => handleDelete(consId)}
                  xs={2}>
                  {`Удалить дополнительную партию `}
                </Button>
              </Grid>
            </Grid>
          ))} */}
        {/* <Grid item>
          <Button startIcon={<AddIcon />} onClick={handleNext}>
            Добавить партию
          </Button>
        </Grid> */}
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{ mt: 3, ml: 1 }}>
          Создать
        </Button>
      </Grid>
    </React.Fragment>
  );
}
