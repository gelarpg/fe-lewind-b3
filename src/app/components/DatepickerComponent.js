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
  const [isOpen, setOpen] = React.useState(false);

  const handleClickInput = React.useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          open={isOpen}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          reduceAnimations={true}
          closeOnSelect={true}
          onChange={onChange}
          value={value}
          renderInput={(params) => {
            return (
              <TextField
                variant="outlined"
                fullWidth
                onClick={handleClickInput}
                inputProps={{ ...params.inputProps, readOnly: true }}
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
