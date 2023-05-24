import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikReactSelect from "app/components/FormikReactSelect";
import FormikDatepicker from "app/components/FormikDatepicker";
import FormikUploadFile from "app/components/FormikUploadFile";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  transportation_id: yup.string(),
  // transportation_type: yup.string(),
  name: yup.string(),
  validity_period_kir: yup.string().required("Masa berlaku KIR harus diisi"),
  validity_period_rekom: yup
    .string()
    .required("Masa berlaku Rekom KLHK harus diisi"),
  validity_period_supervision_card: yup
    .string()
    .required("Masa berlaku kartu pengawasan harus diisi"),
  validity_period_stnk: yup
    .string()
    .required("Masa berlaku pajak STNK harus diisi"),
  validity_period_departement_permit: yup
    .string()
    .required("Masa berlaku izin Dinas Perhubungan harus diisi"),
  no_police: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .test("required", "Nomor polisi harus diisi", (value, ctx) => {
      if (!value) return false;
      else if (value !== null && value.value && value.label)
        return !!value.value && !!value.label;
      return true;
    })
    .nullable(),
  attachment_stnk: yup
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
  attachment_kir: yup
    .mixed()
    .nullable()
    .required("Dokumen KIR harus diisi")
    .test("fileSize", "Dokumen KIR maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen KIR harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  attachment_rekom: yup
    .mixed()
    .nullable()
    .required("Dokumen Rekom KLHK harus diisi")
    .test("fileSize", "Dokumen Rekom KLHK maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Rekom KLHK harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  attachment_supervision_card: yup
    .mixed()
    .nullable()
    .required("Dokumen Kartu Pengawasan harus diisi")
    .test("fileSize", "Dokumen Kartu Pengawasan maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Kartu Pengawasan harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  attachment_departement_permit: yup
    .mixed()
    .nullable()
    .required("Dokumen Izin Dinas Perhubungan harus diisi")
    .test("fileSize", "Dokumen Izin Dinas Perhubungan maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Izin Dinas Perhubungan harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
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
  const nopolValue = useWatch({
    name: "no_police",
    control: methods.control,
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
              No Polisi
            </Typography>
            <FormikReactSelect
              disabled={isDetail}
              name="no_police"
              placeholder="Pilih Nomor Polisi Kendaraan"
              url="transportation-license/transportation"
              usePagination
              objectProp="transportation"
              valueProp="id"
              labelProp="no_police"
              additionalKey="id"
              additionalProp="id"
              additionalKey2="name"
              additionalProp2="name"
              onChange={(value) => {
                methods.setValue("transportation_id", value.id.toString());
                methods.setValue("name", value.name);
              }}
            />
          </Box>
          <Box flex={1} mb={3} display="none">
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Kendaraan ID
            </Typography>
            <JumboTextField
              variant="standard"
              disabled={true}
              size="small"
              fullWidth
              name="transportation_id"
            />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Nama Kendaraan
            </Typography>
            <JumboTextField
              variant="standard"
              disabled={true}
              size="small"
              fullWidth
              name="name"
            />
          </Box>
          <Grid container spacing={4} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={12} lg={5}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Masa Berlaku Pajak STNK
                </Typography>
                <FormikDatepicker
                  disabled={!nopolValue}
                  name="validity_period_stnk"
                  disablePast
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  STNK
                </Typography>
                <FormikUploadFile
                  name="attachment_stnk"
                  disabled={isDetail}
                  defaultFileName={initialValues?.attachment_stnk}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={12} lg={5}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Masa Berlaku KIR
                </Typography>
                <FormikDatepicker
                  disabled={!nopolValue}
                  name="validity_period_kir"
                  disablePast
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  KIR
                </Typography>
                <FormikUploadFile
                  name="attachment_kir"
                  disabled={isDetail}
                  defaultFileName={initialValues?.attachment_kir}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={12} lg={5}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Masa Berlaku Rekom KLHK
                </Typography>
                <FormikDatepicker
                  disabled={!nopolValue}
                  name="validity_period_rekom"
                  disablePast
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Rekom KLHK
                </Typography>
                <FormikUploadFile
                  name="attachment_rekom"
                  disabled={isDetail}
                  defaultFileName={initialValues?.attachment_rekom}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={12} lg={5}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Masa Berlaku Kartu Pengawasan
                </Typography>
                <FormikDatepicker
                  disabled={!nopolValue}
                  name="validity_period_supervision_card"
                  disablePast
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Kartu Pengawasan
                </Typography>
                <FormikUploadFile
                  name="attachment_supervision_card"
                  disabled={isDetail}
                  defaultFileName={initialValues?.attachment_supervision_card}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={12} lg={5}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Masa Berlaku Izin Dinas Perhubungan
                </Typography>
                <FormikDatepicker
                  disabled={!nopolValue}
                  name="validity_period_departement_permit"
                  disablePast
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <Box flex={1}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Izin Dinas Perhubungan
                </Typography>
                <FormikUploadFile
                  name="attachment_departement_permit"
                  disabled={isDetail}
                  defaultFileName={initialValues?.attachment_departement_permit}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="end">
          <GreyButton
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/licenses")}
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
