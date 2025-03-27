import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import pending from "../../../assets/pending.webp";
import done from "../../../assets/done.gif";
import affected from "../../../assets/affected.gif";
import canceled from "../../../assets/canceled.gif";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const InterventionInfoAdmin = () => {
  const params = useParams();
  const { token } = useSelector((state) => state);
  const [interventionInfo, setInterventionInfo] = useState(null);
  const getInfo = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "interventions/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setInterventionInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const deleteIntervention = () => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "interventions/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restore = () => {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "admin/intervention/" + params.id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {interventionInfo ? (
        <Stack>
          {interventionInfo.deleted && (
            <Stack direction={"row"} alignItems={"center"} height={"100px"}>
              <DeleteForeverIcon style={{ fontSize: "52px" }} color="error" />
              <Typography style={{ color: "red" }}>
                This intervention is deleted !
              </Typography>
            </Stack>
          )}
          <Stack direction={"row"} alignItems={"center"}>
            <Typography>State :</Typography>
            {interventionInfo.etat == "pending" ? (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Pending</Typography>

                <img src={pending} height={"50px"} width={"auto"} />
              </Stack>
            ) : interventionInfo.etat == "done" ? (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Done</Typography>
                <img src={done} height={"50px"} width={"auto"} />
              </Stack>
            ) : interventionInfo.etat == "canceled" ? (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Canceled</Typography>
                <img src={canceled} height={"50px"} width={"auto"} />
              </Stack>
            ) : (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Affected</Typography>
                <img src={affected} height={"50px"} width={"auto"} />
              </Stack>
            )}
          </Stack>
          <Typography>
            Date : {dayjs(interventionInfo.date).format("YYYY-MM-DD HH:mm")}
          </Typography>
          <Typography>
            Intensity :{" "}
            <Typography
              display={"inline"}
              style={{
                color:
                  interventionInfo.intensity == "warning"
                    ? "orange"
                    : interventionInfo.intensity == "danger"
                    ? "red"
                    : "#000",
              }}
            >
              {interventionInfo.intensity}
            </Typography>
          </Typography>
          <Typography>Error : {interventionInfo.error}</Typography>
          <Typography>
            Station :
            <a href={"/station/" + interventionInfo.station._id}>
              {interventionInfo.station.adresse +
                interventionInfo.station.gouvernorat}
            </a>
          </Typography>
          <Typography>
            Station :
            <a href={"/user/" + interventionInfo.gerant._id}>
              {interventionInfo.gerant.firstname +
                interventionInfo.gerant.lastname}
            </a>
          </Typography>
          {interventionInfo.deleted == false ? (
            <Button
              style={{ width: "150px" }}
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
                    deleteIntervention();
                  }
                });
              }}
            >
              Delete
            </Button>
          ) : (
            <Button
              style={{ width: "150px" }}
              color="success"
              variant="contained"
              onClick={() => {
                restore();
              }}
            >
              Restore
            </Button>
          )}
        </Stack>
      ) : (
        "Loading ..."
      )}
    </div>
  );
};

export default InterventionInfoAdmin;
