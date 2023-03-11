import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import useAxiosFunction from 'app/hooks/useAxiosFunction';
import useJumboAuth from '@jumbo/hooks/useJumboAuth';
import { Box, FormHelperText } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { alpha } from "@mui/material";

let NEXT_PAGE = null;

const FormikWasteSelection = ({
  placeholder = 'Pilih Jenis Limbah',
  isDisabled,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const errorText = meta.error && meta.touched ? meta.error : '';
  const { isLoading, data: wasteData, error, axiosFetch } = useAxiosFunction();
  const { authUser } = useJumboAuth();

  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState({
    page: 1,
    limit: 50,
  });

  useEffect(() => {
    if (authUser) {
      axiosFetch({
        method: 'get',
        url: '/waste',
        requestConfig: {
          params: {
            ...query,
          },
        },
      });
    }
  }, [authUser, query]);

  useEffect(() => {
    if (wasteData?.paginator && wasteData.waste) {
      setOptions((curr) => [
        ...curr,
        ...wasteData.waste.map((x) => ({ value: x.id, label: x.type })),
      ]);
      NEXT_PAGE = wasteData?.paginator?.nextPage;
    }
  }, [wasteData]);

  const onMenuClose = useCallback(() => {
    if (query.page > 1) {
      setOptions([]);
      setQuery((curr) => ({ ...curr, page: 1 }));
    }
  }, [query]);

  const onMenuScrollToBottom = useCallback(() => {
    if (NEXT_PAGE) {
      setQuery((curr) => ({ ...curr, page: NEXT_PAGE }));
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Select
        isDisabled={isDisabled}
        placeholder={placeholder}
        menuPortalTarget={document.body}
        options={options}
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
        value={field.value}
        isClearable={false}
        isSearchable={false}
        onChange={(value) => setFieldValue(field.name, value)}
        closeMenuOnSelect={true}
        isLoading={isLoading}
        onMenuScrollToBottom={onMenuScrollToBottom}
        onMenuClose={onMenuClose}
      />
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </Box>
  );
};

export default React.memo(FormikWasteSelection);
