import React from 'react';
import { useField } from 'formik';
import { PatternFormat } from 'react-number-format';
import { TextField } from '@mui/material';

const FormikPhoneNumberInput = (props) => {
  const [field, meta] = useField(props);
  const { ...otherProps } = props;

  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <PatternFormat
      {...otherProps}
      {...field}
      type="tel"
      format="+62 ### #########" 
      mask="_" 
      customInput={TextField}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default React.memo(FormikPhoneNumberInput);
