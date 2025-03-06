import { Avatar, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import logo from "../../assets/logo-agil.png";
import admin from "../../assets/admin.png";
import assistant from "../../assets/assistant.png";
import technicien from "../../assets/technicien.png";
import gerant from "../../assets/gerant.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducer";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { user } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      height={"75px"}
      width={"100vw"}
      bgcolor={"#ffd001"}
      direction={"row"}
      alignItems={"center"}
      px={"30px"}
      justifyContent={"space-between"}
    >
      <a href="/">
        <img src={logo} alt="" height={"65px"} width={"auto"} />
      </a>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Typography style={{ textTransform: "capitalize" }}>
          {user.firstname} {user.lastname}
        </Typography>
        <button
          style={{
            borderRadius: "50%",
            height: "65px",
            width: "65px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleClick}
        >
          <Avatar
            alt="Remy Sharp"
            src={
              user.role == "admin"
                ? admin
                : user.role == "assistant"
                ? assistant
                : user.role == "technicien"
                ? technicien
                : user.role == "gerant"
                ? gerant
                : null
            }
          />
        </button>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logout());
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default Navbar;
