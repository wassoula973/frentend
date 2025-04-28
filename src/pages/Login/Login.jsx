import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import agilLogo from "../../assets/logo-agil.png";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducer";
import { useNavigate } from "react-router";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm({
    defaultValues: { stayConnected: true },
  });

  const actionLogin = (data) => {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "users/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        dispatch(
          login({
            user: response.data.user,
            token: response.data.token,
            stayConnected: data.stayConnected,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        if (error.status == 404) {
          setError("email", { message: "Email doesn't exist" });
        }
        if (error.status == 405) {
          setError("password", { message: "Password mismatch" });
        }
        if (error.status == 406)
          Swal.fire({
            title: "Your account is deactivated !",
            icon: "error",
            draggable: true,
          });
      });
  };
  return (
    <Stack
      style={{ height: "100vh", width: "100vw" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        style={{
          height: "80vh",
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
        <form onSubmit={handleSubmit(actionLogin)}>
          <Stack spacing={2} mt={"15px"}>
            <Typography>Hello! let's get started</Typography>
            <Typography>Sign in to continue</Typography>
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
                  label="Password"
                  variant="outlined"
                  type="password"
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Button
              type="submit"
              style={{ background: "#fed000" }}
              variant="contained"
            >
              Sign In
            </Button>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Controller
                control={control}
                name="stayConnected"
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        value={value}
                        onChange={onChange}
                      />
                    }
                    label="Stay Connected"
                  />
                )}
              />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Login;
