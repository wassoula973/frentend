import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GroupsIcon from "@mui/icons-material/Groups";
import Swal from "sweetalert2";
const UserInfo = () => {
  const params = useParams();
  const { token } = useSelector((state) => state);
  const [UserInfo, setUserInfo] = useState(null);
  const [gouvernorats, setGouvernorats] = useState();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGouvernorats(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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

  const chageGouvernorats = () => {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "users",
        { id: params.id, gouvernorats },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getUserInfo();
        setOpen(false);
      });
  };

  const getUserInfo = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "admin/user/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setUserInfo(response.data);
        setGouvernorats(response.data.gouvernorats);
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = () => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "users/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        getUserInfo();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      });
  };

  const restoreUser = (id) => {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "admin/user/" + params.id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getUserInfo();
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {UserInfo && (
        <Stack
          height={"calc(100vh - 75px )"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack
            spacing={3}
            style={{
              width: "30%",
              background: "#d1d1d1",
              padding: "25px",
              borderRadius: "25px",
            }}
          >
            {UserInfo.deleted && (
              <Stack direction={"row"} alignItems={"center"} height={"100px"}>
                <DeleteForeverIcon style={{ fontSize: "52px" }} color="error" />
                <Typography style={{ color: "red" }}>
                  This User is deactivated !
                </Typography>
              </Stack>
            )}
            <Typography
              style={{
                marginLeft: "20px",
                marginTop: UserInfo.deleted ? 0 : "50px",
                fontWeight: "bold",
              }}
            >
              <AccountCircleIcon color="primary" /> Nom et Prénom :
              {" " + UserInfo.lastname + " " + UserInfo.firstname}
            </Typography>

            <Typography
              style={{
                marginLeft: "20px",

                fontWeight: "bold",
              }}
            >
              <AlternateEmailIcon color="primary" /> Email : {UserInfo.email}
            </Typography>
            <Typography
              style={{
                marginLeft: "20px",

                fontWeight: "bold",
              }}
            >
              <ContactEmergencyIcon color="primary" /> CIN : {UserInfo.cin}
            </Typography>

            {UserInfo.phone && (
              <Typography
                style={{
                  marginLeft: "20px",

                  fontWeight: "bold",
                }}
              >
                <LocalPhoneIcon color="primary" /> Phone : {UserInfo.phone}
              </Typography>
            )}

            <Typography
              style={{
                marginLeft: "20px",

                fontWeight: "bold",
              }}
            >
              <GroupsIcon color="primary" /> Role :
              <Typography
                style={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  display: "inline",
                }}
              >
                {" " + UserInfo.role}
              </Typography>
            </Typography>

            {UserInfo.role == "assistant" && (
              <Stack pl={"20px"}>
                <Typography
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#d5a68a",
                  }}
                >
                  Liste des gouvernorats :
                </Typography>
                {
                  //pour i de 1 à n faire
                  // for(i=1;i=n;i++)

                  UserInfo.gouvernorats.sort().map((g) => {
                    return <Typography>* {g}</Typography>;
                  })
                }
              </Stack>
            )}

            {UserInfo.role == "gerant" && (
              <Stack>
                {UserInfo.station && (
                  <Stack>
                    <Typography
                      style={{
                        marginLeft: "20px",
                        marginTop: UserInfo.station.deleted ? 0 : "50px",
                        fontWeight: "bold",
                      }}
                    >
                      <LocationOnIcon color="primary" /> L'adresse du Station
                      est : {UserInfo.station.adresse}
                    </Typography>
                    <Typography
                      style={{
                        marginLeft: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      <BusinessIcon color="secondary" /> Gouvernorat :
                      {" " + UserInfo.station.gouvernorat}
                    </Typography>
                  </Stack>
                )}

                {UserInfo.listeQueries && (
                  <>
                    {UserInfo.listeQueries.map((q) => {
                      console.log(q);

                      return (
                        <>
                          <Typography>
                            {dayjs(q.date).format("YYYY - MM -DD HH:mm")}
                          </Typography>
                          <Typography>{q.etat}</Typography>
                        </>
                      );
                    })}
                  </>
                )}
              </Stack>
            )}

            {UserInfo.role == "assistant" && (
              <Button
                variant="outlined"
                style={{ height: "50px", width: "250px", alignSelf: "center" }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Change Gouvernorats
              </Button>
            )}

            {UserInfo.deleted ? (
              <>
                {/* <Button
                  style={{
                    height: "50px",
                    width: "250px",
                    alignSelf: "center",
                  }}
                  color="success"
                  variant="contained"
                  onClick={() => {
                    restoreUser();
                  }}
                >
                  Restore
                </Button> */}
              </>
            ) : (
              <Button
                style={{ height: "50px", width: "250px", alignSelf: "center" }}
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
                      deleteUser();
                    }
                  });
                }}
              >
                Deactivate
              </Button>
            )}
          </Stack>
        </Stack>
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
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={gouvernorats}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
            >
              {list.sort().map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              chageGouvernorats();
            }}
          >
            Confirm
          </Button>
        </Stack>
      </Modal>
    </div>
  );
};

export default UserInfo;
