import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikReactSelect from "app/components/FormikReactSelect";
import FormikUploadFile from "app/components/FormikUploadFile";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Nama kendaraan harus diisi"),
  no_police: yup.string().required("No polisi harus diisi"),
  year: yup.string().required("Tahun kendaraan harus diisi"),
  capacity: yup.string().required("Kapasitas angkut harus diisi"),
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
                  isSearchable={false}
                  isDisabled={isDetail}
                  name="transportation_type_id"
                  placeholder="Pilih Jenis Kendaraan"
                  options={[
                    {
                      value: 1,
                      label: "Hino",
                    },
                    {
                      value: 2,
                      label: "Hino",
                    },
                    {
                      value: 3,
                      label: "Hino",
                    },
                    {
                      value: 4,
                      label: "Hino",
                    },
                    {
                      value: 5,
                      label: "Hino",
                    },
                  ]}
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
              <FormikNumberInput
                disabled={isDetail}
                variant="standard"
                size="small"
                fullWidth
                name="year"
              />
            </Box>
            <Box flex={1} mb={3}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Kapasitas Angkut
              </Typography>
              <FormikNumberInput
                disabled={isDetail}
                variant="standard"
                size="small"
                fullWidth
                name="capacity"
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
            <Stack spacing={3} direction="row" alignItems="end" mb={3}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  No STNK Kendaraan
                </Typography>
                <JumboTextField
                  variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="no_stnk"
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
                  Surat Jalan
                </Typography>
                <JumboTextField
                  variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="surat_jalan"
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
