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
    <Stack
      height={"calc(100vh - 425px)"}
      width={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <div
        style={{
          background: "rgba( 255, 255, 255, 0.58 )",
          boxShadow: "0 8px 32px 0rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 4.5px )",
          "-webkit-backdrop-filter": " blur( 4.5px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
      >
        {interventionInfo ? (
          <Stack
            pl={"25px"}
            p={"50px"}
            spacing={2}
            style={{
              boxShadow:
                "inset 0 -3em 3em #81878187, 13px 9px 20px 1px white, 0.3em 0.3em 1em rgb(200 0 0 / 60%)",
            }}
          >
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
                  <Typography fontWeight={800}>Pending</Typography>

                  <img src={pending} height={"50px"} width={"auto"} />
                </Stack>
              ) : interventionInfo.etat == "done" ? (
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography fontWeight={800}>Done</Typography>
                  <img src={done} height={"50px"} width={"auto"} />
                </Stack>
              ) : interventionInfo.etat == "canceled" ? (
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography fontWeight={800}>Canceled</Typography>
                  <img src={canceled} height={"50px"} width={"auto"} />
                </Stack>
              ) : (
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography fontWeight={800}>Affected</Typography>
                  <img src={affected} height={"50px"} width={"auto"} />
                </Stack>
              )}
            </Stack>
            {interventionInfo.technicien && (
              <Typography>
                Technicien :
                <Typography display={"inline"} fontWeight={800}>
                  {interventionInfo.technicien.firstname +
                    " " +
                    interventionInfo.technicien.lastname}
                </Typography>
              </Typography>
            )}
            <Typography>
              Date :{" "}
              <Typography display={"inline"} fontWeight={800}>
                {dayjs(interventionInfo.date).format("YYYY-MM-DD HH:mm")}
              </Typography>
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
                fontWeight={800}
              >
                {interventionInfo.intensity}
              </Typography>
            </Typography>
            <Typography>
              Category :{" "}
              <Typography display={"inline"} fontWeight={800}>
                {interventionInfo.category}
              </Typography>
            </Typography>
            <Typography>
              Error :{" "}
              <Typography display={"inline"} fontWeight={800}>
                {interventionInfo.error}
              </Typography>
            </Typography>
            <Typography>
              Station :
              <Typography display={"inline"} fontWeight={800}>
                <a href={"/station/" + interventionInfo.station._id}>
                  {interventionInfo.station.adresse +
                    " " +
                    interventionInfo.station.gouvernorat}
                </a>
              </Typography>
            </Typography>
            <Typography>
              Gérant :
              <Typography display={"inline"} fontWeight={800}>
                <a href={"/user/" + interventionInfo.gerant._id}>
                  {interventionInfo.gerant.firstname +
                    " " +
                    interventionInfo.gerant.lastname}
                </a>
              </Typography>
            </Typography>
         
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
    </Stack>
  );
};

export default InterventionInfoAdmin;
