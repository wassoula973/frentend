import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GroupsIcon from "@mui/icons-material/Groups";

const Profil = () => {
  const { user } = useSelector((state) => state);

  return user ? (
    <Stack
      height={"calc(100vh - 75px )"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        spacing={3}
        style={{
          width: "30%",
          background: "#d1d1d1",
          padding: "25px",
          borderRadius: "25px",
        }}
      >
        <Typography
          style={{ fontSize: "48px", textAlign: "center", fontWeight: 900 }}
        >
          Profile
        </Typography>
        <a href="/edit_profil">
          <Typography textAlign={"right"}>Edit Profil</Typography>
        </a>
        <Typography
          style={{
            marginLeft: "20px",
            marginTop: "50px",
            fontWeight: "bold",
          }}
        >
          <AccountCircleIcon color="primary" /> Nom et Prénom :
          {" " + user.lastname + " " + user.firstname}
        </Typography>

        <Typography
          style={{
            marginLeft: "20px",

            fontWeight: "bold",
          }}
        >
          <AlternateEmailIcon color="primary" /> Email : {user.email}
        </Typography>
        <Typography
          style={{
            marginLeft: "20px",

            fontWeight: "bold",
          }}
        >
          <ContactEmergencyIcon color="primary" /> CIN : {user.cin}
        </Typography>

        {user.phone && (
          <Typography
            style={{
              marginLeft: "20px",

              fontWeight: "bold",
            }}
          >
            <LocalPhoneIcon color="primary" /> Phone : {user.phone}
          </Typography>
        )}

        <Typography
          style={{
            marginLeft: "20px",

            fontWeight: "bold",
          }}
        >
          <GroupsIcon color="primary" /> Role :
          <Typography
            style={{
              fontWeight: "bold",
              textTransform: "capitalize",
              display: "inline",
            }}
          >
            {" " + user.role}
          </Typography>
        </Typography>

        {user.role == "assistant" && (
          <Stack pl={"20px"}>
            <Typography
              style={{
                fontSize: "20px",
                fontWeight: 900,
                color: "#d5a68a",
              }}
            >
              Liste des gouvernorats :
            </Typography>
            {[...user.gouvernorats].sort().map((g) => {
              return <Typography>* {g}</Typography>;
            })}
          </Stack>
        )}

        {user.role == "gerant" && (
          <Stack>
            {user.station && (
              <Stack>
                <Typography
                  style={{
                    marginLeft: "20px",
                    marginTop: user.station.deleted ? 0 : "50px",
                    fontWeight: "bold",
                  }}
                >
                  <LocationOnIcon color="primary" /> L'adresse du Station est :{" "}
                  {user.station.adresse}
                </Typography>
                <Typography
                  style={{
                    marginLeft: "20px",
                    fontWeight: "bold",
                  }}
                >
                  <BusinessIcon color="secondary" /> Gouvernorat :
                  {" " + user.station.gouvernorat}
                </Typography>
              </Stack>
            )}

            {user.listeQueries && (
              <>
                {user.listeQueries.map((q) => {
                  console.log(q);

                  return (
                    <>
                      <Typography>
                        {dayjs(q.date).format("YYYY - MM -DD HH:mm")}
                      </Typography>
                      <Typography>{q.etat}</Typography>
                    </>
                  );
                })}
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  ) : (
    "Loading"
  );
};

export default Profil;
