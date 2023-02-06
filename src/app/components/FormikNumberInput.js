import React,{useEffect, useState} from 'react';
import { useField } from 'formik';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import { usePropagateRef } from "app/hooks/usePropagateRefs";

const FormikNumberInput = (props) => {
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
          value: props.type === "number" ? parseInt(val, 10) : val,
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

  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <NumericFormat
      {...otherProps}
      {...performanceProps}
      decimalScale={4}
      allowNegative={false}
      thousandSeparator="."
      decimalSeparator=","
      customInput={TextField}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default React.memo(FormikNumberInput);
