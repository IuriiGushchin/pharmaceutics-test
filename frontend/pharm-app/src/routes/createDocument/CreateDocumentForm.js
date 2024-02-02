import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SERVER_REQUESTS, PORT } from "../../helpers/constants";
import axios from "axios";
import * as yup from "yup";

import useLabelState from "../../helpers/useLabelState";

const initialDocument = {
  documentId: "",
  isOutcome: true,
  outcomeTypeFIFO: true,
  documentNumber: "",
  documentDate: "",
  nomenculatureId: "",
  consignmentId: "",
};
const initialNomenculature = {
  nomenculatureCode: "",
  nomenculatureName: "",
  consignmentId: "",
  consignmentCode: 0,
  series: "",
  manufacturer: "",
  bestBeforeDate: "",
  receiptDate: "",
  count: 0,
};

export default function DocumentForm() {
  const [document, setDocument] = React.useState(initialDocument);
  const [nomenculature, setNomenculature] =
    React.useState(initialNomenculature);
  const [isDocTypeOutcome, setIsDoctypeOutcome] = React.useState(true);
  const [isNewProductsOutcoming, setIsNewProductsOutcoming] =
    React.useState(true);

  React.useEffect(() => {
    const documentId = uuidv4();
    const nomenculatureId = uuidv4();
    const consignmentId = uuidv4();
    setDocument({
      ...document,
      documentId: documentId,
      nomenculatureId: nomenculatureId,
      consignmentId: consignmentId,
    });

    setNomenculature({
      ...nomenculature,
      nomenculatureId: nomenculatureId,
      consignmentId: consignmentId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDocTypeChange = (event) => {
    setDocument({ ...document, isOutcome: event.target.value });
    setIsDoctypeOutcome(event.target.value);
  };

  const handleProductOutcomeType = (event) => {
    setDocument({ ...document, outcomeTypeFIFO: event.target.value });
    setIsNewProductsOutcoming(event.target.value);
  };

  const [errors, setErrors] = React.useState(null);
  const [nomenculatureSchema] = useLabelState(
    yup.object().shape({
      isIncome: yup.bool(),
      nomenculatureCode: yup.string().required("* Обязательно"),
      nomenculatureName: yup.string().required("* Обязательно"),
      consignmentCode: yup
        .number()
        .required()
        .positive("Должно быть положительным")
        .integer(),
      series: yup.string().required("* Обязательно"),
      manufacturer: yup.string().required("* Обязательно"),
      bestBeforeDate: yup.date().when("isIncome", (isIncome, schema) => {
        if (isIncome === true) {
          return schema
            .required("* Обязательно")
            .typeError("Некорректная дата");
        }
        return schema;
      }),
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
    "nomSchema"
  );
  const [documentSchema] = useLabelState(
    yup.object().shape({
      documentNumber: yup
        .number()
        .required()
        .positive("Должно быть положительным")
        .integer(),
      documentDate: yup
        .date()
        .required("* Обязательно")
        .typeError("Некорректная дата"),
    }),
    "docSchema"
  );

  const validation = async (schema, obj) => {
    try {
      await schema.validateSync(obj, { abortEarly: false });
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
      // setErrors(errorMap);
      console.error(errorMap, "errors");
      return errorMap;
    }
  };

  const handleCreate = async () => {
    console.log(nomenculature.isIncome);
    const docErrors = await validation(documentSchema, document);
    console.error(docErrors, "docErrors");
    const nomErrors = await validation(nomenculatureSchema, nomenculature);
    console.error(nomErrors, "nomErrors");

    if (docErrors || nomErrors) {
      var keys = Object.keys({ ...docErrors, ...nomErrors });
      var key = keys[0];

      if (keys.length === 1 && key === "bestBeforeDate" && isDocTypeOutcome) {
      } else {
        console.log({ ...docErrors, ...nomErrors }, "gbadflgdf");
        setErrors({ ...docErrors, ...nomErrors });
        return;
      }
    }
    console.log(nomenculature);
    console.log(document);
    console.log("document");
    axios
      .post(`http://localhost:${PORT}${SERVER_REQUESTS.documents}/`, {
        ...document,
        ...nomenculature,
      })
      .then(() => {
        if (!alert("Succied!")) {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e)
        alert(e.response.data.error.message)
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={6} sm={6} mb={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Тип документа</InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              value={isDocTypeOutcome}
              onChange={handleDocTypeChange}
              label="Тип документа">
              <MenuItem value={true}>Реализация</MenuItem>
              <MenuItem value={false}>Поступление</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {isDocTypeOutcome && (
          <Grid item xs={6} sm={6} mb={4}>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Тип отгрузки</InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                value={isNewProductsOutcoming}
                onChange={handleProductOutcomeType}
                label="Вид отгрузки">
                <MenuItem value={true}>Старый товар</MenuItem>
                <MenuItem value={false}>Новый товар</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3}>
        <Grid item container spacing={3} xs={12}>
          <Grid item xs={6}>
            <TextField
              required
              id="documentNumber"
              name="documentNumber"
              label="Номер документа"
              error={errors && errors["documentNumber"]}
              helperText={errors && errors["documentNumber"]}
              fullWidth
              variant="standard"
              onChange={(event) =>
                setDocument({
                  ...document,
                  documentNumber: event.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ pt: 0 }}>
                <DatePicker
                  name="documentDate"
                  label="Дата документа"
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      variant: "standard",
                      error: !!errors && !!errors["documentDate"],
                      helperText: errors && errors["documentDate"],
                    },
                  }}
                  sx={{ width: "100%", overflow: "hidden" }}
                  onChange={(value) =>
                    setDocument({
                      ...document,
                      documentDate: value,
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            error={errors && errors["nomenculatureCode"]}
            helperText={errors && errors["nomenculatureCode"]}
            id="nomenculatureCode"
            name="nomenculatureCode"
            label="Код номенкулатуры"
            fullWidth
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
            error={errors && errors["nomenculatureName"]}
            helperText={errors && errors["nomenculatureName"]}
            id="nomenculatureName"
            name="nomenculatureName"
            label="Название номенкулатуры"
            fullWidth
            variant="standard"
            onChange={(event) =>
              setNomenculature({
                ...nomenculature,
                nomenculatureName: event.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            error={errors && errors["consignmentNumber"]}
            helperText={errors && errors["consignmentNumber"]}
            id="consignmentNumber"
            name="consignmentNumber"
            label="Код партии"
            fullWidth
            variant="standard"
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
            error={errors && errors["series"]}
            helperText={errors && errors["series"]}
            id="series"
            name="series"
            label="Серия партии"
            fullWidth
            variant="standard"
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
            error={errors && errors["manufacturer"]}
            helperText={errors && errors["manufacturer"]}
            id="manufacturer"
            name="manufacturer"
            label="Производитель партии"
            fullWidth
            variant="standard"
            onChange={(event) =>
              setNomenculature({
                ...nomenculature,
                manufacturer: event.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={6} alignItems={"flex-end"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                name="receiptDate"
                label="Дата чека"
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    variant: "standard",
                    error: !!errors && !!errors["receiptDate"],
                    helperText: errors && errors["receiptDate"],
                  },
                }}
                sx={{ width: "100%", overflow: "hidden" }}
                onChange={(value) => {
                  setNomenculature({
                    ...nomenculature,
                    receiptDate: value,
                  });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>

        <Grid
          item
          xs={6}
          alignItems={"flex-end"}
          sx={{ visibility: isDocTypeOutcome ? "hidden" : "visible" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                name="bestBeforeDate"
                label="Срок годности"
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    variant: "standard",
                    "aria-hidden": true,
                    error: !!errors && !!errors["bestBeforeDate"],
                    helperText: errors && errors["bestBeforeDate"],
                  },
                }}
                sx={{ width: "100%", overflow: "hidden" }}
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

        <Grid item xs={12}>
          <TextField
            error={errors && errors["count"]}
            helperText={errors && errors["count"]}
            id="count"
            name="count"
            label="Количество товара"
            fullWidth
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
      <Button variant="contained" onClick={handleCreate} sx={{ mt: 3, ml: 1 }}>
        Next
      </Button>
    </React.Fragment>
  );
}
