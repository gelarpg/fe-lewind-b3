import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const DatepickerComponent = ({
  onChange,
  value,
  ...props
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          onChange={onChange}
          value={value}
          renderInput={(params) => {
            return (
              <TextField
                variant="outlined"
                fullWidth
                {...params}
              />
            );
          }}
          {...props}
        />
      </LocalizationProvider>
    </>
  );
};

export default React.memo(DatepickerComponent);
