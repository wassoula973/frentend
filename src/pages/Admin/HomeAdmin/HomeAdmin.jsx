import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomeAdmin = () => {
  const { token } = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const getAllUsers = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "admin/users", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  };

  const [interventions, setInterventions] = useState([]);
  const getAllInterventions = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "admin/interventions", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => setInterventions(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllUsers();
    getAllInterventions();
  }, []);
  return (
    <Stack
      direction={"row"}
      height={"80vh"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={15}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        style={{
          background: "rgba( 255, 255, 255, 0.58 )",
          boxShadow: "0 8px 32px 0rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 4.5px )",
          "-webkit-backdrop-filter": " blur( 4.5px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
      >
        <Pie
          style={{ maxHeight: 350, maxWidth: "auto" }}
          data={{
            labels: ["Admin", "Assistant", "Gerant", "Technicien", "Deleted"],
            datasets: [
              {
                label: "# of users",
                data: [
                  users.filter((u) => u.role == "admin").length,
                  users.filter((u) => u.role == "assistant").length,
                  users.filter((u) => u.role == "gerant").length,
                  users.filter((u) => u.role == "technicien").length,
                  users.filter((u) => u.deleted).length,
                ],
                backgroundColor: [
                  "rgba(255, 99, 133, 0.75)",
                  "rgba(54, 162, 235, 0.75)",
                  "rgba(255, 206, 86, 0.75)",
                  "rgba(75, 192, 192, 0.75)",
                  "rgba(255, 0, 0, 0.75)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgb(255, 0, 0)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
        <Typography textAlign={"center"}>
          Total number of users : {users.length}
        </Typography>
      </Stack>

      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        style={{
          background: "rgba( 255, 255, 255, 0.58 )",
          boxShadow: "0 8px 32px 0rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 4.5px )",
          "-webkit-backdrop-filter": " blur( 4.5px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
      >
        <Pie
          style={{ maxHeight: 350, maxWidth: "auto" }}
          data={{
            labels: ["Pending", "Done", "Affected", "Canceled", "Deleted"],
            datasets: [
              {
                label: "# of users",
                data: [
                  interventions.filter((i) => i.etat == "pending").length,
                  interventions.filter((i) => i.etat == "done").length,
                  interventions.filter((i) => i.etat == "affected").length,
                  interventions.filter((i) => i.etat == "canceled").length,
                  interventions.filter((i) => i.deleted).length,
                ],
                backgroundColor: [
                  "rgba(85, 0, 255, 0.75)",
                  "rgba(0, 255, 60, 0.75)",
                  "rgba(255, 206, 86, 0.75)",
                  "rgba(75, 192, 192, 0.75)",
                  "rgba(255,0,0, 0.75)",
                ],
                borderColor: [
                  "rgb(85, 0, 255)",
                  "rgb(0, 255, 60)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgb(255, 0, 0)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
        <Typography textAlign={"center"}>
          Total number of interventions : {interventions.length}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default HomeAdmin;
