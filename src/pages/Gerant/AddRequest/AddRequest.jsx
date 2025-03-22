import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import agilLogo from "../../../assets/logo-agil.png";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddRequest = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm();
  const [image, setImage] = useState(null);
  const { user, token } = useSelector((state) => state);

  const addRequestAction = (data) => {
    const formdata = new FormData(); // ki tabda bch tab3eth request feha fichier
    formdata.append("gerant", user._id);
    formdata.append("station", user.station._id);
    formdata.append("error", data.error);
    formdata.append("category", data.category);

    formdata.append("intensity", data.intensity);
    formdata.append("image", image);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "interventions", formdata, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your request has been saved ! Your Ticket ID is : " +
            response.data._id,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack
      style={{
        background: "#eceff4",
        minHeight: "100%",
        width: "100vw",
        position: "fixed",
      }}
      alignItems={"center"}
    >
      <Stack bgcolor={"#ffd001"} py="15px" borderRadius={"15px"} width={"30vw"}>
        <img
          src={agilLogo}
          height={"125px"}
          width={"125px"}
          style={{ alignSelf: "center" }}
        />
      </Stack>
      {user.station ? (
        <form onSubmit={handleSubmit(addRequestAction)}>
          <Stack spacing={2} mt={"15px"} width={"30vw"}>
            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Age"
                    onChange={onChange}
                  >
                    <MenuItem value={"dga"}>D G A</MenuItem>
                    <MenuItem value={"comptabilité"}>Compta</MenuItem>
                    <MenuItem value={"commerciale gaz"}>Gaz</MenuItem>
                    <MenuItem value={"exploitation"}>Exploitation</MenuItem>
                    <MenuItem value={"financiere"}>Financiere</MenuItem>
                    <MenuItem value={"maitenance"}>Maitenance</MenuItem>
                    <MenuItem value={"marketing"}>Marketing</MenuItem>
                    <MenuItem value={"securite"}>Securite</MenuItem>
                    <MenuItem value={"commerciale des reseaux"}>
                      Reseau
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="intensity"
              render={({ field: { value, onChange } }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Intensity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Age"
                    onChange={onChange}
                  >
                    <MenuItem value={"danger"}>Danger</MenuItem>
                    <MenuItem value={"warning"}>Warning</MenuItem>
                    <MenuItem value={"normal"}>Normal</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="error"
              render={({ field: { value, onChange } }) => (
                <TextField
                  required
                  label="Type the Error"
                  value={value}
                  onChange={onChange}
                  multiline
                />
              )}
            />

            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </Button>

            <Button type="submit">Send</Button>
          </Stack>
        </form>
      ) : (
        "You must be assigned to a Station"
      )}
    </Stack>
  );
};

export default AddRequest;
