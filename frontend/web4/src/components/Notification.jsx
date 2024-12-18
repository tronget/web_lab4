import { Alert, Snackbar } from "@mui/material";

function Notification({info, type, open, setOpen}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {info}
        </Alert>
      </Snackbar>
    )
}

export default Notification;