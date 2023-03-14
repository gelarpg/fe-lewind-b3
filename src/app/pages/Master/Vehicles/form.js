import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikReactSelect from "app/components/FormikReactSelect";
import FormikUploadFile from "app/components/FormikUploadFile";
import FormikDatepicker from "app/components/FormikDatepicker";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
      return (
        Number(moment(value).format("YYYY")) <= Number(moment().format("YYYY"))
      );
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
  stnk_number: yup.string().required("Nomor STNK Kendaraan harus diisi"),
  travel_document_number: yup
    .string()
    .required("Nomor Surat Jalan harus diisi"),
  stnk_file: yup
    .mixed()
    .nullable()
    .required("Dokumen STNK harus diisi")
    .test("fileSize", "Dokumen STNK maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen STNK harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  travel_document_file: yup
    .mixed()
    .nullable()
    .required("Dokumen Surat Jalan harus diisi")
    .test("fileSize", "Dokumen Surat Jalan maksimal 5MB", (value) => {
      if (value && value.size) {
        return value.size <= 5000000;
      }
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Surat Jalan harus dalam format .pdf atau .png atau .jpeg",
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
          <Box flex={1}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              No STNK Kendaraan
            </Typography>
            <Grid
              container
              spacing={2}
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
                  name="stnk_number"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <FormikUploadFile
                  name="stnk_file"
                  disabled={isDetail}
                  defaultFileName={initialValues?.stnk_file}
                />
              </Grid>
            </Grid>
          </Box>
          <Box flex={1}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Surat Jalan
            </Typography>
            <Grid
              container
              spacing={2}
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
                  name="travel_document_number"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <FormikUploadFile
                  name="travel_document_file"
                  disabled={isDetail}
                  defaultFileName={initialValues?.travel_document_file}
                />
              </Grid>
            </Grid>
          </Box>
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
