import React from 'react';
import { useField } from 'formik';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';

const FormikNumberInput = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <NumericFormat
      {...props}
      {...field}
      decimalScale={4}
      allowNegative={false}
      thousandSeparator="."
      decimalSeparator=","
      customInput={TextField}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default FormikNumberInput;
