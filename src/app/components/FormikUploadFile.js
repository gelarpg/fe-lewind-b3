import React from "react";
import { useField, useFormikContext } from "formik";
import { FormHelperText, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { GreyButton } from "./CustomIconButton";

const FormikUploadFile = ({
  label = "Upload File",
  accept = "image/*",
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <>
      <GreyButton
        variant="contained"
        component="label"
        startIcon={<FileUploadIcon />}
        size="small"
        sx={{ height: 'min-content' }}
      >
        {label}
        <input
          name={field.name}
          accept={accept}
          type="file"
          hidden
          onChange={(e) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              if (fileReader.readyState === 2) {
                setFieldValue(field.name, fileReader.result);
              }
            };
            fileReader.readAsDataURL(e.target.files[0]);
          }}
        />
      </GreyButton>
      {errorText && (
        <FormHelperText error>{errorText}</FormHelperText>
      )}
    </>
  );
};

export default FormikUploadFile;
