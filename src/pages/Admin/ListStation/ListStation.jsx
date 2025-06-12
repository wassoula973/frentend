import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
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
  const [gerants, setGerants] = useState([]);
  const [gerant, setGerant] = useState(null);
  const [selectedStation, setStationSelected] = useState(null);
  const [adresse, setAdresse] = useState("");
  const [gouvernorat, setGouvernorat] = useState(null);
  const { token } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedStations, setSelectedStations] = useState([]);

  const list = [
    "Bizerte",
    "Tunis",
    "Bèja",
    "Mannouba",
    "Ben Arous",
    "Ariana",
    "Nabeul",
    "Sousse",
    "Zaghouan",
    "Kairouan",
    "Siliana",
    "Jandouba",
    "Kef",
    "Sidi Bouzid",
    "Gasserin",
    "Monastir",
    "Mahdia",
    "Sfax",
    "Gabes",
    "Mednin",
    "Tataouin",
    "Tozeur",
    "Gafsa",
    "Gbelli",
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGerant(value);
  };

  const handleChangeGouvernorat = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    setGouvernorat(
      // On autofill we get a stringified value.
      value
    );
  };

  const deleteMultiple = () => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "admin/stations/multiple", {
        headers: { Authorization: "Bearer " + token },
        data: { listId: selectedStations },
      })
      .then((response) => {
        console.log(response.data);
        getAllStations();
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
        import.meta.env.VITE_BACKEND_URL + "admin/stations/multiple",
        { listId: selectedStations },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAllStations();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStation = (id) => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "stations/" + id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        getAllStations();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restoreStation = (id) => {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "admin/station/" + id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAllStations();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editGerant = () => {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "stations/" + selectedStation._id,
        { gerant },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        setOpen(false);
        setStationSelected(null);
        getAllStations();
      })
      .catch((error) => {
        console.log(error);
      });
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
        return cell.row.gerant
          ? cell.row.gerant.firstname + " " + cell.row.gerant.lastname
          : "";
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
              {/* Bouton d'édition si la station n'est pas supprimée */}
            </Button>

            {cell.row.deleted == false && (
              <Button
                color="warning"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                  setStationSelected(cell.row);
                  setGerant(cell.row.gerant ? cell.row.gerant._id : null);
                }}
              >
                Edit Gerant
              </Button>
            )}
            {/* Bouton de suppression/restauration */}
            {cell.row.deleted == false ? (
              <Button
                variant="contained"
                color="error"
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
                      deleteStation(cell.row._id);
                    }
                  });
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  restoreStation(cell.row._id);
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

  const getGerants = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "admin/users/gerants", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setGerants(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Ajout d'une nouvelle station
  const addStation = () => {
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "stations",
        {
          gerant: gerant ? gerant : undefined,
          adresse,
          gouvernorat,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAllStations();
        setGerant(null);
        setGouvernorat(null);
        setOpenAdd(false);
        setAdresse("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllStations();
    getGerants();
  }, []);

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div>
      <Paper sx={{ height: "auto", width: "100%", background: "#ffffff94" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", margin: "25px" }}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            id="input-with-sx"
            label="Search ..."
            variant="outlined"
          />
        </Box>

        <Button
          onClick={() => {
            setOpenAdd(true);
          }}
          color="success"
          variant="contained"
        >
          Add station
        </Button>
        {selectedStations.length > 0 && (
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

        {selectedStations.length > 0 && (
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
        {/* Tableau des stations */}
        <DataGrid
          onRowSelectionModelChange={(rows) => {
            setSelectedStations(rows);
          }}
          rows={stations
            .filter((s) => {
              return (
                s.adresse.toLowerCase().includes(search.toLowerCase()) ||
                s._id.toLowerCase().includes(search.toLowerCase()) ||
                s.gouvernorat.toLowerCase().includes(search.toLowerCase()) ||
                s.gerant.firstname
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                s.gerant.lastname.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((station) => {
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
      {/* Modal d'édition de gérant */}
      <Modal
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          style={{
            height: "300px",
            width: "350px",
            background: "white",
            position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%,-50%)",
          }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Gerant</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={gerant}
              onChange={handleChange}
              input={<OutlinedInput label="List Gerants" />}
            >
              {gerants
                .filter((g) => g.station == null)
                .map((g) => {
                  return (
                    <MenuItem value={g._id}>
                      {g.firstname + " " + g.lastname}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              editGerant();
            }}
          >
            Confirm
          </Button>
        </Stack>
      </Modal>
      {/* Modal d'ajout de station */}
      <Modal
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          style={{
            height: "300px",
            width: "350px",
            background: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <TextField
            required
            sx={{ m: 1, width: 300 }}
            label="Adresse"
            name="adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
          <Autocomplete
            options={list.sort()}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              setGouvernorat(newValue);
            }}
            autoHighlight
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return <Box {...optionProps}>{option}</Box>;
            }}
            renderInput={(params) => (
              <TextField {...params} label="Gouvernorat" />
            )}
          />

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Gerant</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={gerant}
              onChange={handleChange}
              input={<OutlinedInput label="List Gerants" />}
            >
              {gerants
                .filter((g) => g.station == null)
                .map((g) => {
                  return (
                    <MenuItem value={g._id}>
                      {g.firstname + " " + g.lastname}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              addStation();
            }}
          >
            Save
          </Button>
        </Stack>
      </Modal>
    </div>
  );
};

export default ListStation;
