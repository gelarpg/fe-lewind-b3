import React,{useEffect, useState} from 'react';
import { useField } from 'formik';
import { PatternFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import { usePropagateRef } from "app/hooks/usePropagateRefs";

const FormikPhoneNumberInput = (props) => {
  const [field, meta] = useField(props);
  const [fieldValue, setFieldValue] = useState(field.value);
  const [formattedValue, setFormattedValue] = useState('');
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
          value: formattedValue,
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
    <PatternFormat
      {...otherProps}
      {...performanceProps}
      type="tel"
      format="+62 ### #########" 
      mask="_" 
      onValueChange={value => setFormattedValue(value.value)}
      customInput={TextField}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default React.memo(FormikPhoneNumberInput);
