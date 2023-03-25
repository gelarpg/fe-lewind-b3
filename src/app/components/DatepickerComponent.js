import React from 'react';
import { TextField, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ClearIcon from '@mui/icons-material/Clear';

const DatepickerComponent = ({
  onChange,
  onClear,
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
              <div style={{ position: "relative", display: "inline-block" }} >
                <TextField
                  variant="outlined"
                  fullWidth
                  onClick={handleClickInput}
                  inputProps={{ ...params.inputProps, readOnly: true }}
                  {...params}
                />
                {(value && onClear) ? (
                <IconButton style={{ position: "absolute", top: ".5rem", margin: "auto", right: "2rem" }} onClick={() => onClear()}>
                  <ClearIcon />
                </IconButton>
                ) : null
              }
              </div>
            );
          }}
          {...props}
        />
      </LocalizationProvider>
    </>
  );
};

export default React.memo(DatepickerComponent);
