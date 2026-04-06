import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar, Toolbar, Typography, Box, IconButton, Tooltip,
  Select, MenuItem, FormControl, Chip, useTheme, useMediaQuery,
  Badge,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { toggleDarkMode, toggleSidebar, setRole } from "../../store/uiSlice";

const TAB_LABELS = { "": "Dashboard", transactions: "Transactions", insights: "Insights" };

export default function TopBar() {
  const dispatch = useDispatch();
  const { darkMode, role, activeTab, sidebarOpen } = useSelector((s) => s.ui);
  const accessToken = localStorage.getItem('accessToken');
  console.log("accessToken::", accessToken);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // console.log("userdetails: token", token);

    // const {token,darkMode}=useSelector(state=>state.userdetails);
    // const {role}=useSelector(state=>state.useractivity);


  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: darkMode ? "rgba(17,24,39,0.95)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"}`,
        color: darkMode ? "#F1F5F9" : "#0F172A",
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: "64px !important" }}>
        <IconButton onClick={() => dispatch(toggleSidebar())} size="small" sx={{ color: "inherit" }}>
          <MenuRoundedIcon />
        </IconButton>

        <Box flex={1}>
          <Typography variant="h5" sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" }, fontWeight: 700 }}>
            {TAB_LABELS[activeTab]}
          </Typography>
          <Typography variant="caption" sx={{ color: darkMode ? "#64748B" : "#94A3B8", display: { xs: "none", sm: "block" } }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </Typography>
        </Box>

        {/* Role Switcher */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile && (
            <Typography variant="caption" sx={{ color: darkMode ? "#64748B" : "#94A3B8", fontWeight: 500 }}>
              Role:
            </Typography>
          )}
          <FormControl size="small">
            <Select
              value={role}
              onChange={(e) => dispatch(setRole(e.target.value))}
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                borderRadius: "8px",
                minWidth: 110,
                "& .MuiSelect-select": { py: 0.75, display: "flex", alignItems: "center", gap: 0.5 },
                background: role === "admin"
                  ? "rgba(245,158,11,0.1)"
                  : "rgba(6,182,212,0.1)",
                color: role === "admin" ? "#D97706" : "#0891B2",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: role === "admin" ? "rgba(245,158,11,0.3)" : "rgba(6,182,212,0.3)",
                },
              }}
            >
              <MenuItem value="admin" sx={{ fontSize: "0.8rem", gap: 1 }}>
                <AdminPanelSettingsRoundedIcon sx={{ fontSize: 16 }} /> Admin
              </MenuItem>
              <MenuItem value="viewer" sx={{ fontSize: "0.8rem", gap: 1 }}>
                <VisibilityRoundedIcon sx={{ fontSize: 16 }} /> Viewer
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Tooltip title={`Switch to ${darkMode ? "light" : "dark"} mode`}>
          <IconButton onClick={() => dispatch(toggleDarkMode())} size="small" sx={{ color: "inherit" }}>
            {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton size="small" sx={{ color: "inherit" }}>
            <Badge badgeContent={3} color="error">
              <NotificationsRoundedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
