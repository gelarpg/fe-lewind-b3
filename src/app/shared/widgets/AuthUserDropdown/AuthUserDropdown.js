import React from "react";
import Avatar from "@mui/material/Avatar";
import { authUser as currentUser } from "./fake-db";
import {
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const AuthUserDropdown = () => {
  const { theme } = useJumboTheme();
  const { setAuthToken, authUser } = useJumboAuth();

  const onLogout = () => {
    setAuthToken(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Avatar
            src={currentUser.profile_pic}
            sizes={"small"}
            sx={{ boxShadow: 25, cursor: "pointer" }}
          />
        }
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: (theme) => theme.spacing(2.5),
          }}
        >
          <Avatar
            src={currentUser.profile_pic}
            alt={authUser?.first_name}
            sx={{ width: 60, height: 60, mb: 2 }}
          >
            {`${authUser?.first_name ? authUser?.first_name?.charAt(0) : ""}${
              authUser?.last_name ? authUser?.last_name?.charAt(0) : ""
            }`}
          </Avatar>
          <Typography variant={"h5"}>{`${authUser?.first_name ?? ""} ${
            authUser?.last_name ?? ""
          }`}</Typography>
          <Typography variant={"body1"} color="text.secondary">
            {authUser?.email}
          </Typography>
        </Div>
        <Divider />
        <nav>
          <List disablePadding sx={{ pb: 1 }}>
            {/* <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <PersonOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Profile" sx={{my: 0}}/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <EditOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile" sx={{my: 0}}/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <RepeatOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText onClick={() => navigate("/samples/content-layout")} primary="Switch User"
                                          sx={{my: 0}}/>
                        </ListItemButton> */}
            <ListItemButton onClick={onLogout}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ my: 0 }} />
            </ListItemButton>
          </List>
        </nav>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export default AuthUserDropdown;
