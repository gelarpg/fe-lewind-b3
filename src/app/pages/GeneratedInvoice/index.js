import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Button, Box, Typography } from "@mui/material";
import {
  CustomDownloadIcon
} from "app/components/CustomIconButton";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import usePrevious from "app/hooks/usePrevious";
import { withSnackbar } from "app/components/SnackbarComponent";
import { withRoles } from "app/components/withRoles";
import moment from "moment";

const GeneratedInvoices = (props) => {
  const {isSuperAdmin, isAdminFinance} = props;
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();
  const {
    isLoading: isLoadingList,
    data: invoicesData,
    error: errorInvoicesData,
    refetch,
  } = useFetch({
    url: "/daily-count/list-invoice",
    requestConfig: {
      params: {
        page: 1,
        limit: 10,
      },
    },
  });
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({});
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requestParam, setRequestParam] = useState({
    page: 1,
    limit: 10,
  });
  const [fetched, setFetched] = useState(false);
  const prevParam = usePrevious(requestParam);

  const downloadPDF = (data) => {
    import('app/utils/download').then((module) => {
      module.default(
        `${process.env.REACT_APP_API_BASE_URL_EXPORT}${data}`,
        `TPK01_${moment().format('DD-MM-YYYY_HH_mm_ss')}.pdf`,
      );
    });
  };


  const columns = useMemo(() => {
    return [
      {
        field: "idx",
        headerName: "No",
        renderCell: (index) =>
          rowsPerPage * currentPage + (index.api.getRowIndex(index.row.id) + 1),
        flex: 0.5,
      },
      {
        field: "company_name",
        headerName: "Client",
        flex: 2,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        getActions: (params) => {
          let arr = [];
          if (isAdminFinance || isSuperAdmin) arr = [
            <CustomDownloadIcon
              label={isAdminFinance ? 'Download PDF' : isSuperAdmin ? 'Preview PDF' : ''}
              size="small"
              onClick={() => downloadPDF(params?.row?.path)}
            />,
          ];
          return arr;
        },
        flex: 1,
      },
    ];
  }, [currentPage, rowsPerPage, isAdminFinance]);

  useEffect(() => {
    if (invoicesData?.invoice && invoicesData?.paginator) {
      setDatas(invoicesData.invoice);
      setPagination(invoicesData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [invoicesData]);

  useEffect(() => {
    if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    if (fetched) {
      refetch({
        params: requestParam,
      });
      setFetched(false);
    }
  }, [fetched]);


  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
    setRequestParam((curr) => ({
      ...curr,
      page: page + 1,
    }));
    setFetched(true);
  }, []);

  const onChangeRowsPerPage = useCallback((pageSize) => {
    setRowsPerPage(pageSize);
    setCurrentPage(0);
    setRequestParam((curr) => ({
      ...curr,
      page: 1,
      limit: pageSize,
    }));
    setFetched(true);
  }, []);

  return (
    <Fragment>
      <DataGrid
        ref={tableRef}
        disableColumnMenu
        disableSelectionOnClick
        autoHeight
        disableColumnReorder
        rowHeight={100}
        getRowId={(row) => row.id}
        columns={columns}
        rows={datas}
        onPageChange={onChangePage}
        onPageSizeChange={onChangeRowsPerPage}
        page={currentPage}
        pageSize={rowsPerPage}
        loading={isLoadingList}
        paginationMode="server"
        rowCount={pagination?.itemCount ?? 10}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Fragment>
  );
};

export default withRoles(withSnackbar(GeneratedInvoices));
