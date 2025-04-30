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
          <Typography>{"Tunis, Tunisie"}</Typography>
        </Typography>
        <Typography>
          <LocalPhoneIcon />
          {" Tel"}
        </Typography>
        <Typography>
          <AlternateEmailIcon />
          {" Email"}
        </Typography>
      </Stack>
      <Stack width={"25%"} justifyContent={"center"}>
        <Typography fontSize={"25px"} fontWeight={900}>
          A propos de notre société
        </Typography>
        <Typography>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
          voluptatum earum enim maxime dolor, voluptatibus possimus inventore
          consequatur excepturi aliquam quisquam ad voluptate assumenda, hic et.
          Illo obcaecati commodi mollitia?
        </Typography>
        <Stack direction={"row"} spacing={3} mt={"10px"}>
          <a target="_blank" href="http://www.facebook.com">
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
