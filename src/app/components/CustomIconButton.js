import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const IconButtonDelete = styled(IconButton)({
  backgroundColor: "#DC4343",
  borderRadius: "5px",
  "&:hover, &:focus": {
    backgroundColor: "#DC4343",
  },
});

const IconButtonEdit = styled(IconButton)({
  backgroundColor: "#4A4AE9",
  borderRadius: "5px",
  marginRight: "16px",
  "&:hover, &:focus": {
    backgroundColor: "#4A4AE9",
  },
});

const CustomEditIconButton = (props) => {
  return (
    <IconButtonEdit aria-label="edit" type="button" {...props}>
      <EditIcon sx={{ color: "white" }} />
    </IconButtonEdit>
  );
};

const CustomDeleteIconButton = (props) => {
  return (
    <IconButtonDelete aria-label="delete" type="button" {...props}>
      <DeleteIcon sx={{ color: "white" }} />
    </IconButtonDelete>
  );
};

export { CustomEditIconButton, CustomDeleteIconButton };
