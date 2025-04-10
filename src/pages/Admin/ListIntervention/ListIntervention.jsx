import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ListIntervention = () => {
  const [search, setSearch] = useState("");

  const [interventions, setInterventions] = useState([]);
  const { token } = useSelector((state) => state);
  const navigate = useNavigate();
  const [selectedInterventions, setSelectedInterventions] = useState([]);
  const deleteMultiple = () => {
    axios
      .delete(
        import.meta.env.VITE_BACKEND_URL + "admin/interventions/multiple",
        {
          headers: { Authorization: "Bearer " + token },
          data: { listId: selectedInterventions },
        }
      )
      .then((response) => {
        console.log(response.data);
        getAll();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restoreMultiple = () => {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "admin/interventions/multiple",
        { listId: selectedInterventions },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAll();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteIntervention = (id) => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "interventions/" + id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        getAll();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restore = (id) => {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "admin/intervention/" + id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAll();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    { field: "etat", headerName: "State", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
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
            {cell.row.deleted ? (
              <Button
                color="success"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  restore(cell.row._id);
                }}
              >
                Restore
              </Button>
            ) : (
              <Button
                color="error"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
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
                      deleteIntervention(cell.row._id);
                    }
                  });
                }}
              >
                Delete
              </Button>
            )}
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
        {selectedInterventions.length > 0 && (
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
        )}
        {selectedInterventions.length > 0 && (
          <Button
            onClick={() => {
              restoreMultiple();
            }}
            color="success"
            variant="contained"
          >
            Restore Checked Rows
          </Button>
        )}

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
                i.date.toLowerCase().includes(search.toLowerCase()) ||
                i.etat.toLowerCase().includes(search.toLowerCase()) ||
                i.intensity.toLowerCase().includes(search.toLowerCase())
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
