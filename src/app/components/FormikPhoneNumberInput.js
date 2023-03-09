import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { TextField } from '@mui/material';

const FormikPhoneNumberInput = (props) => {
  const { name } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: {invalid, error} }) => (
        <PatternFormat
          {...props}
          {...field}
          type="tel"
          format="+62 ### #########"
          mask="_"
          customInput={TextField}
          helperText={error?.message}
          error={invalid}
        />
      )}
    />
  );
};

export default React.memo(FormikPhoneNumberInput);
