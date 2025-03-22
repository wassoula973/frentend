import {
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ListRequests from "../../ListRequests/ListRequests";

const HomeAssistant = () => {
  const { user } = useSelector((state) => state);
  const [listStations, setListStations] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <Stack>
      <ListRequests />
    </Stack>
  );
};

export default HomeAssistant;
