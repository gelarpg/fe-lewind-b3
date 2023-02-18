/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { useField, useFormikContext } from "formik";
import Select from "react-select";
import { alpha } from "@mui/material";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { Box, FormHelperText } from "@mui/material";
import useAxiosFunction from "app/hooks/useAxiosFunction";

const FormikReactSelect = ({
  placeholder = "Pilih Jenis Kendaraan",
  isDisabled,
  url,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const errorText = meta.error && meta.touched ? meta.error : "";
  const { isLoading, data: datas, error, axiosFetch } = useAxiosFunction();
  const { authUser } = useJumboAuth();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (datas?.length) {
      setOptions(datas.map((x) => ({ value: x.id, label: x.name })));
    }
  }, [datas]);

  const onMenuOpen = useCallback(() => {
    if (authUser && !options.length && url) {
      axiosFetch({
        method: "get",
        url,
      });
    }
  }, [authUser, options, url]);

  const getStyle = useCallback(() => {
    return {
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
        color: isSelected || isFocused ? "#fff" : data.color,
      }),
    };
  }, [errorText]);

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Select
        isDisabled={isDisabled}
        placeholder={placeholder}
        menuPortalTarget={document.body}
        options={options}
        styles={getStyle()}
        value={field.value}
        isClearable={false}
        isSearchable={true}
        onChange={(value) => setFieldValue(field.name, value)}
        closeMenuOnSelect={true}
        isLoading={isLoading}
        onMenuOpen={onMenuOpen}
      />
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </Box>
  );
};

export default React.memo(FormikReactSelect);
