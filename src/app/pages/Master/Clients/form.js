import React from "react";
import { Typography, Box } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Nama client harus diisi"),
  address: yup.string().required("Alamat harus diisi"),
  offer_number: yup.string().required("Nomor penawaran harus diisi"),
  transaction_fee: yup.string().required("Biaya transaksi harus diisi"),
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
      {({ isSubmitting, values, setFieldValue }) => (
        <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
          <Box mb={4}>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Nama Client
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
                Alamat
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="address"
                multiline
                rows={3}
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Nomor Penawaran
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="offer_number"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Biaya Transaksi
              </Typography>
              <FormikNumberInput
                disabled={isDetail}
                variant="standard"
                size="small"
                fullWidth
                name="transaction_fee"
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
