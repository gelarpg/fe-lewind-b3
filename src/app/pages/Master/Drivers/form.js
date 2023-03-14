import React from "react";
import { Typography, Box, Stack, Grid } from "@mui/material";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikPhoneNumberInput from "app/components/FormikPhoneNumberInput";
import FormikUploadFile from "app/components/FormikUploadFile";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  name: yup.string().required("Nama kendaraan harus diisi"),
  age: yup
    .number()
    .typeError("Umur tidak valid")
    .integer("Umur harus berupa angka")
    .required("Umur harus diisi")
    .min(18, "Umur minimal 18 Tahun")
    .max(50, "Umur minimal 50 Tahun"),
  phone_number: yup.string().required("No telepon harus diisi"),
  address: yup.string().required("Alamat harus diisi"),
  sim_number: yup.string().required("Nomor SIM harus diisi"),
  ktp_number: yup
    .string()
    .required("NIK harus diisi"),
  sim_file: yup
    .mixed()
    .nullable()
    .required("Dokumen SIM harus diisi")
    .test("fileSize", "Dokumen SIM maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen SIM harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  ktp_file: yup
    .mixed()
    .nullable()
    .required("Dokumen KTP harus diisi")
    .test("fileSize", "Dokumen KTP maksimal 5MB", (value) => {
      if (value && value.size) {
        return value.size <= 5000000;
      }
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen KTP harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          return ["application/pdf", "image/png", "image/jpeg"].includes(
            value.type
          );
        }
        return true;
      }
    ),
});

const CustomForm = ({
  initialValues,
  isDetail = false,
  onSubmit,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        style={{ textAlign: "left" }}
        noValidate
        autoComplete="off"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
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
              inputProps={{ maxLength: 2 }}
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
              multiline
              rows={3}
            />
          </Box>
          <Box flex={1}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              NIK
            </Typography>
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="start"
              mb={3}
            >
              <Grid item xs={12} md={6} lg={4}>
                <JumboTextField
                  variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="ktp_number"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <FormikUploadFile name="ktp_file" disabled={isDetail} />
              </Grid>
            </Grid>
          </Box>
          <Box flex={1}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              SIM
            </Typography>
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="start"
              mb={3}
            >
              <Grid item xs={12} md={6} lg={4}>
                <JumboTextField
                  variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="sim_number"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <FormikUploadFile name="sim_file" disabled={isDetail} />
              </Grid>
            </Grid>
          </Box>
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
              loading={isLoading}
            >
              Simpan
            </LoadingButton>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

export default CustomForm;
