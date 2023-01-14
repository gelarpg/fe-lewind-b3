import React from "react";
import { useField, useFormikContext } from "formik";
import Select from "react-select";
import FormHelperText from "@mui/material/FormHelperText";
import { alpha } from "@mui/material";

const FormikReactSelect = (props) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext()
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div>
      <Select
        {...props}
        styles={{
          control: (styles) => ({
            ...styles,
            borderColor: errorText ? "#dc3545" : "#007E03",
            ":hover": {
              ...styles[":hover"],
              borderColor: errorText ? "#dc3545" : "#007E03",
            },
            boxShadow: "none",
          }),
          option: (styles, { data, isSelected, isFocused, isDisabled }) => ({
            ...styles,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? "#007E03"
              : isFocused
              ? alpha("#007E03", 0.5)
              : undefined,
            color: (isSelected || isFocused) ? "#fff" : data.color,
          }),
        }}
        onChange={(value) =>
          setFieldValue(field.name, value)
        }
        value={field.value}
        menuPortalTarget={document.body}
      />
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </div>
  );
};

export default FormikReactSelect;
