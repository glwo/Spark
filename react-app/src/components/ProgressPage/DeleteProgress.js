import React from 'react';
import {
  Modal,
  Dialog, // Correct import for Dialog
  Button,
} from '@mui/material';

const DeleteProgress = ({ open, onClose, onDeleteProgress }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog
        aria-labelledby="delete-progress-dialog-title"
        aria-describedby="delete-progress-dialog-description"
        sx={{ width: 600, padding: '32px', boxSizing: 'border-box' }}
      >
        <h1>Delete Progress</h1>
        <p>Are you sure you want to delete this progress entry?</p>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button
            className='cancelIconButton'
            style={{ marginLeft: '8px', fontWeight: '800' }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className='addIconButton'
            style={{ marginLeft: '8px', fontWeight: '800' }}
            onClick={() => {
              onDeleteProgress();
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

export default DeleteProgress;

