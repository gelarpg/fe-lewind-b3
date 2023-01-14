import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikUploadFile from "app/components/FormikUploadFile";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Nama kendaraan harus diisi"),
  age: yup.string().required("Umur harus diisi"),
  phone_number: yup.string().required("No telepon harus diisi"),
  address: yup.string().required("Kapasitas angkut harus diisi"),
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
                disabled={isDetail}
                variant="standard"
                size="small"
                fullWidth
                name="age"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                No Telepon
              </Typography>
              <FormikNumberInput
                disabled={isDetail}
                variant="standard"
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
            <Stack spacing={3} direction="row" alignItems="end" mb={3}>
              <Box flex={1}>
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
              </Box>
              <FormikUploadFile
                name="pdf_no_stnk"
                label="Upload PDF"
              />
              <Box flex={1}></Box>
            </Stack>
            <Stack spacing={3} direction="row" alignItems="end" mb={3}>
              <Box flex={1}>
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
              </Box>
              <FormikUploadFile
                name="pdf_surat_jalan"
                label="Upload PDF"
              />
              <Box flex={1}></Box>
            </Stack>
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
