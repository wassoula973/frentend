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
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/reducer";

const StationInfo = () => {
  const columns = [{ field: "id" }, { field: "type" }];
  const paginationModel = { page: 0, pageSize: 5 };
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);

  const dispatch = useDispatch();

  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setType(value);
  };

  const addMaterial = () => {
    const a = [...user.station.listmateriel];

    a[a.length] = { type, id: uid(), etat: "good" };

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "stations/" + user.station._id,
        {
          listmateriel: a,
          gerant: user._id,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        console.log(response.data);

        dispatch(
          login({
            user: response.data.user,
            token: response.data.token,
            stayConnected: true,
          })
        );
        setType(null);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { user, token } = useSelector((state) => state);
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Typography>My Station's Info</Typography>
      <Stack>
        <Stack>
          <Typography textAlign={"center"}>ID : {user.station._id}</Typography>
          <Typography textAlign={"center"}>
            Adresse : {user.station.adresse} - {user.station.gouvernorat}
          </Typography>
        </Stack>
        <Button
          style={{ width: "150px" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Material
        </Button>
        <DataGrid
          rows={user.station.listmateriel}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0, width: "100vw " }}
        />
      </Stack>

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
            <InputLabel id="demo-multiple-name-label">Material</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={type}
              onChange={handleChange}
              input={<OutlinedInput label="List Gerants" />}
            >
              <MenuItem value={"diesel"}>Diesel Pump</MenuItem>
              <MenuItem value={"tpe"}>TPE Machine</MenuItem>
              <MenuItem value={"pc"}>Desktop</MenuItem>
              <MenuItem value={"air"}>Air Compressor</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              addMaterial();
            }}
          >
            Save
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default StationInfo;
