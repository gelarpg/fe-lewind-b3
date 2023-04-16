import React from "react";
import { Typography, Box, Stack, IconButton } from "@mui/material";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikWasteSelection from "app/components/FormikWasteSelection";
import FormikNumberInput from "app/components/FormikNumberInput";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@mui/material/styles/styled";
import { isEmpty } from "lodash";

const validationSchema = yup.object({
  company_name: yup.string().required("Nama perusahaan harus diisi"),
  name: yup.string().required("Nama client harus diisi"),
  address: yup.string().required("Alamat harus diisi"),
  offer_number: yup.string().required("Nomor penawaran harus diisi"),
  transaction_fee: yup.string().required("Biaya transaksi harus diisi"),
  waste_id: yup.array().of(
    yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .test("required", "Jenis limbah harus diisi", (value, ctx) => {
        if (!value) return false;
        else if (value !== null) {
          return !!value.value && !!value.label;
        }
        return true;
      })
      .nullable()
  ),
  waste_name: yup.array().of(yup.string()),
});

const IconButtonDelete = styled(IconButton)({
  backgroundColor: "#be161d",
  borderRadius: "5px",
  "&:hover, &:focus": {
    backgroundColor: "#be161d",
  },
  height: "fit-content",
});

const IconButtonAdd = styled(IconButton)({
  backgroundColor: "#218838",
  borderRadius: "5px",
  "&:hover, &:focus": {
    backgroundColor: "#218838",
  },
  height: "fit-content",
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
  const {
    fields: fieldsWastes,
    append: appendWastes,
    remove: removeWastes,
  } = useFieldArray({
    control: methods.control,
    name: "waste_id",
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
              Nama Perusahaan
            </Typography>
            <JumboTextField
              variant="standard"
              disabled={isDetail}
              size="small"
              fullWidth
              name="company_name"
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
              Biaya Transport
            </Typography>
            <FormikNumberInput
              disabled={isDetail}
              variant="standard"
              size="small"
              fullWidth
              name="transaction_fee"
            />
          </Box>
          <Box flex={1} mb={3}>
            {fieldsWastes.map((field, index) => (
              <Stack spacing={3} direction="row" key={field.id} alignItems="center" mb={3}>
                <Box flex={1}>
                  <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                    Limbah
                  </Typography>
                  <FormikWasteSelection
                    isDisabled={isDetail}
                    name={`waste_id[${index}]`}
                    placeholder="Pilih Jenis Limbah"
                    onChange={(value) => {
                      methods.setValue(
                        `waste_type[${index}]`,
                        value?.type ?? ""
                      );
                      // methods.setValue(
                      //   "price_per_unit",
                      //   `${new Intl.NumberFormat("id-ID", {
                      //     style: "currency",
                      //     currency: "IDR",
                      //   }).format(value.price_unit)} / ${value.weight_unit}`
                      // );
                    }}
                  />
                </Box>
                <Box flex={1}>
                  <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                    Jenis Limbah
                  </Typography>
                  <JumboTextField
                    variant="standard"
                    disabled={true}
                    size="small"
                    fullWidth
                    name={`waste_type[${index}]`}
                  />
                </Box>
                {!isDetail ? (
                  index > 0 ? (
                    <IconButtonDelete
                      type="button"
                      onClick={() => removeWastes(index)}
                    >
                      <RemoveIcon sx={{ color: "white" }} />
                    </IconButtonDelete>
                  ) : (
                    <IconButtonAdd
                      type="button"
                      onClick={() => {
                        if (fieldsWastes.length < 5) {
                          appendWastes("");
                        }
                      }}
                    >
                      <AddIcon sx={{ color: "white" }} />
                    </IconButtonAdd>
                  )
                ) : null}
                {/* <Box flex={1}>
              <Typography variant={"body1"} fontWeight="bold" mb={1.5}>
                Harga Acuan
              </Typography>
              <JumboTextField
                variant="standard"
                disabled={true}
                size="small"
                fullWidth
                name="price_per_unit"
              />
            </Box> */}
              </Stack>
            ))}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="end">
          <GreyButton
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/clients")}
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
