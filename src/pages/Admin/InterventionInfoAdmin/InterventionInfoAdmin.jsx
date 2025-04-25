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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import pending from "../../../assets/pending.webp";
import done from "../../../assets/done.gif";
import affected from "../../../assets/affected.gif";
import canceled from "../../../assets/canceled.gif";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const InterventionInfoAdmin = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [techniciens, setTechniciens] = useState([]);
  const [category, setCategory] = useState(null);
  const [inputTechnicien, setInputTechnicien] = useState(null);
  const { token, user } = useSelector((state) => state);
  const [interventionInfo, setInterventionInfo] = useState(null);
  const getInfo = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "interventions/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setInterventionInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    getInfo();
    getTechniciens();
  }, []);

  const deleteIntervention = () => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "interventions/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restore = () => {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "admin/intervention/" + params.id,
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

  const editIntervention = () => {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "interventions/" + params.id,
        {
          etat: inputTechnicien ? "affected" : interventionInfo.etat,
          technicien: inputTechnicien ? inputTechnicien._id : undefined,
          category,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        setCategory(null);
        setOpen(false);
        getInfo();
        getTechniciens();
      });
  };

  return (
    <div>
      {interventionInfo ? (
        <Stack pl={"25px"} pt={"25px"} spacing={2}>
          {interventionInfo.deleted && (
            <Stack direction={"row"} alignItems={"center"} height={"100px"}>
              <DeleteForeverIcon style={{ fontSize: "52px" }} color="error" />
              <Typography style={{ color: "red" }}>
                This intervention is deleted !
              </Typography>
            </Stack>
          )}
          <Stack direction={"row"} alignItems={"center"}>
            <Typography>State :</Typography>
            {interventionInfo.etat == "pending" ? (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Pending</Typography>

                <img src={pending} height={"50px"} width={"auto"} />
              </Stack>
            ) : interventionInfo.etat == "done" ? (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Done</Typography>
                <img src={done} height={"50px"} width={"auto"} />
              </Stack>
            ) : interventionInfo.etat == "canceled" ? (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Canceled</Typography>
                <img src={canceled} height={"50px"} width={"auto"} />
              </Stack>
            ) : (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Affected</Typography>
                <img src={affected} height={"50px"} width={"auto"} />
              </Stack>
            )}
          </Stack>
          {interventionInfo.technicien && (
            <Typography>
              Technicien :
              {interventionInfo.technicien.firstname +
                " " +
                interventionInfo.technicien.lastname}
            </Typography>
          )}
          <Typography>
            Date : {dayjs(interventionInfo.date).format("YYYY-MM-DD HH:mm")}
          </Typography>
          <Typography>
            Intensity :{" "}
            <Typography
              display={"inline"}
              style={{
                color:
                  interventionInfo.intensity == "warning"
                    ? "orange"
                    : interventionInfo.intensity == "danger"
                    ? "red"
                    : "#000",
              }}
            >
              {interventionInfo.intensity}
            </Typography>
          </Typography>
          <Typography>Category : {interventionInfo.category}</Typography>
          <Typography>Error : {interventionInfo.error}</Typography>
          <Typography>
            Station :
            <a href={"/station/" + interventionInfo.station._id}>
              {interventionInfo.station.adresse +
                " " +
                interventionInfo.station.gouvernorat}
            </a>
          </Typography>
          <Typography>
            Gérant :
            <a href={"/user/" + interventionInfo.gerant._id}>
              {interventionInfo.gerant.firstname +
                " " +
                interventionInfo.gerant.lastname}
            </a>
          </Typography>
          {user.role == "admin" &&
            (interventionInfo.deleted == false ? (
              <Button
                style={{ width: "150px" }}
                color="error"
                variant="contained"
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
                      deleteIntervention();
                    }
                  });
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                style={{ width: "150px" }}
                color="success"
                variant="contained"
                onClick={() => {
                  restore();
                }}
              >
                Restore
              </Button>
            ))}
          {user.role == "assistant" &&
            interventionInfo.deleted == false &&
            interventionInfo.etat != "done" && (
              <Stack direction={"row"} spacing={2}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  style={{ width: "150px" }}
                  color="error"
                  variant="contained"
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
                        deleteIntervention();
                      }
                    });
                  }}
                >
                  Delete
                </Button>
              </Stack>
            )}
        </Stack>
      ) : (
        "Loading ..."
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
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              {/* <MenuItem value={"dga"}>D G A</MenuItem>
              <MenuItem value={"comptabilité"}>Compta</MenuItem>
              <MenuItem value={"commerciale gaz"}>Gaz</MenuItem>
              <MenuItem value={"exploitation"}>Exploitation</MenuItem>
              <MenuItem value={"financiere"}>Financiere</MenuItem>
              <MenuItem value={"maitenance"}>Maitenance</MenuItem>
              <MenuItem value={"marketing"}>Marketing</MenuItem>
              <MenuItem value={"securite"}>Securite</MenuItem>
              <MenuItem value={"commerciale des reseaux"}>Reseau</MenuItem> */}
              <MenuItem value={"fuite_citerne"}>
                fuite au niveau de citerne
              </MenuItem>
              <MenuItem value={"piste"}>Problème de piste</MenuItem>
              <MenuItem value={"extincteur"}>Extinteur</MenuItem>
              <MenuItem value={"lavage"}>Sale de lavage</MenuItem>
              <MenuItem value={"retard"}>Retard de livraison</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
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

export default InterventionInfoAdmin;
