import React, { useState } from "react";
import { FormHelperText, Box, Typography, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { GreyButton } from "./CustomIconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const FormikUploadFile = ({
  label = "Upload File",
  accept = "application/pdf",
  defaultFileName = "",
  disabled = false,
  ...props
}) => {
  const { name } = props;
  const { control, setValue, getValues } = useFormContext();
  const [filename, setFilename] = useState(defaultFileName);
  const value = useWatch({ name });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onBlur }, fieldState: { invalid, error } }) => (
        <>
          <Grid container spacing={1} direction="row">
            <Grid item xs={4} sx={{ position: "relative" }}>
              <GreyButton
                variant="contained"
                component="label"
                startIcon={<FileUploadIcon />}
                size="small"
                sx={{ height: "min-content" }}
                disabled={disabled}
              >
                {label}
                <input
                  name={name}
                  accept={accept}
                  onBlur={onBlur}
                  type="file"
                  hidden
                  onChange={(e) => {
                    setValue(name, e.target.files[0], { shouldValidate: true });
                    setFilename(e.target.value);
                  }}
                />
              </GreyButton>
            </Grid>
            <Grid item xs={8}>
              {filename && (
                <Box flex={1} display="flex" alignItems="center" width={1}>
                  <AttachFileIcon sx={{ mr: 1, color: "#828282" }} />
                  <Typography noWrap sx={{ color: "#828282" }}>
                    {filename}
                  </Typography>
                  <RemoveRedEyeIcon
                    sx={{ cursor: "pointer", ml: 1, color: "#828282" }}
                    onClick={() => {
                      let url = null;
                      if (typeof value === "string") url = value;
                      else if (typeof value === "object")
                        url = URL.createObjectURL(value);
                      if (url) window.open(url, "_blank");
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
          {invalid && (
            <FormHelperText error>
              {error?.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default React.memo(FormikUploadFile);
