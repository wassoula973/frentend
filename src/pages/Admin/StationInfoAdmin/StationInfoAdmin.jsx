import { Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const StationInfoAdmin = () => {
  const params = useParams();
  const [stationInfo, setStationInfo] = useState(null);
  const { token } = useSelector((state) => state);

  const getInfo = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "stations/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setStationInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      {stationInfo ? (
        <Stack>
          <Typography>{stationInfo.adresse}</Typography>
        </Stack>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default StationInfoAdmin;
