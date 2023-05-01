import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { Box, FormHelperText } from "@mui/material";
import { alpha } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { isEmpty, isEqual } from "lodash";
import usePrevious from "app/hooks/usePrevious";
import baseAxios from 'app/services/AxiosInterceptor';

let NEXT_PAGE = null;

const FormikClientSelection = ({
  placeholder = "Pilih Klien",
  isDisabled,
  ...props
}) => {
  const { name } = props;
  const { control } = useFormContext();
  const { isLoading, data: clientData, error, axiosFetch } = useAxiosFunction();

  const [options, setOptions] = useState([]);
  const [isLoadingDetail, setLoadingDetail] = useState(false);
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
          url: "/clients",
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
    if (clientData?.paginator && clientData.clients) {
      setOptions((curr) => [
        ...curr,
        ...clientData.clients.map((x) => ({
          value: x.id,
          label: x.name,
          address: x.address,
          waste_name: x.waste_name,
          waste_type: x.waste_type,
          waste_reference_price: x?.waste_price_unit ?? ""
        })),
      ]);
      NEXT_PAGE = clientData?.paginator?.nextPage;
    }
  }, [clientData]);

  const onMenuClose = useCallback(() => {
    setOptions([]);
    setQuery({});
    NEXT_PAGE = null;
  }, []);

  const onMenuOpen = useCallback(() => {
    setQuery({ limit: 50, page: 1 });
  }, []);

  const onMenuScrollToBottom = useCallback(() => {
    if (NEXT_PAGE) {
      setQuery((curr) => ({ ...curr, page: NEXT_PAGE }));
    }
  }, []);

  const getClientDetail = async (id) => {
    try {
      setLoadingDetail(true);
      const { data } = await baseAxios.get(`/clients/detail/${id}`);
      return data.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.meta?.message ?? error?.response?.data?.message ?? 'Something went wrong';
    } finally {
      setLoadingDetail(false);
    }
  }

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
              onChange={async (value) => {
                onChange(value);
                const client = await getClientDetail(value.value);
                if (props?.onChange && client) props?.onChange(client);
              }}
              closeMenuOnSelect={true}
              isLoading={isLoading || isLoadingDetail}
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

export default React.memo(FormikClientSelection);
