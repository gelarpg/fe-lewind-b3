import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

//todo: to see how to define prop-types for this component

const JumboTextField = (props) => {
  const { name } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={props?.control ?? control}
      defaultValue=""
      render={({ field, fieldState: {invalid, error} }) => {
        return (
          <TextField
            {...props}
            {...field}
            autoComplete='off'
            helperText={error?.message ?? ''}
            error={invalid}
            inputProps={{
              autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }}
          />
        )
      }}
    />
  );
};

export default React.memo(JumboTextField);
