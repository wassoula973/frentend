import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const ListRequests = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [techniciens, setTechniciens] = useState([]);
  const [intensity, setIntensity] = useState(null);
  const [category, setCategory] = useState(null);
  const [inputTechnicien, setInputTechnicien] = useState(null);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [search, setSearch] = useState("");
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
        getInterventions();
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

  const editIntervention = () => {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL +
          "interventions/" +
          selectedIntervention._id,
        {
          etat: inputTechnicien ? "affected" : selectedIntervention.etat,
          technicien: inputTechnicien ? inputTechnicien._id : undefined,
          category,
          intensity,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        setCategory(null);
        setOpen(false);
        getInterventions();
        getTechniciens();
      });
  };

  const deleteIntervention = (id) => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "interventions/" + id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        getInterventions();
        getTechniciens();
      });
  };

  const cancelIntervention = (id) => {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "interventions/" + id,
        {
          etat: "canceled",
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getInterventions();
      });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, sortable: false },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (cell) => {
        return <>{dayjs(cell.row.date).format("YYYY-MM-DD HH:mm")}</>;
      },
    },
    {
      field: "etat",
      headerName: "State",
      flex: 0.3,
      renderCell: (cell) => {
        return (
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            height={"100%"}
          >
            <Typography
              className={cell.row.etat}
              style={{ textTransform: "capitalize" }}
            >
              {cell.row.etat}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "intensity",
      headerName: "Intensity",
      flex: 0.3,
      renderCell: (cell) => {
        return (
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            height={"100%"}
          >
            <Typography
              className={cell.row.intensity}
              style={{ textTransform: "capitalize" }}
            >
              {cell.row.intensity}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (cell) => {
        return (
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            height={"100%"}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/intervention/" + cell.row._id);
              }}
            >
              Show more
            </Button>
            {user.role == "assistant" &&
            cell.row.etat !== "done" &&
            cell.row.etat !== "canceled" ? (
              <>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                    setSelectedIntervention(cell.row);

                    setIntensity(cell.row.intensity);
                    setCategory(cell.row.category);
                    setInputTechnicien(cell.row.technicien);
                  }}
                  color="warning"
                  variant="contained"
                >
                  Edit
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "error",
                      showCancelButton: true,
                      confirmButtonColor: "red",
                      confirmButtonText: "Yes, delete it!",
                      cancelButtonText: "No, cancel!",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteIntervention(cell.row._id);
                      } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                      ) {
                        Swal.fire({
                          title: "Cancelled",
                          text: "Your imaginary file is safe :)",
                          icon: "error",
                        });
                      }
                    });
                  }}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </>
            ) : user.role == "gerant" &&
              cell.row.etat !== "done" &&
              cell.row.etat !== "canceled" &&
              cell.row.deleted == false ? (
              <Button
                color="error"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  cancelIntervention(cell.row._id);
                }}
              >
                Canceled
              </Button>
            ) : (
              user.role == "technicien" && <Button>Change State</Button>
            )}
          </Stack>
        );
      },
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };

  const [interventions, setInterventions] = useState([]);
  const getInterventions = () => {
    if (user.role == "gerant") {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL + "interventions/gerant/" + user._id,
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((response) => {
          setInterventions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (user.role == "assistant") {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            "interventions/assistant/" +
            user._id,
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((response) => {
          setInterventions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getTechniciens = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "users/role/technicien", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setTechniciens(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInterventions();
    getTechniciens();
  }, []);
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

        <DataGrid
          getCellClassName={(cell) =>
            `${
              cell.field != "actions" && cell.row.deleted ? "row_deleted" : ""
            }`
          }
          onRowSelectionModelChange={(rows) => {
            setSelectedInterventions(rows);
          }}
          rows={interventions
            .filter(
              (i) =>
                i.date.toLowerCase().includes(search.toLowerCase()) ||
                (i.category &&
                  i.category.toLowerCase().includes(search.toLowerCase())) ||
                i.etat.toLowerCase().includes(search.toLowerCase()) ||
                i._id.toLowerCase().includes(search.toLowerCase()) ||
                i.intensity.toLowerCase().includes(search.toLowerCase())
            )
            .map((inter) => {
              return { ...inter, id: inter._id };
            })}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          sx={{ border: 0, height: "auto" }}
        />
      </Paper>

      <Modal
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">Intensity</InputLabel>
            <Select
              defaultValue={"danger"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={intensity}
              label="Age"
              onChange={(e) => {
                setIntensity(e.target.value);
              }}
            >
              <MenuItem value={"danger"}>Danger</MenuItem>
              <MenuItem value={"warning"}>Warning</MenuItem>
              <MenuItem value={"normal"}>Normal</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              defaultValue={category}
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value={"dga"}>D G A</MenuItem>
              <MenuItem value={"comptabilité"}>Compta</MenuItem>
              <MenuItem value={"commerciale gaz"}>Gaz</MenuItem>
              <MenuItem value={"exploitation"}>Exploitation</MenuItem>
              <MenuItem value={"financiere"}>Financiere</MenuItem>
              <MenuItem value={"maitenance"}>Maitenance</MenuItem>
              <MenuItem value={"marketing"}>Marketing</MenuItem>
              <MenuItem value={"securite"}>Securite</MenuItem>
              <MenuItem value={"commerciale des reseaux"}>Reseau</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            defaultValue={inputTechnicien}
            options={techniciens}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              setInputTechnicien(newValue);
            }}
            autoHighlight
            getOptionLabel={(option) => option.firstname}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return <Box {...optionProps}>{option.firstname}</Box>;
            }}
            renderInput={(params) => (
              <TextField {...params} label="Techniciens" />
            )}
          />
          <Button
            onClick={() => {
              editIntervention();
            }}
          >
            Save
          </Button>
        </Stack>
      </Modal>
    </div>
  );
};

export default ListRequests;
