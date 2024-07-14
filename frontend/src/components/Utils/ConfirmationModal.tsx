import { Box, Button, Fade, Modal, Stack, Typography } from "@mui/material";

export const ConfirmationModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: any;
}> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" mb={2}>
              Are you sure you want to remove it?
            </Typography>
            <Typography variant="body2" mb={4}>
              This action cannot be undone.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="outlined" color="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={onConfirm}>
                Confirm
              </Button>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
