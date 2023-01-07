import React from "react";
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import logo from "app/assets/icons/logo.svg";

const Logo = ({ mini, mode, sx }) => {
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link
        href={"/home"}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img src={logo} alt="Lewind Logo" />
        {!mini && (
          <Typography
            component="div"
            variant="h1"
            sx={{ fontWeight: 700, fontSize: 22 }}
            ml={1.5}
            mb={0}
          >
            PT. Lewind
          </Typography>
        )}
      </Link>
    </Div>
  );
};

Logo.defaultProps = {
  mode: "light",
};

export default Logo;
