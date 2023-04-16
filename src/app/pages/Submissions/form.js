import React, { useMemo } from "react";
import {
  Typography,
  Box,
  Grid,
  Checkbox,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
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
import { withRoles } from "app/components/withRoles";
import { Controller, useFieldArray } from "react-hook-form";

const CustomForm = ({
  initialValues,
  isDetail = false,
  onSubmit,
  isLoading = false,
  ...props
}) => {
  const navigate = useNavigate();
  const { isAdminPerencanaan, isAdminOperasional, isSuperAdmin } = props;

  const validationSchema = useMemo(() => {
    return yup.object({
      isSelected: yup.array().of(yup.boolean()),
      test: yup.array().of(
        yup.object().shape({
          isSelected: yup.boolean(),
          transportation_id: yup
            .object()
            .shape({
              label: yup.string().required(),
              value: yup.string().required(),
            })
            .test("required", "Kendaraan harus diisi", (value, ctx) => {
              if (
                (isAdminOperasional || isSuperAdmin) &&
                ctx.parent.isSelected
              ) {
                if (!value) return false;
                else if (value !== null && value.value && value.label)
                  return !!value.value && !!value.label;
              }
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
              if (
                (isAdminOperasional || isSuperAdmin) &&
                ctx.parent.isSelected
              ) {
                if (!value) return false;
                else if (value !== null && value.value && value.label)
                  return !!value.value && !!value.label;
              }
              return true;
            })
            .nullable(),
          period: yup
            .string()
            .test("required", "Periode harus diisi", (value, ctx) => {
              if (
                (isAdminOperasional || isSuperAdmin) &&
                ctx.parent.isSelected
              ) {
                if (!value) return false;
              }
              return true;
            }),
          waste_name: yup
            .string()
            .test("required", "Jenis limbah harus diisi", (value, ctx) => {
              if (
                (isAdminOperasional || isSuperAdmin) &&
                ctx.parent.isSelected
              ) {
                if (!value) return false;
              }
              return true;
            }),
        })
      ),
      travel_fee: yup
        .object()
        .shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
        .test("required", "Transfer uang jalan harus diisi", (value, ctx) => {
          if (isAdminOperasional || isSuperAdmin) {
            if (!value) return false;
            else if (value !== null && value.value && value.label)
              return !!value.value && !!value.label;
          }
          return true;
        })
        .nullable(),
      client_id: yup
        .object()
        .shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
        .test("required", "Nama Klien harus diisi", (value, ctx) => {
          if (isAdminPerencanaan || isSuperAdmin) {
            if (!value) return false;
            else if (value !== null && value.value && value.label)
              return !!value.value && !!value.label;
          }
          return true;
        })
        .nullable(),
      address: yup.string(),
      waste_cost: yup.string().required("Biaya limbah harus diisi"),
      service_fee: yup.string().when([], {
        is: () => isAdminOperasional || isSuperAdmin,
        then: yup.string().required("Biaya Layanan harus diisi"),
        otherwise: yup.string().notRequired(),
      }),
      service_fee_file: yup
        .mixed()
        .nullable()
        .when([], {
          is: () => isAdminOperasional || isSuperAdmin,
          then: yup.mixed().required("Dokumen Biaya Layanan harus diisi"),
          otherwise: yup.mixed().notRequired(),
        })
        .test("fileSize", "Dokumen Biaya Layanan maksimal 5MB", (value) => {
          if (value && value.size) return value.size <= 5000000;
          return true;
        })
        .test(
          "fileFormat",
          "Dokumen Biaya Layanan harus dalam format .pdf atau .png atau .jpeg",
          (value) => {
            if (value && value.type) {
              ["application/pdf", "image/png", "image/jpeg"].includes(
                value.type
              );
            }
            return true;
          }
        ),
      invoice_file: yup
        .mixed()
        .nullable()
        // .required("Dokumen Invoice harus diisi")
        .test("fileSize", "Dokumen Invoice maksimal 5MB", (value) => {
          if (value && value.size) return value.size <= 5000000;
          return true;
        })
        .test(
          "fileFormat",
          "Dokumen Invoice harus dalam format .pdf atau .png atau .jpeg",
          (value) => {
            if (value && value.type) {
              ["application/pdf", "image/png", "image/jpeg"].includes(
                value.type
              );
            }
            return true;
          }
        ),
      travel_document_file: yup
        .mixed()
        .nullable()
        // .required("Surat Jalan harus diisi")
        .test("fileSize", "Surat Jalan maksimal 5MB", (value) => {
          if (value && value.size) return value.size <= 5000000;
          return true;
        })
        .test(
          "fileFormat",
          "Surat Jalan harus dalam format .pdf atau .png atau .jpeg",
          (value) => {
            if (value && value.type) {
              ["application/pdf", "image/png", "image/jpeg"].includes(
                value.type
              );
            }
            return true;
          }
        ),
      bast_file: yup
        .mixed()
        .nullable()
        // .required("Dokumen BAST harus diisi")
        .test("fileSize", "Dokumen BAST maksimal 5MB", (value) => {
          if (value && value.size) return value.size <= 5000000;
          return true;
        })
        .test(
          "fileFormat",
          "Dokumen BAST harus dalam format .pdf atau .png atau .jpeg",
          (value) => {
            if (value && value.type) {
              ["application/pdf", "image/png", "image/jpeg"].includes(
                value.type
              );
            }
            return true;
          }
        ),
      waste_receipt_file: yup
        .mixed()
        .nullable()
        // .required("Dokumen Penerima Limbah harus diisi")
        .test("fileSize", "Dokumen Penerima Limbah maksimal 5MB", (value) => {
          if (value && value.size) return value.size <= 5000000;
          return true;
        })
        .test(
          "fileFormat",
          "Dokumen Penerima Limbah harus dalam format .pdf atau .png atau .jpeg",
          (value) => {
            if (value && value.type) {
              ["application/pdf", "image/png", "image/jpeg"].includes(
                value.type
              );
            }
            return true;
          }
        ),
      transporter_file: yup
        .mixed()
        .nullable()
        // .required("Dokumen Transporter harus diisi")
        .test("fileSize", "Dokumen Transporter maksimal 5MB", (value) => {
          if (value && value.size) return value.size <= 5000000;
          return true;
        })
        .test(
          "fileFormat",
          "Dokumen Transporter harus dalam format .pdf atau .png atau .jpeg",
          (value) => {
            if (value && value.type) {
              ["application/pdf", "image/png", "image/jpeg"].includes(
                value.type
              );
            }
            return true;
          }
        ),
      provider_file: yup
        .mixed()
        .nullable()
        // .required("Dokumen Penyedia harus diisi")
        .test("fileSize", "Dokumen Penyedia maksimal 5MB", (value) => {
          if (value && value.size) return value.size <= 5000000;
          return true;
        })
        .test(
          "fileFormat",
          "Dokumen Penyedia harus dalam format .pdf atau .png atau .jpeg",
          (value) => {
            if (value && value.type) {
              ["application/pdf", "image/png", "image/jpeg"].includes(
                value.type
              );
            }
            return true;
          }
        ),
    });
  }, [isAdminOperasional, isAdminPerencanaan, isSuperAdmin]);

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
              isDisabled={isDetail || isAdminOperasional}
              name="client_id"
              onChange={(val) => {
                Array.from({ length: 5 }).map((x, key) =>
                  append({
                    transportation_id: null,
                    driver_id: null,
                    period: "",
                    isSelected: key === 0 ? true: false,
                    waste_name: val?.waste_name,
                  })
                );
                // methods.setValue("waste_name", val?.waste_name);
                methods.setValue("address", val?.address);
                // methods.setValue("waste_reference_price", `${new Intl.NumberFormat('id-ID', {
                //   style: 'currency',
                //   currency: 'IDR',
                // }).format(val?.waste_reference_price)}`);
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
                            />
                          );
                        }}
                      />
                      <Box flex={1} mb={3}>
                        <Typography
                          variant={"body1"}
                          fontWeight="bold"
                          mb={1.5}
                        >
                          Periode
                        </Typography>
                        <FormikDatepicker
                          name={`test.${key}.period`}
                          disabled={isDetail || isAdminPerencanaan}
                          disablePast
                        />
                      </Box>
                      <Box flex={1} mb={3}>
                        <Typography
                          variant={"body1"}
                          fontWeight="bold"
                          mb={1.5}
                        >
                          Jenis Limbah
                        </Typography>
                        <JumboTextField
                          variant="standard"
                          disabled={true}
                          size="small"
                          fullWidth
                          name={`test.${key}.waste_name`}
                          placeholder="Jenis Limbah"
                        />
                      </Box>
                      <Box flex={1} mb={3}>
                        <Typography
                          variant={"body1"}
                          fontWeight="bold"
                          mb={1.5}
                        >
                          Nama Driver
                        </Typography>
                        <FormikReactSelect
                          isDisabled={isDetail || isAdminPerencanaan}
                          name={`test.${key}.driver_id`}
                          placeholder="Nama Driver"
                          url="/driver"
                          usePagination
                          objectProp="driver"
                        />
                      </Box>
                      <Box flex={1} mb={3}>
                        <Typography
                          variant={"body1"}
                          fontWeight="bold"
                          mb={1.5}
                        >
                          Kendaraan
                        </Typography>
                        <FormikReactSelect
                          isDisabled={isDetail || isAdminPerencanaan}
                          name={`test.${key}.transportation_id`}
                          placeholder="Kendaraan"
                          url="/transportation"
                          usePagination
                          objectProp="transportation"
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
          {/* <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Harga Acuan Limbah
            </Typography>
            <JumboTextField
              variant="standard"
              disabled={true}
              size="small"
              fullWidth
              name="waste_reference_price"
              placeholder="Harga Acuan Limbah"
            />
          </Box> */}
          <Box flex={1} mb={3} mt={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Biaya Limbah
            </Typography>
            <FormikNumberInput
              disabled={isDetail || isAdminOperasional}
              variant="standard"
              size="small"
              fullWidth
              name="waste_cost"
              placeholder="Biaya Limbah"
            />
          </Box>
          {/* <Box flex={1} mb={3}>
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
          </Box> */}
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
                  disabled={isDetail || isAdminPerencanaan}
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
                  disabled={isDetail || isAdminPerencanaan}
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
                disabled={isDetail || isAdminPerencanaan}
                defaultFileName={initialValues?.invoice_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Dokumen Penyedia
              </Typography>
              <FormikUploadFile
                name="provider_file"
                disabled={isDetail || isAdminPerencanaan}
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
                disabled={isDetail || isAdminPerencanaan}
                defaultFileName={initialValues?.transporter_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Dokumen Penerima Limbah
              </Typography>
              <FormikUploadFile
                name="waste_receipt_file"
                disabled={isDetail || isAdminPerencanaan}
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
                disabled={isDetail || isAdminPerencanaan}
                defaultFileName={initialValues?.bast_file}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Surat Jalan
              </Typography>
              <FormikUploadFile
                name="travel_document_file"
                disabled={isDetail || isAdminPerencanaan}
                defaultFileName={initialValues?.travel_document_file}
              />
            </Grid>
          </Grid>
          <Box flex={1} mb={3}>
            <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
              Transfer Uang Jalan
            </Typography>
            <FormikReactSelect
              isDisabled={isDetail || isAdminPerencanaan}
              name="travel_fee"
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
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="end">
          <GreyButton
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/submissions")}
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

export default withRoles(CustomForm);
