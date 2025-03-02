import React from "react";
import imgNotFound from "../../assets/404.jpg";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack alignItems={"center"}>
      <img
        src={imgNotFound}
        height={"100%"}
        width={"100%"}
        style={{ position: "absolute" }}
      />
      <Button
        style={{
          position: "relative",
          top: "600px",
          background: "#000",
          color: "#fff",
          width: "200px",
          fontSize: "26px",
          borderRadius: "15px",
        }}
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </Stack>
  );
};

export default NotFound;
