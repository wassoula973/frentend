import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const ListRequests = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state);
  const columns = [
    { field: "id", headerName: "ID", flex: 1, sortable: false },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "etat", headerName: "State", flex: 1 },
    { field: "intensity", headerName: "Intensity", flex: 0.5 },
    {
      field: "action",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (cell) => {
        return (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/request/" + cell.row._id);
              }}
            >
              Show more
            </Button>
            {user.role == "assistant" ? (
              <>
                <Button color="success">Assign Technicien</Button>
                <Button color="danger">Delete</Button>
              </>
            ) : (
              user.role == "technicien" && <Button>Change State</Button>
            )}
          </>
        );
      },
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  const [interventions, setInterventions] = useState([]);
  const getInterventions = async () => {
    if (user.role == "gerant") {
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
    } else if (user.role == "assistant") {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            "interventions/assistant/" +
            user._id,
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((response) => {
          setInterventions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getInterventions();
  }, []);
  return (
    <div>
      <Paper sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={interventions.map((inter) => {
            return { ...inter, id: inter._id };
          })}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          sx={{ border: 0, height: "auto" }}
        />
      </Paper>
    </div>
  );
};

export default ListRequests;
