import React from "react";
import { Typography, Box, InputAdornment } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Nama limbah harus diisi"),
  type: yup.string().required("Jenis limbah harus diisi"),
  weight_unit: yup.string().required("Berat satuan harus diisi"),
  price_unit: yup.string().required("Harga satuan harus diisi"),
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
                Nama Limbah
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
                Jenis Limbah
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="type"
              />
            </Box>
            <Box flex={1} mb={3} width={'50%'}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Berat Satuan
              </Typography>
              <FormikNumberInput
                disabled={isDetail}
                variant="standard"
                size="small"
                fullWidth
                name="weight_unit"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant={"body1"}>Kg</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Harga Satuan
              </Typography>
              <FormikNumberInput
                disabled={isDetail}
                variant="standard"
                size="small"
                fullWidth
                name="price_unit"
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end">
            <GreyButton
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/wastes")}
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
