import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router";

const ListIntervention = () => {
  const [search, setSearch] = useState("");
  const [selectedInterventions, setSelectedInterventions] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const { token } = useSelector((state) => state);
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "date",
      headerName: "Date",
      renderCell: (cell) => {
        return dayjs(cell.row.date).format("YYYY-MM-DD HH:mm");
      },
      flex: 0.5,
    },
    {
      field: "gerant",
      headerName: "Gerant",
      renderCell: (cell) => {
        return cell.row.gerant.firstname + " " + cell.row.gerant.lastname;
      },
      flex: 0.6,
    },
    {
      field: "station",
      headerName: "Station",
      renderCell: (cell) => {
        return cell.row.station.adresse + " " + cell.row.station.gouvernorat;
      },

      flex: 1,
    },
    { field: "intensity", headerName: "Intensity", flex: 0.5 },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (cell) => {
        return (
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/intervention/" + cell.row._id);
              }}
            >
              <RemoveRedEyeIcon />
            </Button>
          </Stack>
        );
      },
    },
  ];

  const getAll = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "admin/interventions", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setInterventions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <div>
      <Paper sx={{ height: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", margin: "25px" }}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="input-with-sx"
            label="Search ..."
            variant="outlined"
          />
        </Box>
        <DataGrid
          onRowSelectionModelChange={(rows) => {
            setSelectedInterventions(rows);
          }}
          rows={interventions
            .filter((i) => {
              return (
                i.gerant.firstname
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                i.gerant.lastname
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                i.station.gouvernorat
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                i.station.adresse
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                i._id.toLowerCase().includes(search.toLowerCase()) ||
                i.date.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((i) => {
              return { ...i, id: i._id };
            })}
          getCellClassName={(cell) =>
            `${
              cell.field != "actions" && cell.row.deleted ? "row_deleted" : ""
            }`
          }
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          sx={{ border: 0, height: "auto" }}
        />
      </Paper>
    </div>
  );
};

export default ListIntervention;
