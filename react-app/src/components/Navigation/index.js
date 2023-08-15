import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./Navigation.css";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    // marginRight: theme.spacing(2),
  },
}));

function Navigation({ isLoaded }) {
  const classes = useStyles();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <NavLink exact to="/" className={classes.link}>
            <WhatshotIcon fontSize="large" />
          </NavLink>
        </Typography>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
