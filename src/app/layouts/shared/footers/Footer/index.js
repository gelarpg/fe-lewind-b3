import React from 'react';
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Div from "@jumbo/shared/Div";

const Footer = () => {

    return (
        <Div sx={{
            py: 2,
            px: {lg: 6, xs: 4},
            borderTop: 2,
            borderColor: 'divider',
            bgcolor: 'background.paper',
        }}>
            <Div sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant={"body1"} color={"text.primary"}>Copyright PT. Lewind © 2023</Typography>
            </Div>
        </Div>
    );
};

export default Footer;
