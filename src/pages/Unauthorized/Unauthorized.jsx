import React from "react";
import imgUnauthorized from "../../assets/403.png";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducer";

const Unauthorized = () => {
  const dispatch = useDispatch();
  return (
    <Stack alignItems={"center"}>
      <img
        src={imgUnauthorized}
        height={"100%"}
        width={"100%"}
        style={{ position: "absolute" }}
      />
      <Button
        style={{
          position: "relative",
          top: "600px",
          background: "#ffd001",
          color: "#000",
          width: "200px",
          fontSize: "26px",
          borderRadius: "15px",
        }}
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default Unauthorized;
