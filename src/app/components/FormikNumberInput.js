import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';

const FormikNumberInput = (props) => {
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
        <NumericFormat
          {...props}
          {...field}
          decimalScale={4}
          allowNegative={false}
          thousandSeparator="."
          decimalSeparator=","
          customInput={TextField}
          helperText={error ? error?.message : ''}
          error={invalid}
        />
      )}
    />
  );
};

export default React.memo(FormikNumberInput);
