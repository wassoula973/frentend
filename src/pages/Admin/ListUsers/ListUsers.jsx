import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";

const ListUsers = () => {
  const { token, user } = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [role, setRole] = useState("");

  const [open, setOpen] = useState(false);
  // Gestion du changement de rôle dans le select
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRole(value);
  };

  const columns = [
    { field: "id", headerName: "ID", sortable: false },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      rendenCell: (cell) => {
        return <p style={{ fontSize: "36px" }}>{cell.row.firstane}</p>;
      },
    },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
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
            {/* Bouton pour voir les détails de l'utilisateur */}
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/user/" + cell.row._id);
              }}
            >
              <RemoveRedEyeIcon />
            </Button>
            {/* Bouton Restore ou boutons d'action selon si l'utilisateur est supprimé */}
            {cell.row.deleted ? (
              <Button
                className="btn-not-dashed"
                color="success"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  restoreUser(cell.row._id);
                }}
              >
                Restore
              </Button>
            ) : (
              <>
                <Button
                  color="error"
                  variant="contained"
                  onClick={async (e) => {
                    e.stopPropagation();

                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, deactivate it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteUser(cell.row._id);
                      }
                    });
                  }}
                >
                  Deactivate
                </Button>
              </>
            )}
          </Stack>
        );
      },
    },
  ];

  const getAllUsers = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "admin/users", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(
        import.meta.env.VITE_BACKEND_URL + "users/" + id,

        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAllUsers();
        Swal.fire({
          title: "Deactivated!",
          text: "The user has been deactivated.",
          icon: "success",
        });
      });
  };

  const restoreUser = (id) => {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "admin/user/" + id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAllUsers();
      });
  };

  const changeRole = () => {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "users",
        { id: selectedUser._id, role },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAllUsers();
        setOpen(false);
        setRole("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMultiple = () => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "admin/users/multiple", {
        headers: { Authorization: "Bearer " + token },
        data: { listId: selectedUsers },
      })
      .then((response) => {
        console.log(response.data);
        getAllUsers();
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
        import.meta.env.VITE_BACKEND_URL + "admin/users/multiple",
        { listId: selectedUsers },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getAllUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div>
      <Paper sx={{ height: "auto", width: "100%", background: "#ffffff94" }}>
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
        {user.role == "admin" && (
          <Button
            onClick={() => {
              navigate("/add_user");
            }}
            color="success"
            variant="contained"
          >
            Add User
          </Button>
        )}
        {selectedUsers.length > 0 && (
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
            Deactivate Checked Rows
          </Button>
        )}

        <DataGrid
          onRowSelectionModelChange={(rows) => {
            setSelectedUsers(rows);
          }}
          rows={users
            .filter((u) => {
              // Filtrage des utilisateurs selon la recherche
              return (
                u.firstname.toLowerCase().includes(search.toLowerCase()) ||
                u.lastname.toLowerCase().includes(search.toLowerCase()) ||
                u._id.toLowerCase().includes(search.toLowerCase()) ||
                u.role.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((user) => {
              return { ...user, id: user._id };
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

export default ListUsers;
