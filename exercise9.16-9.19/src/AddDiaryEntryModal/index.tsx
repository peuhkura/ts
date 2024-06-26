import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddDiaryEntryForm from "./AddDiaryEntryForm"
import { DiaryEntry } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DiaryEntry) => void;
  error?: string;
}

const AddDiaryEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a diary entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddDiaryEntryForm onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddDiaryEntryModal;
