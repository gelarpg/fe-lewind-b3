import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useFormContext, Controller } from 'react-hook-form';

const FormikDatepicker = (props) => {
  const { name } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [isOpen, setOpen] = React.useState(false);

  const handleClickInput = React.useCallback(() => {
    if (!props.disabled) setOpen(true);
  }, []);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value, onBlur }, fieldState: {invalid, error} }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              open={isOpen}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              reduceAnimations={true}
              onChange={(value) => {
                onChange(value);
              }}
              closeOnSelect={true}
              value={value}
              renderInput={(params) => {
                return (
                  <TextField
                    variant="standard"
                    name={name}
                    fullWidth
                    {...params}
                    error={invalid}
                    helperText={error?.message ?? ''}
                    // onKeyDown={(e) => e.preventDefault()}
                    onClick={handleClickInput}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                  />
                );
              }}
              {...props}
            />
          </LocalizationProvider>
        )}
      />
    </>
  );
};

export default FormikDatepicker;
