import React, { useState } from "react";
import * as yup from "yup";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Div from "@jumbo/shared/Div";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import logo from "app/assets/icons/logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import baseAxios from "app/services/AxiosInterceptor";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  email: yup
    .string("Please enter your email")
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string("Please enter your password")
    .required("Password is required"),
});

const Login = () => {
  const { setAuthToken } = useJumboAuth();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await baseAxios.post("/login", { email, password });
      if (data?.meta?.success) {
        setAuthToken(data?.data?.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.meta?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
      spacing={{ lg: 4, md: 3, sm: 2, xs: 2 }}
      marginX={{ lg: 8, md: 3, sm: 2, xs: 2 }}
      marginY={{ lg: 4, md: 3, sm: 2, xs: 2 }}
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Div
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{ color: "#263238", fontWeight: 800, fontSize: 40, mb: 3 }}
        >
          PT. Lewind
        </Typography>
        <Typography variant="subtitle" sx={{ color: "#000000", fontSize: 20 }}>
          Lewind group adalah sebuah perusahaan transporter limbah B3 terkemuka di Indonesia, mempunyai legalitas yg lengkap, tim profesional, dan layanan yg mengutamakan kepuasan pelanggan.
          Lewindgroup berkomitmen untuk senantiasa berkontribusi pada menjaga kualitas lingkungan,  karena dengan lingkungan yang baik, kehidupan bisa berlangsung dengan berkualitas.
        </Typography>
      </Div>
      <Card sx={{ maxWidth: "100%" }}>
        <CardContent>
          <Div sx={{ display: "flex", mr: 1, alignItems: "center", mb: 3 }}>
            <img src={logo} alt="Lewind Logo" />
            <Div
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                ml: 2,
              }}
            >
              <Typography
                variant="h1"
                sx={{ color: "#263238", fontSize: 24, fontWeight: 800, mb: 0 }}
              >
                Portal Staff
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#BDBDBD",
                  fontSize: 14,
                }}
              >
                Silahkan Login dengan username & password yang benar.
              </Typography>
            </Div>
          </Div>
          <Div>
            <FormProvider {...methods}>
              <form
                style={{ textAlign: "left" }}
                noValidate
                autoComplete="off"
                onSubmit={methods.handleSubmit((data) =>
                  onSignIn(data.email, data.password)
                )}
              >
                {errorMessage && <p>{errorMessage}</p>}
                <Div sx={{ mb: 3, mt: 1 }}>
                  <Typography variant={"body1"} mb={1}>
                    Username
                  </Typography>
                  <JumboTextField fullWidth name="email" />
                </Div>
                <Div sx={{ mb: 2, mt: 1 }}>
                  <Typography variant={"body1"} mb={1}>
                    Password
                  </Typography>
                  <JumboTextField
                    fullWidth
                    name="password"
                    type={showPwd ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPwd((curr) => !curr)}
                          >
                            {showPwd && <VisibilityIcon />}
                            {!showPwd && <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Div>
                {/* <Typography textAlign={"right"} variant={"body1"} mb={2}>
                  <Link underline="none" href="#">
                    Forgot your password?
                  </Link>
                </Typography> */}
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mb: 3 }}
                  loading={isLoading}
                  loadingIndicator="Loading ..."
                >
                  Login
                </LoadingButton>
                {/* <Typography textAlign={"center"} variant={"body1"} mb={1}>
                  Don't have an account? &nbsp;
                  <Link underline="none" href="#">
                    Sign up now
                  </Link>
                </Typography> */}
              </form>
            </FormProvider>
          </Div>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Login;
