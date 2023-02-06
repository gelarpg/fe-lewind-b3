import React, {useState} from "react";
import { useField, useFormikContext } from "formik";
import { FormHelperText, Box, Stack, Typography, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { GreyButton } from "./CustomIconButton";
import AttachFileIcon from '@mui/icons-material/AttachFile';

const FormikUploadFile = ({
  label = "Upload File",
  accept = "application/pdf",
  defaultFileName = '',
  disabled = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [filename, setFilename] = useState(defaultFileName);

  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={4} sx={{ position: 'relative' }}>
        <GreyButton
          variant="contained"
          component="label"
          startIcon={<FileUploadIcon />}
          size="small"
          sx={{ height: 'min-content' }}
          disabled={disabled}
        >
          {label}
          <input
            name={field.name}
            accept={accept}
            type="file"
            hidden
            onChange={(e) => {
              setFieldValue(field.name, e.target.files[0]);
              setFilename(e.target.value);
            }}
          />
        </GreyButton>
        {errorText && (
          <FormHelperText sx={{ position: 'absolute' }} error>{errorText}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={8}>
        {filename && (
          <Box flex={1} display="flex" alignItems="center" width={1}>
            <AttachFileIcon sx={{mr: 1, color: '#828282'}} />
            <Typography noWrap sx={{ color: '#828282' }}>{filename}</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default FormikUploadFile;
