import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import {Box} from "@mui/material";

export default function RootLayout() {
  return (
    <Box sx={{maxHeight: '100vh', maxWidth: '100%', overflowX: 'hidden'}}>
      <Header />
        <Outlet />
    </Box>
  );
}
