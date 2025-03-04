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
  const { control, handleSubmit, setError } = useForm();
  const [image, setImage] = useState(null);

  const addRequestAction = (data) => {
    console.log(data);
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
      <form onSubmit={handleSubmit(addRequestAction)}>
        <Stack spacing={2} mt={"15px"} width={"30vw"}>
          <Controller
            control={control}
            name="intensity"
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Intensity</InputLabel>
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
    </Stack>
  );
};

export default AddRequest;
