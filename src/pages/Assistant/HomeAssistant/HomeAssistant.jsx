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

const HomeAssistant = () => {
  const { user } = useSelector((state) => state);
  const [listStations, setListStations] = useState([]);
  const [search, setSearch] = useState("");

  const getStationByAssistant = async () => {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "stations/getbyassistant", {
        gouvernorats: user.gouvernorats,
      })
      .then((response) => {
        setListStations(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getStationByAssistant();
  });

  return (
    <Stack>
      <TextField
        style={{ width: "200px" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search ..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Gouvernorat</TableCell>
            <TableCell align="left">Adresse</TableCell>
            <TableCell align="left">Gerant</TableCell>
            <TableCell align="left">Nb intervention</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listStations
            .filter((station) => {
              return (
                station.gouvernorat
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                station.adresse.toLowerCase().includes(search.toLowerCase()) ||
                station.gerant.firstname
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                station.gerant.lastname
                  .toLowerCase()
                  .includes(search.toLowerCase())
              );
            })
            .map((station) => {
              return (
                <TableRow>
                  <TableCell>{station.gouvernorat}</TableCell>
                  <TableCell align="left">{station.adresse}</TableCell>
                  <TableCell
                    align="left"
                    style={{ textTransform: "capitalize" }}
                  >
                    {station.gerant.firstname} {station.gerant.lastname}
                  </TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default HomeAssistant;
