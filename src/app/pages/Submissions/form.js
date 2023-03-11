import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikUploadFile from "app/components/FormikUploadFile";
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
                Nama Klien
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
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Periode
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="period"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Nama Driver
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="driver_name"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Kendaraan
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={isDetail}
                size="small"
                fullWidth
                name="transportation"
              />
            </Box>
            <Grid container spacing={3} direction="row" alignItems="end" mb={3}>
              <Grid item xs={5}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Biaya Layanan
                </Typography>
                <FormikNumberInput
                  disabled={isDetail}
                  variant="standard"
                  size="small"
                  fullWidth
                  name="service_fee"
                />
              </Grid>
              <Grid item xs={7}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Dokumen Biaya Layanan
                </Typography>
                <FormikUploadFile name="pdf_service_fee" disabled={isDetail} />
              </Grid>
            </Grid>
            <Grid container spacing={1} direction="row" alignItems="end" mb={3}>
              <Grid item xs={4}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Invoice
                </Typography>
                <FormikUploadFile name="pdf_invoice" disabled={isDetail} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Dokumen Penyedia
                </Typography>
                <FormikUploadFile name="pdf_provider" disabled={isDetail} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Dokumen Transporter
                </Typography>
                <FormikUploadFile name="pdf_transporter" disabled={isDetail} />
              </Grid>
            </Grid>
            <Grid container spacing={1} direction="row" alignItems="end" mb={3}>
              <Grid item xs={4}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Dokumen Penerima Limbah
                </Typography>
                <FormikUploadFile name="pdf_waste" disabled={isDetail} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  BAST
                </Typography>
                <FormikUploadFile name="pdf_bast" disabled={isDetail} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Surat Jalan
                </Typography>
                <FormikUploadFile name="pdf_surat_jalan" disabled={isDetail} />
              </Grid>
            </Grid>
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
