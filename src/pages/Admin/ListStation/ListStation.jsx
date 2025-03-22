import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Swal from "sweetalert2";

const ListStation = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setStationSelected] = useState(null);
  const { token } = useSelector((state) => state);
  const navigate = useNavigate();

  const deleteStation = () => {
    if (selectedStation)
      axios
        .delete(
          import.meta.env.VITE_BACKEND_URL + "stations/" + selectedStation._id,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          getAllStations();
        })
        .catch((error) => {
          console.log(error);
        });
    else deleteStation();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "adresse", headerName: "Adresse", flex: 1 },
    { field: "gouvernorat", headerName: "Gouvernorat", flex: 0.5 },
    {
      field: "gerant",
      flex: 1,
      headerName: "Gerant",
      renderCell: (cell) => {
        return cell.row.gerant.firstname + " " + cell.row.gerant.lastname;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      renderCell: (cell) => {
        return (
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            height={"100%"}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/station/" + cell.row._id);
              }}
            >
              <RemoveRedEyeIcon />
            </Button>

            {cell.row.deleted == false ? (
              <Button
                onClick={async (e) => {
                  e.stopPropagation();
                  await setStationSelected(cell.row);
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteStation();
                    }
                  });
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Restore
              </Button>
            )}
          </Stack>
        );
      },
    },
  ];

  const getAllStations = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "admin/stations", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setStations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllStations();
  }, []);

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div>
      <Paper sx={{ height: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", margin: "25px" }}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            value={"search"}
            onChange={(e) => {}}
            id="input-with-sx"
            label="With sx"
            variant="outlined"
          />
        </Box>
        {/* {selectedUsers.length > 0 && (
          <Button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteMultiple();
                }
              });
            }}
            style={{ margin: "25px" }}
            color="error"
            variant="contained"
          >
            Delete Checked Rows
          </Button>
        )} */}

        {/* {selectedUsers.length > 0 && (
          <Button
            onClick={() => {
              restoreMultiple();
            }}
            color="success"
            variant="contained"
          >
            Restore Checked Rows
          </Button>
        )} */}

        <DataGrid
          onRowSelectionModelChange={(rows) => {
            // setSelectedUsers(rows);
          }}
          rows={stations.map((station) => {
            return { ...station, id: station._id };
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

export default ListStation;
