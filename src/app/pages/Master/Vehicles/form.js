import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikReactSelect from "app/components/FormikReactSelect";
import FormikUploadFile from "app/components/FormikUploadFile";
import FormikDatepicker from "app/components/FormikDatepicker";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const validationSchema = yup.object({
  name: yup.string().required("Nama kendaraan harus diisi"),
  no_police: yup
    .string()
    .required("No polisi harus diisi")
    .matches(
      /^[A-Z]{1,2}\s{1}\d{0,4}\s{0,1}[A-Z]{0,3}$/,
      "Nomor polisi tidak valid"
    ),
  year: yup
    .string()
    .required("Tahun kendaraan harus diisi")
    .test("max", "Tahun kendaraan maksimal tahun ini", (value) => {
      return Number(moment(value).format('YYYY')) <= Number(moment().format("YYYY"));
    }),
  capacity: yup
    .number()
    .typeError("Kapasitas angkut tidak valid")
    .integer("Kapasitas angkut harus berupa angka")
    .required("Kapasitas angkut harus diisi")
    .min(1, "Kapasitas angkut minimal 1"),
  fuel_type: yup.string().required("Jenis bahan bakar harus diisi"),
  transportation_type_id: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .test("required", "Jenis kendaraan harus diisi", (value, ctx) => {
      if (!value) return false;
      else if (value !== null && value.value && value.label)
        return !!value.value && !!value.label;
      return true;
    })
    .nullable(),
  // pdf_stnk: yup
  //   .mixed()
  //   .nullable()
  //   .required("Harap masukkan attachment")
  //   .test("fileSize", "Attachment maksimal 5MB", (value) => {
  //     return !value || (value && value.size <= 5000000);
  //   })
  //   .test(
  //     "fileFormat",
  //     "Attachment harus dalam format .pdf atau .png atau .jpeg",
  //     (value) =>
  //       !value ||
  //       (value &&
  //         ["application/pdf", "image/png", "image/jpeg"].includes(value.type))
  //   ),
  // pdf_surat_jalan: yup
  //   .mixed()
  //   .nullable()
  //   .required("Harap masukkan attachment")
  //   .test("fileSize", "Attachment maksimal 5MB", (value) => {
  //     return !value || (value && value.size <= 5000000);
  //   })
  //   .test(
  //     "fileFormat",
  //     "Attachment harus dalam format .pdf atau .png atau .jpeg",
  //     (value) =>
  //       !value ||
  //       (value &&
  //         ["application/pdf", "image/png", "image/jpeg"].includes(value.type))
  //   ),
});

const CustomForm = ({
  initialValues,
  isDetail = false,
  onSubmit,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnMount={false}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(data);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
          <Box mb={4}>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Nama Kendaraan
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="name"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Jenis Kendaraan
              </Typography>
              <FormikReactSelect
                isDisabled={isDetail}
                name="transportation_type_id"
                placeholder="Pilih Jenis Kendaraan"
                url="/transportation/list/type"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                No Polisi
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="no_police"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Tahun Kendaraan
              </Typography>
              <FormikDatepicker
                views={["year"]}
                name="year"
                shouldDisableYear={(year) => moment(year).isAfter(moment())}
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Kapasitas Angkut
              </Typography>
              <FormikNumberInput
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="capacity"
                type="tel"
                min={1}
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Jenis Bahan Bakar
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="fuel_type"
              />
            </Box>
            <Grid container spacing={3} direction="row" alignItems="end" mb={3}>
              <Grid item xs={5}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  No STNK Kendaraan
                </Typography>
                <JumboTextField
                  variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="stnk"
                />
              </Grid>
              <Grid item xs={7}>
                <FormikUploadFile name="pdf_stnk" disabled={isDetail} />
              </Grid>
            </Grid>
            <Grid container spacing={3} direction="row" alignItems="end" mb={3}>
              <Grid item xs={5}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Surat Jalan
                </Typography>
                <JumboTextField
                  variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="surat_jalan"
                />
              </Grid>
              <Grid item xs={7}>
                <FormikUploadFile name="pdf_surat_jalan" disabled={isDetail} />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end">
            <GreyButton
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/vehicles")}
            >
              Batal
            </GreyButton>
            {!isDetail && (
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{ ml: 3 }}
                loading={isSubmitting || isLoading}
              >
                Simpan
              </LoadingButton>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
