import React from 'react';
import { Button } from '@mui/material';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session'; // Import the login action
import { IconButton, Menu, MenuItem } from "@mui/material";

function OpenModalButton({
  modalComponent,
  buttonText,
  onItemClick, // Add onItemClick prop
}) {
  const { setModalContent } = useModal();

  const onClick = () => {
    if (onItemClick) {
      onItemClick(); // Call the provided function to close the menu
    }
    setModalContent(modalComponent);
  };

  return (
    <MenuItem onClick={onClick}>
      {buttonText}
    </MenuItem>
  );
}


export default OpenModalButton;
