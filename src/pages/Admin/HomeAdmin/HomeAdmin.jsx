import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <p style={{ height: "100px", width: "auto" }}>
        <Pie
          height={"100px"}
          width={"auto"}
          data={{
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                  "rgb(0, 0, 0)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          style={{ height: "100px", width: "auto" }}
        />
      </p>
      <p>Graphique Station</p>
      <p>Graphique Intervention</p>
    </div>
  );
};

export default HomeAdmin;
