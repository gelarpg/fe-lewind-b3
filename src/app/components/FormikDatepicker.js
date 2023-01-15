import React from 'react';
import { useField, useFormikContext } from 'formik';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const FormikDatepicker = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          onChange={(value) => setFieldValue(field.name, value)}
          value={field.value}
          renderInput={(params) => {
            return (
              <TextField
                variant="standard"
                name={field.name}
                fullWidth
                {...params}
                error={!!errorText}
                helperText={errorText}
              />
            );
          }}
          {...props}
        />
      </LocalizationProvider>
    </>
  );
};

export default FormikDatepicker;
