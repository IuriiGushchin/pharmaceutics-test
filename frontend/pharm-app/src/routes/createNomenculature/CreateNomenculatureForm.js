import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { SERVER_REQUESTS, PORT } from "../../helpers/constants";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useLabelState from "../../helpers/useLabelState";

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

//todo: 2 и более заказов - ?
export default function CreateNomenculatureForm() {
  const [nomenculature, setNomenculature] =
    React.useState(initialNomenculature);

  const [errors, setErrors] = React.useState(null);
  const [schema] = useLabelState(
    yup.object().shape({
      nomenculatureCode: yup.string().required("* Обязательно"),
      nomenculatureName: yup.string().required("* Обязательно"),
      consignmentNumber: yup
        .number()
        .required()
        .positive("Должно быть положительным")
        .integer(),
      series: yup.string().required("* Обязательно"),
      manufacturer: yup.string().required("* Обязательно"),
      bestBeforeDate: yup
        .date()
        .required("* Обязательно")
        .typeError("Некорректная дата"),
      receiptDate: yup
        .date()
        .required("* Обязательно")
        .typeError("Некорректная дата"),
      count: yup
        .number()
        .required()
        .positive("Должно быть положительным")
        .integer(),
    }),
    "schema"
  );

  React.useEffect(() => {
    const nomenculatureId = uuidv4();
    const consignmentId = uuidv4();
    setNomenculature({
      ...nomenculature,
      nomenculatureId: nomenculatureId,
      consignmentId: consignmentId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Для возможного варианта создания нескольких партий одновременно
  // const [consCount, setConsCount] = React.useState(0);
  // const [consIds, setConsIds] = React.useState([]);

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

  const handleCreate = async () => {
    try {
      await schema.validateSync(nomenculature, { abortEarly: false });
    } catch (error) {
      console.log(error.inner);
      const errorMap = {};
      if (!error.inner) {
        throw error;
      }
      error.inner.forEach((e) => {
        console.log(e);
        errorMap[e.path] = e.message;
      });
      setErrors(errorMap);
      console.error(errorMap, "errors");
      return;
    }
    axios
      .post(
        `http://localhost:${PORT}${SERVER_REQUESTS.createNomenculature}/`,
        nomenculature
      )
      .then((response) => {
        if (!alert("Succied!")) {
          window.location.reload();
        }
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12}>
          <TextField
            // error={"fdsafsad"}
            error={errors && errors["nomenculatureCode"]}
            helperText={errors && errors["nomenculatureCode"]}
            // helperText={"Обязательно"}
            // required
            id="nomId"
            name="nomId"
            label="Код номенкулатуры"
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
            error={errors && errors["nomenculatureName"]}
            helperText={errors && errors["nomenculatureName"]}
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
              error={errors && errors["consignmentNumber"]}
              helperText={errors && errors["consignmentNumber"]}
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
              error={errors && errors["series"]}
              helperText={errors && errors["series"]}
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
              error={errors && errors["manufacturer"]}
              helperText={errors && errors["manufacturer"]}
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
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]} sx={{ ml: "5%" }}>
                  <DatePicker
                    label="Срок годности"
                    format="DD/MM/YYYY"
                    render
                    slotProps={{
                      textField: {
                        variant: "standard",
                        error: !!errors && !!errors["bestBeforeDate"],
                        helperText: errors && errors["bestBeforeDate"],
                      },

                      // helperText={errors && errors["manufacturer"]}
                    }}
                    sx={{ width: "95%", overflow: 'hidden'  }}
                    onChange={(value) => {
                      setNomenculature({
                        ...nomenculature,
                        bestBeforeDate: value,
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]}>
                  <DatePicker
                    label="Дата прихода"
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        variant: "standard",
                        error: !!errors && !!errors["receiptDate"],
                        helperText: errors && errors["receiptDate"],
                      },
                    }}
                    sx={{ width: "95%", overflow: 'hidden'  }}
                    onChange={(value) => {
                      console.log(value);
                      setNomenculature({
                        ...nomenculature,
                        receiptDate: value,
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors && errors["count"]}
              helperText={errors && errors["count"]}
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
                  count: Number(event.target.value),
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
