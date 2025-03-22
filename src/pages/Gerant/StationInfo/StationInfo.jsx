import { Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";

const StationInfo = () => {
  const columns = [{ field: "id" }, { field: "type" }];
  const paginationModel = { page: 0, pageSize: 5 };

  const { user } = useSelector((state) => state);
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Typography>My Station's Info</Typography>
      <Stack>
        <Stack>
          <Typography textAlign={"center"}>ID : {user.station._id}</Typography>
          <Typography textAlign={"center"}>
            Adresse : {user.station.adresse} - {user.station.gouvernorat}
          </Typography>
        </Stack>
        <DataGrid
          rows={user.station.listmateriel}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0, width: "100vw " }}
        />
      </Stack>
    </Stack>
  );
};

export default StationInfo;
