import { Stack, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Stack
      direction={"row"}
      p={"25px"}
      bgcolor={"#005"}
      width={"100%"}
      color={"#fff"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Stack spacing={3} width={"25%"} justifyContent={"center"}>
        <Typography>
          <PlaceIcon />
          {" Adresse"}
          <Typography>
            {"Tunis"} Av. Mohamed Ali Akid, Cité Olympique, 1003 El Khadra-Tunis
          </Typography>
        </Typography>
        <Typography>
          <LocalPhoneIcon />
          {" Tel"} 70 284 500.
        </Typography>
        <Typography>
          <AlternateEmailIcon />
          {" Email"} boc@agil.com.tn.
        </Typography>
      </Stack>
      <Stack width={"25%"} justifyContent={"center"}>
        <Typography fontSize={"25px"} fontWeight={900}>
          A propos de notre société
        </Typography>
        <Typography>
          La Société Nationale de Distribution des Pétroles Agil Energy S.A. est
          une entreprise publique ayant pour mission la commercialisation des
          produits pétroliers et de leurs dérivés sous le label Agil Energy.
        </Typography>
        <Stack direction={"row"} spacing={3} mt={"10px"}>
          <a
            target="_blank"
            href="https://www.facebook.com/agil.com.tn/?locale=fr_FR"
          >
            <FacebookIcon htmlColor="#fff" />
          </a>
          <a target="_blank" href="https://github.com/wassoula973">
            <GitHubIcon htmlColor="#fff" />
          </a>
          <a target="_blank" href="https://linkedin.com/">
            <LinkedInIcon htmlColor="#fff" />
          </a>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
