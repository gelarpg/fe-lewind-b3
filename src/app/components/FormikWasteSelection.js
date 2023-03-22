import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { Box, FormHelperText } from "@mui/material";
import { alpha } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { isEmpty, isEqual } from "lodash";
import usePrevious from "app/hooks/usePrevious";

let NEXT_PAGE = null;

const FormikWasteSelection = ({
  placeholder = "Pilih Jenis Limbah",
  isDisabled,
  ...props
}) => {
  const { name } = props;
  const { control } = useFormContext();
  const { isLoading, data: wasteData, error, axiosFetch } = useAxiosFunction();

  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState({
    page: 0,
    limit: 50,
  });

  const prevQuery = usePrevious(query);

  useEffect(() => {
    if (!isEmpty(query)) {
      if (!isEqual(prevQuery, query)) {
        axiosFetch({
          method: "get",
          url: "/waste",
          requestConfig: {
            params: {
              ...query,
            },
          },
        });
      }
    }
  }, [query, prevQuery]);

  useEffect(() => {
    if (wasteData?.paginator && wasteData.waste) {
      setOptions((curr) => [
        ...curr,
        ...wasteData.waste.map((x) => ({
          value: x.id,
          label: x.name,
          type: x.type,
          weight_unit: x.weight_unit,
          price_unit: x.price_unit,
        })),
      ]);
      NEXT_PAGE = wasteData?.paginator?.nextPage;
    }
  }, [wasteData]);

  const onMenuClose = useCallback(() => {
    setOptions([]);
    setQuery({});
    NEXT_PAGE = null;
  }, []);

  const onMenuOpen = useCallback(() => {
    setQuery({ page: 1, limit: 50 });
  }, []);

  const onMenuScrollToBottom = useCallback(() => {
    if (NEXT_PAGE) {
      setQuery((curr) => ({ ...curr, page: NEXT_PAGE }));
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({
          field: { value, onChange, onBlur },
          fieldState: { invalid, error },
        }) => (
          <>
            <Select
              isDisabled={isDisabled}
              placeholder={placeholder}
              menuPortalTarget={document.body}
              options={options}
              onBlur={onBlur}
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
                option: (
                  styles,
                  { data, isSelected, isFocused, isDisabled }
                ) => ({
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
              value={value}
              isClearable={false}
              isSearchable={false}
              onChange={(value) => {
                onChange(value);
                if (props?.onChange) props.onChange(value);
              }}
              closeMenuOnSelect={true}
              isLoading={isLoading}
              onMenuScrollToBottom={onMenuScrollToBottom}
              onMenuClose={onMenuClose}
              onMenuOpen={onMenuOpen}
            />
            {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
      />
    </Box>
  );
};

export default React.memo(FormikWasteSelection);
