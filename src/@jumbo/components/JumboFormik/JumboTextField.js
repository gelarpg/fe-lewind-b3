import React, { useState, useEffect } from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import { usePropagateRef } from "app/hooks/usePropagateRefs";

//todo: to see how to define prop-types for this component

const JumboTextField = (props) => {
  const [field, meta] = useField(props);

  const [fieldValue, setFieldValue] = useState(field.value);
  const { disablePerformance, loading, ...otherProps } = props;
  usePropagateRef({
    setFieldValue,
    name: props.name,
    value: field.value,
  });

  useEffect(() => {
    if (meta.touched) {
      return;
    }
    if (field.value !== fieldValue) {
      setFieldValue(field.value);
    }
    // eslint-disable-next-line
  }, [field.value]);

  const onChange = (evt) => {
    setFieldValue(evt.target.value);
  };

  const onBlur = (evt) => {
    const val = evt.target.value || "";
    window.setTimeout(() => {
      field.onChange({
        target: {
          name: props.name,
          value: props.type === "number" ? isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10) : val,
        },
      });
    }, 0);
  };

  const performanceProps = disablePerformance
    ? {
        ...field,
        value: loading ? "Loading..." : fieldValue,
      }
    : {
        ...field,
        value: loading ? "Loading..." : fieldValue,
        onChange,
        onBlur,
        onFocus: onBlur,
      };

  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      {...otherProps}
      InputProps={{
        ...((props.type === "number" && {
          inputProps: { min: props?.min, max: props?.max },
        }) ||
          undefined),
      }}
      error={!!errorText}
      helperText={errorText}
      {...performanceProps}
    />
  );
};

export default React.memo(JumboTextField);
