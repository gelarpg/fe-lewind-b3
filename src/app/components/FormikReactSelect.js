/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { alpha } from "@mui/material";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { Box, FormHelperText } from "@mui/material";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { useFormContext, Controller } from 'react-hook-form';
import { isEmpty, isEqual } from "lodash";
import usePrevious from "app/hooks/usePrevious";

let NEXT_PAGE = null;

const FormikReactSelect = ({
  placeholder = "Pilih Jenis Kendaraan",
  isDisabled,
  url,
  valueProp = "id",
  labelProp = "name",
  usePagination = false,
  objectProp = undefined,
  useStaticData = false,
  optionsData = [],
  ...props
}) => {
  const { name } = props;
  const {
    control,
  } = useFormContext();
  const { isLoading, data: datas, error, axiosFetch } = useAxiosFunction();
  const { authUser } = useJumboAuth();

  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState({ limit: 50, page: 0 });
  const prevQuery = usePrevious(query);

  useEffect(() => {
    if (useStaticData && optionsData?.length) {
      setOptions(optionsData.map((x) => ({ value: x[valueProp], label: x[labelProp] })));
    }
  }, [useStaticData, optionsData])

  useEffect(() => {
    if (usePagination) {
      if (objectProp && datas?.paginator && datas[objectProp]) {
        setOptions((curr) => [
          ...curr,
          ...datas[objectProp].map((x) => ({ value: x[valueProp], label: x[labelProp] })),
        ]);
        NEXT_PAGE = datas?.paginator?.nextPage;
      }
    } else {
      if (datas?.length) {
        setOptions(datas.map((x) => ({ value: x[valueProp], label: x[labelProp] })));
      }
    }
  }, [datas]);

  useEffect(() => {
    if (!isEmpty(query) && usePagination) {
      if (!isEqual(prevQuery, query)) {
        axiosFetch({
          method: "get",
          url,
          requestConfig: {
            params: {
              ...query,
            },
          },
        });
      }
    }
  }, [prevQuery, query]);

  const onMenuOpen = () => {
    if (authUser && !options.length && url) {
      if (usePagination) {
        setQuery({ limit: 50, page: 1 });
      } else {
        axiosFetch({
          method: "get",
          url,
        });
      }
    }
  };

  const onMenuScrollToBottom = () => {
    if (NEXT_PAGE && usePagination) {
      setQuery((curr) => ({ ...curr, page: NEXT_PAGE }));
    }
  }

  const onMenuClose = () => {
    if (usePagination) {
      setQuery({});
      if (!useStaticData) setOptions([]);
      NEXT_PAGE = null;
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value, onBlur }, fieldState: {invalid, error} }) => (
        <Box display="flex" flexDirection="column" flex={1}>
          <Select
            {...props}
            isDisabled={isDisabled}
            options={options}
            placeholder={placeholder}
            value={value}
            isClearable={false}
            isSearchable={true}
            onChange={(val) => onChange(val)}
            onBlur={onBlur}
            closeMenuOnSelect={true}
            isLoading={isLoading}
            onMenuOpen={onMenuOpen}
            onMenuClose={onMenuClose}
            onMenuScrollToBottom={onMenuScrollToBottom}
            styles={{
              control: (styles) => ({
                ...styles,
                borderColor: invalid ? "#dc3545" : "#E0E0E0",
                ":hover": {
                  ...styles[":hover"],
                  borderColor: invalid ? "#dc3545" : "#E0E0E0",
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
            }}
            menuPortalTarget={document.body}
          />
          {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default React.memo(FormikReactSelect);
