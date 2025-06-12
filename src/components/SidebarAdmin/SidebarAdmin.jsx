// Import des composants Material-UI pour l'interface
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// Import des hooks de React Router pour la navigation
import { useLocation, useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
const SidebarAdmin = () => {
  // State pour gérer l'ouverture/fermeture du drawer (sidebar)

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Hook pour connaître la route actuelle
  const location = useLocation();
  // Ferme le drawer quand on clique à l'intérieur // Supprime le padding par défaut

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  console.log(location);

  const DrawerList = (
    <Box
      sx={{ width: 250, pt: "70px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem
          disablePadding // Supprime le padding par défaut
          style={{
            background: location.pathname == "/" ? "#efa358d9" : "",
          }}
        >
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <Divider /> {/* Ligne de séparation */}
        {/* Item 2: Manage users */}
        <ListItem
          disablePadding
          style={{
            background: location.pathname == "/users" ? "#efa358d9" : "",
          }}
        >
          <ListItemButton
            onClick={() => {
              navigate("/users");
            }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Manage Users"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Item 3: Manage stations */}
        <ListItem
          disablePadding
          style={{
            background: location.pathname == "/stations" ? "#efa358d9" : "",
          }}
        >
          <ListItemButton
            onClick={() => {
              navigate("/stations");
            }}
          >
            <ListItemIcon>
              <LocalGasStationIcon style={{ color: "#ffd001" }} />
            </ListItemIcon>
            <ListItemText primary={"Manage Stations"} />
          </ListItemButton>
        </ListItem>
        {/* Item 4: manage interventions */}
        <Divider />
        <ListItem
          disablePadding
          style={{
            background:
              location.pathname == "/interventions" ? "#efa358d9" : "",
          }}
        >
          <ListItemButton
            onClick={() => {
              navigate("/interventions");
            }}
          >
            <ListItemIcon>
              <WarningAmberRoundedIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary={"Manage Interventions"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {open == false && (
        <Button className="btn-menu" onClick={toggleDrawer(true)}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <MenuIcon />
            <Typography>{"Menu >>"}</Typography>
          </Stack>
        </Button>
      )}
      {/* Drawer (sidebar) qui s'ouvre depuis la gauche */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SidebarAdmin;
