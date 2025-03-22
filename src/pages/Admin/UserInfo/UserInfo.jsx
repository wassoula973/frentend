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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {UserInfo && (
        <Stack direction={"row"} spacing={3}>
          <p>first Name : {UserInfo.firstname}</p>
          <Typography color="red">Cin : {UserInfo.cin}</Typography>
          <Stack>
            {UserInfo.gouvernorats.sort().map((g) => {
              return <Typography>{g}</Typography>;
            })}
          </Stack>

          {UserInfo.role == "gerant" && (
            <Stack>
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
              style={{ height: "50px" }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Change Gouvernorats
            </Button>
          )}

          <Button style={{ height: "50px" }} color="error" variant="contained">
            Delete
          </Button>
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
