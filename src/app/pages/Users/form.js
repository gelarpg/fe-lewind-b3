import React, { useMemo, useState } from "react";
import { Typography, Box, InputAdornment, IconButton } from "@mui/material";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { GreyButton } from "app/components/CustomIconButton";
import FormikReactSelect from "app/components/FormikReactSelect";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CustomForm = ({
  initialValues,
  isDetail = false,
  isEdit = false,
  onSubmit,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const validationSchema = useMemo(() => {
    return yup.object({
      email: yup.string().required('Email harus diisi').email('Silahkan masukkan email yang valid'),
      first_name: yup.string().trim().required('Nama depan harus diisi'),
      last_name: yup.string().trim().required('Nama belakang harus diisi'),
      phone: yup.string(),
      roles: yup
        .object()
        .shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
        .test('required', 'Hak akses harus diisi', (value, ctx) => {
          if (!value) return false;
          else if (value !== null && value.value && value.label) return !!value.value && !!value.label;
          return true;
        })
        .nullable(),
      password: isEdit
        ? yup.string()
        : yup
            .string()
            .required('Password harus diisi')
            .min(8, 'Password terlalu pendek')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              'Password harus terdiri dari 8 karakter, minimal 1 huruf besar, 1 huruf kecil, 1 angka dan 1 spesial karakter',
            ),
      confirmPassword: isEdit
        ? yup.string()
        : yup
            .string()
            .required('Konfirmasi password harus diisi')
            .oneOf([yup.ref('password'), null], 'Password tidak sama'),
    });
  }, [isEdit]);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  return (
    <FormProvider {...methods}>
      <form style={{ textAlign: 'left' }} noValidate autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
        <Box mb={4}>
          <Box flex={1} mb={3}>
            <Typography variant={'body1'} fontWeight="bold" mb={1.5}>
              Email
            </Typography>
            <JumboTextField variant="standard" disabled={isDetail} size="small" fullWidth name="email" placeholder="Email" />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={'body1'} fontWeight="bold" mb={1.5}>
              Nama Depan
            </Typography>
            <JumboTextField variant="standard" disabled={isDetail} size="small" fullWidth name="first_name" placeholder="Nama Depan" />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={'body1'} fontWeight="bold" mb={1.5}>
              Nama Belakang
            </Typography>
            <JumboTextField variant="standard" disabled={isDetail} size="small" fullWidth name="last_name" placeholder="Nama Belakang" />
          </Box>
          <Box flex={1} mb={3}>
            <Typography variant={'body1'} fontWeight="bold" mb={1.5}>
              Hak Akses
            </Typography>
            <FormikReactSelect
              isSearchable={false}
              isDisabled={isDetail}
              name="roles"
              placeholder="Pilih Hak Akses"
              useStaticData
              optionsData={[
                {
                  id: 2,
                  name: 'Admin Perencanaan',
                },
                {
                  id: 3,
                  name: 'Operasional',
                },
                {
                  id: 4,
                  name: 'Direksi',
                },
              ]}
            />
          </Box>
          {!isDetail && (
            <>
              <Box flex={1} mb={3}>
                <Typography variant={'body1'} fontWeight="bold" mb={1.5}>
                  Kata Sandi
                </Typography>
                <JumboTextField
                  disabled={isDetail}
                  variant="standard"
                  size="small"
                  fullWidth
                  name="password"
                  placeholder="Kata Sandi"
                  type={showPwd ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPwd((curr) => !curr)}>
                          {showPwd && <VisibilityIcon />}
                          {!showPwd && <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box flex={1} mb={3}>
                <Typography variant={'body1'} fontWeight="bold" mb={1.5}>
                  Konfirmasi Kata Sandi
                </Typography>
                <JumboTextField
                variant="standard"
                  disabled={isDetail}
                  size="small"
                  fullWidth
                  name="confirmPassword"
                  placeholder="Konfirmasi Kata Sandi"
                  type={showConfirmPwd ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPwd((curr) => !curr)}>
                          {showConfirmPwd && <VisibilityIcon />}
                          {!showConfirmPwd && <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="end">
          <GreyButton
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/users")}
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
