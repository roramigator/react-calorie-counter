import { Modal, Box, TextField, Button } from '@mui/material';

function FormModal() {
  return (
    <Modal open={false} onClose={() => {}}>
      <Box component="form" noValidate autoComplete="off">
        <TextField label="Name" value={''} onChange={() => {}} />
        <TextField label="Uncontrolled" defaultValue="foo" />
        <Button variant="contained">Save</Button>
      </Box>
    </Modal>
  );
}

export default FormModal;
