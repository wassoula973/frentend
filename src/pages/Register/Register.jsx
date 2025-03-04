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
import { login } from "../../redux/reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm({
    defaultValues: { role: null },
  });

  const registerAction = (data) => {
    const {
      firstname,
      lastname,
      cin,
      email,
      password: hash,
      role,
      phone,
    } = data;

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "users", {
        firstname,
        lastname,
        cin,
        email,
        password: hash,
        role,
        phone,
      })
      .then((response) => {
        dispatch(
          login({
            user: response.data.user,
            token: response.data.token,
            stayConnected: true,
          })
        );
        navigate("/");
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
    <Stack
      style={{ background: "#eceff4", height: "100vh", width: "100vw" }}
      alignItems={"center"}
    >
      <Stack
        style={{
          height: "100vh",
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
