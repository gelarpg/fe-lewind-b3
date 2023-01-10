import React, { Fragment, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { isArray } from "lodash";

const TableColumns = ({ columns }) => {
  if (isArray(columns) && columns.length) {
    return columns.map((column, idx) => (
      <TableCell key={`column-${idx}`}>
        {typeof column.title === "string"
          ? column.title
          : typeof column.title === "function"
          ? column.title()
          : typeof column.title === "object"
          ? column.title
          : null}
      </TableCell>
    ));
  }
  return null;
};

const CustomTableBody = ({
  dataSource,
  columns,
  page,
  rowsPerPage,
  emptyRows,
}) => {
  if (isArray(dataSource) && dataSource.length) {
    return dataSource
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((data, key) => (
        <TableRow
          key={key}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {columns.map((col, idx) => (
            <TableCell key={idx}>{renderTableCell(data, col, key)}</TableCell>
          ))}
        </TableRow>
      ));
  }
  return (
    <TableRow>
      <TableCell colSpan={columns.length}>No Data</TableCell>
    </TableRow>
  );
};

const renderTableCell = (data, column, dataKey) => {
  if (typeof column.render === "function") {
    return column.render(data[column.dataIndex], data, dataKey);
  } else if (typeof column.render === "string") {
    return column.render;
  }
  return data[column.dataIndex];
};

const CustomTableComponent = ({
  columns,
  dataSource,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const emptyRows = useMemo(() => {
    return page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - dataSource.length)
      : 0;
  }, [page, dataSource, rowsPerPage]);
  return (
    <Fragment>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableColumns columns={columns} />
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomTableBody
              dataSource={dataSource}
              columns={columns}
              page={page}
              rowsPerPage={rowsPerPage}
              emptyRows={emptyRows}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataSource.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default React.memo(CustomTableComponent);
