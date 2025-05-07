import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import agilLogo from "../../assets/logo-agil.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state);
  const { control, handleSubmit, setError } = useForm({
    defaultValues: { role: null },
  });

  const registerAction = (data) => {
    const { firstname, lastname, cin, email, password, role, phone } = data;

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "users",
        {
          firstname,
          lastname,
          cin,
          email,
          password,
          role,
          phone,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The account created successfuly",
          showConfirmButton: false,
        });
        navigate("/users");
      })
      .catch((error) => {
        if (error.response.data.code == 11000) {
          if (error.response.data.keyPattern.email)
            setError("email", { message: "Email already used" });
          else if (error.response.data.keyPattern.cin)
            setError("cin", { message: "CIN already used" });
        }
      });
  };

  return (
    <Stack alignItems={"center"} mb={"100px"}>
      <Stack
        style={{
          width: "30vw",
          background: "#fff",
          borderRadius: "15px",
          padding: "15px",
        }}
      >
        <Stack bgcolor={"#ffd001"} py="15px" borderRadius={"15px"}>
          <img
            src={agilLogo}
            height={"125px"}
            width={"125px"}
            style={{ alignSelf: "center" }}
          />
        </Stack>
        <Typography textAlign={"center"} fontSize={"25px"} fontWeight={900}>
          Add new User
        </Typography>
        <form onSubmit={handleSubmit(registerAction)}>
          <Stack spacing={2} mt={"15px"}>
            <Controller
              control={control}
              name="firstname"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  size="small"
                  required
                  value={value}
                  onChange={onChange}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="lastname"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  size="small"
                  value={value}
                  onChange={onChange}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              rules={{
                maxLength: { value: 8, message: "CIN must be 8 numbers" },
                minLength: { value: 8, message: "CIN must be 8 numbers" },
              }}
              name="cin"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  size="small"
                  value={value}
                  onChange={onChange}
                  id="outlined-basic"
                  type="number"
                  label="CIN"
                  variant="outlined"
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={{
                maxLength: {
                  value: 8,
                  message: "Phone number must be 8 numbers",
                },
                minLength: {
                  value: 8,
                  message: "Phone number must be 8 numbers",
                },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  size="small"
                  value={value}
                  onChange={onChange}
                  id="outlined-basic"
                  type="number"
                  label="Phone Number"
                  variant="outlined"
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  size="small"
                  value={value}
                  onChange={onChange}
                  id="outlined-basic"
                  type="email"
                  label="Email"
                  variant="outlined"
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  size="small"
                  value={value}
                  onChange={onChange}
                  id="outlined-basic"
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                />
              )}
            />

            <Controller
              control={control}
              name="role"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormControl required>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup
                    required
                    onChange={onChange}
                    value={value}
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="technicien"
                      control={<Radio />}
                      label="Technicien"
                    />
                    <FormControlLabel
                      value="gerant"
                      control={<Radio />}
                      label="Gerant"
                    />
                    <FormControlLabel
                      value="assistant"
                      control={<Radio />}
                      label="Assistant"
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            <Button
              type="submit"
              style={{ background: "#fed000" }}
              variant="contained"
            >
              Register
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
