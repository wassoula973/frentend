import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const RequestInfo = () => {
  const params = useParams();
  const [info, setInfo] = useState(null);
  const { token } = useSelector((state) => state);

  const getInfo = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "interventions/" + params.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setInfo(response.data);
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
      RequestInfo
      <p>{info ? info.gerant.firstname : ""}</p>
      <p> {info ? info.gerant.lastname : ""}</p>
      <p> {info ? info.gerant.cin : ""}</p>
      <p> {info ? info.gerant.email : ""}</p>
      <p> {info ? info.gerant.phone : ""}</p>
    </div>
  );
};

export default RequestInfo;
