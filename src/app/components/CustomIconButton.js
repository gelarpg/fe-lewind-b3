import {useState, Fragment} from 'react'
import styled from "@mui/material/styles/styled";
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';

const IconButtonDelete = styled(IconButton)({
  backgroundColor: "#DC4343",
  borderRadius: "5px",
  "&:hover, &:focus": {
    backgroundColor: "#DC4343",
  },
});

const IconApprove = styled(IconButton)({
  backgroundColor: "#007E03",
  borderRadius: "5px",
  "&:hover, &:focus": {
    backgroundColor: "#007E03",
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

const GreyButton = styled(Button)({
  backgroundColor: "#e9ecef",
  borderColor: "#ddd",
  borderRadius: "5px",
  "&:hover, &:focus": {
    backgroundColor: "#e9ecef",
    borderColor: "#ddd",
  },
  color: "#2b2b2b",
  textTransform: "none",
});

const CustomEditIconButton = (props) => {
  return (
    <IconButtonEdit aria-label="edit" type="button" {...props}>
      <EditIcon sx={{ color: "white" }} />
    </IconButtonEdit>
  );
};

const CustomDeleteIconButton = ({ onClick, ...props }) => {
  const [isShow, setShow] = useState(false);
  return (
    <Fragment>
      <IconButtonDelete aria-label="delete" type="button" {...props} onClick={() => setShow(true)}>
        <DeleteIcon sx={{ color: 'white' }} />
      </IconButtonDelete>
      <Dialog open={isShow} onClose={() => setShow(false)}>
        <DialogTitle>Konfirmasi</DialogTitle>
        <DialogContent>
          <DialogContentText>Apakah Anda yakin ingin menghapus data ini?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <GreyButton type="button" variant="outlined" color="secondary" onClick={() => setShow(false)}>
            Batal
          </GreyButton>
          <Button
            variant="contained"
            onClick={() => {
              setShow(false);
              if (onClick) onClick();
            }}
            autoFocus>
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const ApproveIconButton = ({ onClick, ...props }) => {
  const [isShow, setShow] = useState(false);
  return (
    <Fragment>
      <IconApprove aria-label="approve" type="button" {...props} onClick={() => setShow(true)}>
        <CheckIcon sx={{ color: 'white' }} />
      </IconApprove>
      <Dialog open={isShow} onClose={() => setShow(false)}>
        <DialogTitle>Konfirmasi</DialogTitle>
        <DialogContent>
          <DialogContentText>Apakah Anda yakin ingin memproses pengajuan ini?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <GreyButton type="button" variant="outlined" color="secondary" onClick={() => setShow(false)}>
            Batal
          </GreyButton>
          <Button
            variant="contained"
            onClick={() => {
              setShow(false);
              if (onClick) onClick();
            }}
            autoFocus>
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export { CustomEditIconButton, CustomDeleteIconButton, GreyButton, ApproveIconButton };
