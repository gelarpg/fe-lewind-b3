import React from "react";
import { Typography, Box, Grid, Card, CardContent, Checkbox, Stack } from "@mui/material";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikNumberInput from "app/components/FormikNumberInput";
import FormikUploadFile from "app/components/FormikUploadFile";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
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
  // transportation_id: yup
  //   .object()
  //   .shape({
  //     label: yup.string().required(),
  //     value: yup.string().required(),
  //   })
  //   .test("required", "Kendaraan harus diisi", (value, ctx) => {
  //     if (!value) return false;
  //     else if (value !== null && value.value && value.label)
  //       return !!value.value && !!value.label;
  //     return true;
  //   })
  //   .nullable(),
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
  // driver_id: yup
  //   .object()
  //   .shape({
  //     label: yup.string().required(),
  //     value: yup.string().required(),
  //   })
  //   .test("required", "Nama Driver harus diisi", (value, ctx) => {
  //     if (!value) return false;
  //     else if (value !== null && value.value && value.label)
  //       return !!value.value && !!value.label;
  //     return true;
  //   })
  //   .nullable(),
  address: yup.string(),
  waste_name: yup.string(),
  waste_cost: yup.string(),
  waste_reference_price: yup.string(),
  // period: yup.string().required("Periode harus diisi"),
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

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "test",
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
            {fields.map((x, key) => {
              return (
                <Card key={x.id} sx={{ mb: 3 }}>
                  <CardContent>
                    <Stack spacing={3} direction="row" alignItems="center">
                      <Controller
                        name={`test.${key}.isSelected`}
                        control={methods.control}
                        defaultValue={false}
                        render={({ field, fieldState: { invalid, error } }) => {
                          return (
                            <Checkbox
                              color="primary"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              disabled={true}
                            />
                          );
                        }}
                      />
                      <Stack spacing={3} direction="column" alignItems="center" flex={1}>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            Nomor Dokumen
                          </Typography>
                          <JumboTextField
                            variant="standard"
                            disabled={true}
                            size="small"
                            fullWidth
                            name={`test.${key}.doc_number`}
                            placeholder="Nomor Dokumen"
                          />
                        </Box>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            Kode Limbah
                          </Typography>
                          <JumboTextField
                            variant="standard"
                            disabled={true}
                            size="small"
                            fullWidth
                            name={`test.${key}.waste_code`}
                            placeholder="Kode Limbah"
                          />
                        </Box>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            Nama Limbah
                          </Typography>
                          <JumboTextField
                            variant="standard"
                            disabled={true}
                            size="small"
                            fullWidth
                            name={`test.${key}.waste_name`}
                            placeholder="Nama Limbah"
                          />
                        </Box>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            Biaya Limbah
                          </Typography>
                          <JumboTextField
                            disabled={true}
                            variant="standard"
                            size="small"
                            fullWidth
                            name={`test.${key}.waste_cost`}
                            placeholder="Biaya Limbah"
                          />
                        </Box>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            {/* {`Jumlah Limbah (${x?.waste_weight_unit ?? ''})`} */}
                            {`Jumlah`}
                          </Typography>
                          <FormikNumberInput
                            disabled={true}
                            variant="standard"
                            size="small"
                            fullWidth
                            name={`test.${key}.qty`}
                            placeholder="Jumlah Limbah"
                          />
                        </Box>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            Tujuan Pengangkutan
                          </Typography>
                          <JumboTextField
                            disabled={true}
                            variant="standard"
                            size="small"
                            fullWidth
                            name={`test.${key}.transport_target`}
                            placeholder="Tujuan Pengangkutan"
                          />
                        </Box>
                      </Stack>
                      <Stack spacing={3} direction="column" alignItems="center" flex={1}>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            Periode
                          </Typography>
                          <FormikDatepicker
                            name={`test.${key}.period`}
                            disabled={true}
                            disablePast
                          />
                        </Box>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            Nama Driver
                          </Typography>
                          <FormikReactSelect
                            isDisabled={true}
                            name={`test.${key}.driver_id`}
                            placeholder="Nama Driver"
                            url="/driver"
                            usePagination
                            objectProp="driver"
                          />
                        </Box>
                        <Box flex={1} width={1}>
                          <Typography
                            variant={"body1"}
                            fontWeight="bold"
                            mb={1.5}
                          >
                            Kendaraan
                          </Typography>
                          <FormikReactSelect
                            isDisabled={true}
                            name={`test.${key}.transportation_id`}
                            placeholder="Kendaraan"
                            url="/transportation"
                            usePagination
                            objectProp="transportation"
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
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
          <Box flex={1} mb={3}>
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="start"
              mb={3}
            >
              <Grid item xs={12} md={6} lg={6}>
                <Typography variant={"body1"} fontWeight="bold" mb={3}>
                  Nominal Transfer
                </Typography>
                <FormikNumberInput
                  placeholder="Nominal Transfer"
                  disabled={true}
                  variant="standard"
                  size="small"
                  fullWidth
                  name="transfer_amount"
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={6}>
                <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                  Transfer Uang Jalan
                </Typography>
                <FormikReactSelect
                  isDisabled={true}
                  name="travel_fee_status"
                  placeholder="Pilih Status"
                  useStaticData
                  optionsData={[
                    {
                      id: true,
                      name: "Sudah Ditransfer",
                    },
                    {
                      id: false,
                      name: "Belum Ditransfer",
                    },
                  ]}
                />
              </Grid> */}
            </Grid>
          </Box>
          <Grid container spacing={1} direction="row" alignItems="start" mb={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Invoice
              </Typography>
              <FormikUploadFile
                name="invoice_file"
                disabled={isDetail}
                defaultFileName={initialValues?.invoice_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Dokumen Penyedia
              </Typography>
              <FormikUploadFile
                name="provider_file"
                disabled={true}
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
                disabled={true}
                defaultFileName={initialValues?.transporter_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Dokumen Penerima Limbah
              </Typography>
              <FormikUploadFile
                name="waste_receipt_file"
                disabled={true}
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
                disabled={true}
                defaultFileName={initialValues?.bast_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Surat Jalan
              </Typography>
              <FormikUploadFile
                name="travel_document_file"
                disabled={true}
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
                  id: true,
                  name: "Dibayar",
                },
                {
                  id: false,
                  name: "Menunggu Pembayaran",
                  isDisabled: true,
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
            onClick={() => navigate("/invoices")}
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
