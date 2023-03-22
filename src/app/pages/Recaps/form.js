import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikUploadFile from "app/components/FormikUploadFile";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormikReactSelect from "app/components/FormikReactSelect";
import FormikDatepicker from "app/components/FormikDatepicker";
import FormikClientSelection from "app/components/FormikClientSelection";

const validationSchema = yup.object({
  client_id: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .test("required", "Nama Klien harus diisi", (value, ctx) => {
      if (!value) return false;
      else if (value !== null && value.value && value.label)
        return !!value.value && !!value.label;
      return true;
    })
    .nullable(),
  transportation_id: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .test("required", "Kendaraan harus diisi", (value, ctx) => {
      if (!value) return false;
      else if (value !== null && value.value && value.label)
        return !!value.value && !!value.label;
      return true;
    })
    .nullable(),
  status: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .test("required", "Status harus diisi", (value, ctx) => {
      if (!value) return false;
      else if (value !== null && value.value && value.label)
        return !!value.value && !!value.label;
      return true;
    })
    .nullable(),
  driver_id: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .test("required", "Nama Driver harus diisi", (value, ctx) => {
      if (!value) return false;
      else if (value !== null && value.value && value.label)
        return !!value.value && !!value.label;
      return true;
    })
    .nullable(),
  address: yup.string(),
  waste_name: yup.string(),
  period: yup.string().required("Periode harus diisi"),
  service_fee: yup.string().required("Biaya Layanan harus diisi"),
  service_fee_file: yup
    .mixed()
    .nullable()
    .required("Dokumen Biaya Layanan harus diisi")
    .test("fileSize", "Dokumen Biaya Layanan maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Biaya Layanan harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  invoice_file: yup
    .mixed()
    .nullable()
    .required("Dokumen Invoice harus diisi")
    .test("fileSize", "Dokumen Invoice maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Invoice harus dalam format .pdf atau .png atau .jpeg",
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
    .required("Surat Jalan harus diisi")
    .test("fileSize", "Surat Jalan maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Surat Jalan harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  bast_file: yup
    .mixed()
    .nullable()
    .required("Dokumen BAST harus diisi")
    .test("fileSize", "Dokumen BAST maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen BAST harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  waste_receipt_file: yup
    .mixed()
    .nullable()
    .required("Dokumen Penerima Limbah harus diisi")
    .test("fileSize", "Dokumen Penerima Limbah maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Penerima Limbah harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  transporter_file: yup
    .mixed()
    .nullable()
    .required("Dokumen Transporter harus diisi")
    .test("fileSize", "Dokumen Transporter maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Transporter harus dalam format .pdf atau .png atau .jpeg",
      (value) => {
        if (value && value.type) {
          ["application/pdf", "image/png", "image/jpeg"].includes(value.type);
        }
        return true;
      }
    ),
  provider_file: yup
    .mixed()
    .nullable()
    .required("Dokumen Penyedia harus diisi")
    .test("fileSize", "Dokumen Penyedia maksimal 5MB", (value) => {
      if (value && value.size) return value.size <= 5000000;
      return true;
    })
    .test(
      "fileFormat",
      "Dokumen Penyedia harus dalam format .pdf atau .png atau .jpeg",
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
              Nama Klien
            </Typography>
            <FormikClientSelection
              isDisabled={true}
              name="client_id"
              onChange={(val) => {
                methods.setValue("waste_name", val?.waste_name);
                methods.setValue("address", val?.address);
              }}
            />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Jenis Limbah
            </Typography>
            <JumboTextField
              variant="standard"
              disabled={true}
              size="small"
              fullWidth
              name="waste_name"
              placeholder="Jenis Limbah"
            />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Alamat
            </Typography>
            <JumboTextField
              variant="standard"
              disabled={true}
              size="small"
              fullWidth
              name="address"
              multiline
              rows={3}
            />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Periode
            </Typography>
            <FormikDatepicker name="period" disabled={true} disableFuture />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Nama Driver
            </Typography>
            <FormikReactSelect
              isDisabled={true}
              name="driver_id"
              placeholder="Nama Driver"
              url="/driver"
              usePagination
              objectProp="driver"
            />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Kendaraan
            </Typography>
            <FormikReactSelect
              isDisabled={true}
              name="transportation_id"
              placeholder="Kendaraan"
              url="/transportation"
              usePagination
              objectProp="transportation"
            />
          </Box>
          <Box flex={1}>
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="start"
              mb={3}
            >
              <Grid item xs={12} md={6} lg={6}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Biaya Layanan
                </Typography>
                <FormikNumberInput
                  disabled={true}
                  variant="standard"
                  size="small"
                  fullWidth
                  name="service_fee"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Dokumen Biaya Layanan
                </Typography>
                <FormikUploadFile
                  name="service_fee_file"
                  disabled={true}
                  defaultFileName={initialValues?.service_fee_file}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={1} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Invoice
              </Typography>
              <FormikUploadFile
                name="invoice_file"
                disabled={false}
                defaultFileName={initialValues?.invoice_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Dokumen Penyedia
              </Typography>
              <FormikUploadFile
                name="provider_file"
                disabled={false}
                defaultFileName={initialValues?.provider_file}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Dokumen Transporter
              </Typography>
              <FormikUploadFile
                name="transporter_file"
                disabled={false}
                defaultFileName={initialValues?.transporter_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Dokumen Penerima Limbah
              </Typography>
              <FormikUploadFile
                name="waste_receipt_file"
                disabled={false}
                defaultFileName={initialValues?.waste_receipt_file}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                BAST
              </Typography>
              <FormikUploadFile
                name="bast_file"
                disabled={false}
                defaultFileName={initialValues?.bast_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Surat Jalan
              </Typography>
              <FormikUploadFile
                name="travel_document_file"
                disabled={false}
                defaultFileName={initialValues?.travel_document_file}
              />
            </Grid>
          </Grid>
          <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Status
            </Typography>
            <FormikReactSelect
              isDisabled={isDetail}
              name="status"
              placeholder="Pilih Status"
              useStaticData
              optionsData={[
                {
                  id: 2,
                  name: "Prosess",
                },
                {
                  id: 3,
                  name: "Waiting Pickup",
                },
                {
                  id: 4,
                  name: "Pickup",
                },
                {
                  id: 5,
                  name: "Selesai",
                },
                {
                  id: 6,
                  name: "Dibatalkan",
                },
              ]}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="end">
          <GreyButton
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/orders")}
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
