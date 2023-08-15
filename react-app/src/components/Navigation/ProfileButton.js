import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const ulRef = useRef(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    history.push("/");
  };

  const handleCloseMenu = () => {
    closeMenu();
  };

  return (
    <>
      <IconButton onClick={openMenu}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {user ? (
          <>
            <MenuItem>{user.username}</MenuItem>
            <MenuItem>{user.email}</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={handleCloseMenu}
                modalComponent={<LoginFormModal />}
              />
            </MenuItem>
            <MenuItem>
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={handleCloseMenu}
                modalComponent={<SignupFormModal />}
              />
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}

export default ProfileButton;
