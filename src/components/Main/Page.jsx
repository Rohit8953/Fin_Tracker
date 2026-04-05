
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, CssBaseline, Box, Snackbar, Alert, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import getTheme from "../../theme";
import Sidebar from "../Layout/Sidebar"
import TopBar from "../Layout/TopBar";
// import Dashboard from "./components/Dashboard";
// import Transactions from "./components/Transactions";
// import Insights from "./components/Insights";
import { hideSnackbar, toggleSidebar } from "../../store/uiSlice";
import { Outlet } from "react-router-dom";

const SIDEBAR_WIDTH = 240;

const Page = () => {
  const dispatch = useDispatch();
  const { darkMode, activeTab, sidebarOpen, snackbar } = useSelector((s) => s.ui);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const renderPage = () => {
//     switch (activeTab) {
//       case "dashboard": return <Dashboard />;
//       case "transactions": return <Transactions />;
//       case "insights": return <Insights />;
//       default: return <Dashboard />;
//     }
//   };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", background: "background.default" }}>
        <Sidebar open={sidebarOpen} onClose={() => dispatch(toggleSidebar())} />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            marginLeft: !isMobile && sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
            transition: "margin-left 0.3s ease",
          }}
        >
          <TopBar />
          <Box
            component="main"
            sx={{
              flex: 1,
              p: { xs: 2, md: 3 },
              maxWidth: 1400,
              width: "100%",
              mx: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => dispatch(hideSnackbar())}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => dispatch(hideSnackbar())}
          severity={snackbar.severity}
          sx={{ width: "100%", borderRadius: "10px", boxShadow: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Page