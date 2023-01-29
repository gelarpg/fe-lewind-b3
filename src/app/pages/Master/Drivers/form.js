import React from "react";
import { Typography, Box, Stack, Grid } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikPhoneNumberInput from "app/components/FormikPhoneNumberInput";
import FormikUploadFile from "app/components/FormikUploadFile";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Nama kendaraan harus diisi"),
  age: yup
    .number()
    .integer("Umur harus berupa angka")
    .required("Umur harus diisi")
    .min(18, "Umur minimal 18 Tahun")
    .max(50, "Umur minimal 50 Tahun"),
  phone_number: yup.string().required("No telepon harus diisi"),
  address: yup.string().required("Alamat harus diisi"),
  pdf_nik: yup
    .mixed()
    .nullable()
    .required("Harap masukkan attachment")
    .test("fileSize", "Attachment maksimal 5MB", (value) => {
      return !value || (value && value.size <= 5000000);
    })
    .test(
      "fileFormat",
      "Attachment harus dalam format .pdf atau .png atau .jpeg",
      (value) =>
        !value ||
        (value &&
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type))
    ),
  pdf_sim: yup
    .mixed()
    .nullable()
    .required("Harap masukkan attachment")
    .test("fileSize", "Attachment maksimal 5MB", (value) => {
      return !value || (value && value.size <= 5000000);
    })
    .test(
      "fileFormat",
      "Attachment harus dalam format .pdf atau .png atau .jpeg",
      (value) =>
        !value ||
        (value &&
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type))
    ),
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
      validationSchema={validationSchema}
      validateOnMount={false}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(data);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
          <Box mb={4}>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Nama
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
                Umur
              </Typography>
              <FormikNumberInput
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="age"
                type="tel"
                min={17}
                max={50}
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                No Telepon
              </Typography>
              <FormikPhoneNumberInput
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="phone_number"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Alamat
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="address"
              />
            </Box>
            <Grid container spacing={3} direction="row" alignItems="end" mb={3}>
              <Grid item xs={5}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  NIK
                </Typography>
                <JumboTextField
                  variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="nik"
                />
              </Grid>
              <Grid item xs={7}>
                <FormikUploadFile name="pdf_nik" disabled={isDetail} />
              </Grid>
            </Grid>
            <Grid container spacing={3} direction="row" alignItems="end" mb={3}>
              <Grid item xs={5}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  SIM
                </Typography>
                <JumboTextField
                  variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="sim"
                />
              </Grid>
              <Grid item xs={7}>
                <FormikUploadFile name="pdf_sim" disabled={isDetail} />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end">
            <GreyButton
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/drivers")}
            >
              Batal
            </GreyButton>
            {!isDetail && (
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{ ml: 3 }}
                loading={isSubmitting || isLoading}
                loadingIndicator="Loading ..."
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
