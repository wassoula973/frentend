import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportIcon from "@mui/icons-material/Report";
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const StationInfoAdmin = () => {
  const params = useParams();
  const [stationInfo, setStationInfo] = useState(null);
  const { token } = useSelector((state) => state);
  const [gerants, setGerants] = useState([]);
  const [gerant, setGerant] = useState([]);
  const [selectedStation, setStationSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGerant(value);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "etat",
      headerName: "State",
      flex: 1,
      renderCell: (cell) => {
        return (
          <Stack justifyContent={"center"} height={"100%"}>
            {cell.row.etat == "bien" ? (
              <CheckCircleIcon color="success" />
            ) : (
              <ReportIcon color="warning" />
            )}
          </Stack>
        );
      },
    },
  ];

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

  const editGerant = () => {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "stations/" + params.id,
        { gerant },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        setOpen(false);

        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInfo = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "stations/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setStationInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
    getGerants();
  }, []);

  const deleteStation = () => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "stations/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restoreStation = () => {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "admin/station/" + params.id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div>
      {stationInfo ? (
        <Stack spacing={2}>
          <div
            style={{
              background: "rgba( 255, 255, 255, 0.58 )",
              boxShadow: "0 8px 32px 0rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 4.5px )",
              "-webkit-backdrop-filter": " blur( 4.5px )",
              borderRadius: "10px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              padding: "15px",
            }}
          >
            {stationInfo.deleted && (
              <Stack direction={"row"} alignItems={"center"} height={"100px"}>
                <DeleteForeverIcon style={{ fontSize: "52px" }} color="error" />
                <Typography style={{ color: "red" }}>
                  This Station is deleted !
                </Typography>
              </Stack>
            )}
            <Typography
              style={{
                marginLeft: "20px",
                marginTop: stationInfo.deleted ? 0 : "50px",
                fontWeight: "bold",
              }}
            >
              <LocationOnIcon color="primary" /> L'adresse du Station est :
              {stationInfo.adresse}
            </Typography>
            <Typography
              style={{
                marginLeft: "20px",
                fontWeight: "bold",
              }}
            >
              <BusinessIcon color="secondary" /> Gouvernorat :
              {stationInfo.gouvernorat}
            </Typography>
            {stationInfo.gerant && (
              <>
                {" "}
                <Typography
                  color="blue"
                  style={{
                    marginLeft: "20px",
                    fontWeight: "bold",
                  }}
                >
                  first Name : {stationInfo.gerant.firstname}
                </Typography>
                <Typography
                  color="purple"
                  style={{ marginLeft: "20px", fontWeight: "bold" }}
                >
                  Last Name : {stationInfo.gerant.lastname}
                </Typography>
                <Typography style={{ fontWeight: "bold", marginLeft: "20px" }}>
                  <BadgeIcon color="success" />
                  CIN : {stationInfo.gerant.cin}
                </Typography>
                <Typography
                  style={{
                    marginLeft: "20px",
                    fontWeight: "bold",
                    color: "#fffc81",
                  }}
                >
                  <EmailIcon color="error" /> Email :{stationInfo.gerant.email}
                </Typography>
              </>
            )}
            {stationInfo.deleted == false ? (
              <Stack direction={"row"} spacing={2} mt={"8px"}>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setGerant(
                      stationInfo.gerant ? stationInfo.gerant._id : null
                    );
                  }}
                  color="warning"
                  variant="contained"
                >
                  Edit Gerant
                </Button>
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
                        deleteStation();
                      }
                    });
                  }}
                >
                  Delete
                </Button>
              </Stack>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  restoreStation();
                }}
              >
                Restore
              </Button>
            )}
          </div>
          <Typography textAlign={"center"} fontSize={"20px"} fontWeight={900}>
            List of Materials
          </Typography>
          <Paper
            sx={{ height: "auto", width: "100%", background: "#ffffff94" }}
          >
            <DataGrid
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              sx={{ border: 0, height: "auto" }}
              columns={columns}
              rows={stationInfo.listmateriel}
            />
          </Paper>
        </Stack>
      ) : (
        <p>Loading ...</p>
      )}

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
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Gerant</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={gerant}
              onChange={handleChange}
              input={<OutlinedInput label="List Gerants" />}
            >
              {gerants.map((g) => {
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
    </div>
  );
};

export default StationInfoAdmin;
