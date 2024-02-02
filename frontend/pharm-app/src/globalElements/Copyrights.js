import * as React from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";


export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" >
          Jn(end)&Fb(beginning)
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }