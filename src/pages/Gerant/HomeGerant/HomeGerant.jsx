import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const HomeGerant = () => {
  const { user } = useSelector((state) => state);
  return (
    <Stack>
      <Button variant="contained" style={{ width: 300, background: "#d2691e" }}>
        Add new Request
      </Button>
      <Typography>{user.station.gouvernorat}</Typography>
      <Typography>{user.station.adresse}</Typography>
    </Stack>
  );
};

export default HomeGerant;
