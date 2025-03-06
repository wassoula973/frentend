import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ListRequests = () => {
  const { user, token } = useSelector((state) => state);
  const [interventions, setInterventions] = useState([]);
  const getInterventions = async () => {
    axios
      .get(
        import.meta.env.VITE_BACKEND_URL + "interventions/gerant/" + user._id,
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        setInterventions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getInterventions();
  }, []);
  return (
    <div>
      ListRequests
      {interventions.map((intervention) => {
        return (
          <p>
            {intervention._id} {intervention.etat}
          </p>
        );
      })}
    </div>
  );
};

export default ListRequests;
