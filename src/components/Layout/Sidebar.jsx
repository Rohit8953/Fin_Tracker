import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Divider, Avatar, Chip, useTheme, useMediaQuery,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { setActiveTab } from "../../store/uiSlice";
import { Link, useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { id: "", label: "Dashboard", icon: <DashboardRoundedIcon /> },
  { id: "transactions", label: "Transactions", icon: <ReceiptLongRoundedIcon /> },
  { id: "insights", label: "Insights", icon: <InsightsRoundedIcon /> },
];

export default function Sidebar({ open, onClose }) {
  const dispatch = useDispatch();
  const { activeTab, role, darkMode } = useSelector((s) => s.ui);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  function handleClick (){
    navigate("/");
  }

  const handleNav = (tab) => {
    // navigate(`dashboard/${tab}`);
    dispatch(setActiveTab(tab));
    if (isMobile) onClose();
  };

  const content = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: darkMode
          ? "linear-gradient(180deg, #0F172A 0%, #0A0F1E 100%)"
          : "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
        color: "#F1F5F9",
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, py: 3, cursor: "pointer" }} onClick={handleClick}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: "10px",
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", boxShadow: "0 4px 12px rgba(245,158,11,0.4)",
            }}
          >
            ₹
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: "#F1F5F9", lineHeight: 1.2, fontSize: "1.05rem" }}>
              FinTrack
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.68rem" }}>
              Personal Finance
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

      {/* Nav */}
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.id;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
             <Link to={`/dashboard/${item?.id}`}>
                <ListItemButton
                  onClick={() => handleNav(item?.id)}
                  sx={{
                    borderRadius: "10px",
                    py: 1.2,
                    px: 1.5,
                    background: active
                      ? "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.08))"
                      : "transparent",
                    border: active ? "1px solid rgba(245,158,11,0.25)" : "1px solid transparent",
                    "&:hover": {
                      background: active
                        ? "linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.12))"
                        : "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: active ? "#F59E0B" : "#64748B",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: active ? 600 : 400,
                      color: active ? "#F59E0B" : "#94A3B8",
                    }}
                  />
                  {active && (
                    <Box
                      sx={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "#F59E0B",
                        boxShadow: "0 0 8px rgba(245,158,11,0.8)",
                      }}
                    />
                  )}
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

      {/* User Info */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 1.5, borderRadius: "12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 36, height: 36,
              background: role === "admin"
                ? "linear-gradient(135deg, #F59E0B, #D97706)"
                : "linear-gradient(135deg, #06B6D4, #0891B2)",
              fontSize: "0.8rem", fontWeight: 700,
            }}
          >
            {role === "admin" ? "AD" : "VW"}
          </Avatar>
          <Box flex={1}>
            <Typography variant="body2" sx={{ color: "#F1F5F9", fontWeight: 600, fontSize: "0.8rem" }}>
              {role === "admin" ? "Admin User" : "Viewer"}
            </Typography>
            <Chip
              icon={role === "admin" ? <AdminPanelSettingsRoundedIcon sx={{ fontSize: "12px !important" }} /> : <VisibilityRoundedIcon sx={{ fontSize: "12px !important" }} />}
              label={role === "admin" ? "Admin" : "Viewer"}
              size="small"
              sx={{
                height: 18,
                fontSize: "0.62rem",
                fontWeight: 700,
                background: role === "admin" ? "rgba(245,158,11,0.15)" : "rgba(6,182,212,0.15)",
                color: role === "admin" ? "#F59E0B" : "#06B6D4",
                border: "none",
                "& .MuiChip-icon": { color: "inherit" },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { border: "none", width: DRAWER_WIDTH } }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="persistent"
      open={open}
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          border: "none",
          boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
        },
      }}
    >
      {content}
    </Drawer>
  );
}
