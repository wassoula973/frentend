import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const HomeGerant = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  return (
    <Stack>
      <Button
        variant="contained"
        style={{ width: 300, background: "#d2691e" }}
        onClick={() => {
          navigate("/add_request");
        }}
      >
        Add new Request
      </Button>

      <Button
        onClick={() => {
          navigate("/requests");
        }}
      >
        Manage My Request
      </Button>
      <Typography>{user.station && user.station.gouvernorat}</Typography>
      <Typography>{user.station && user.station.adresse}</Typography>
    </Stack>
  );
};

export default HomeGerant;
