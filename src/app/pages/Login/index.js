import React, { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";

import { Card, CardContent, Typography, Stack, Link, InputAdornment, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Div from "@jumbo/shared/Div";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import logo from "app/assets/icons/logo.svg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const onSignIn = async () => {
    setLoading(true);
    try {
    } catch (error) {
      setErrorMessage(error?.response?.data?.meta?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={4}
      margin={4}
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </Typography>
            </Div>
          </Div>
          <Div>
            <Formik
              
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                onSignIn(data.email, data.password);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  style={{ textAlign: "left" }}
                  noValidate
                  autoComplete="off"
                >
                  {errorMessage && <p>{errorMessage}</p>}
                  <Div sx={{ mb: 3, mt: 1 }}>
                    <Typography variant={"body1"} mb={1}>Email</Typography>
                    <JumboTextField fullWidth name="email" />
                  </Div>
                  <Div sx={{ mb: 2, mt: 1 }}>
                    <Typography variant={"body1"} mb={1}>Password</Typography>
                    <JumboTextField
                      fullWidth
                      name="password"
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
                  </Div>
                  <Typography textAlign={"right"} variant={"body1"} mb={2}>
                    <Link underline="none" href="#">
                      Forgot your password?
                    </Link>
                  </Typography>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ mb: 3 }}
                    loading={isSubmitting || isLoading}
                    loadingIndicator="Loading ..."
                  >
                    Login
                  </LoadingButton>
                  <Typography textAlign={"center"} variant={"body1"} mb={1}>
                    Don't have an account? &nbsp;
                    <Link underline="none" href="#">
                      Sign up now
                    </Link>
                  </Typography>
                </Form>
              )}
            </Formik>
          </Div>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Login;
