import { createTheme } from "@mui/material/styles";

const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#F59E0B", light: "#FCD34D", dark: "#D97706", contrastText: "#0F172A" },
      secondary: { main: "#06B6D4", light: "#67E8F9", dark: "#0891B2" },
      success: { main: "#10B981" },
      error: { main: "#EF4444" },
      warning: { main: "#F59E0B" },
      background: darkMode
        ? { default: "#0A0F1E", paper: "#111827" }
        : { default: "#F0F4FF", paper: "#FFFFFF" },
      text: darkMode
        ? { primary: "#F1F5F9", secondary: "#94A3B8" }
        : { primary: "#0F172A", secondary: "#475569" },
      divider: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    },
    typography: {
      fontFamily: "'DM Sans', 'Helvetica', sans-serif",
      h1: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 },
      h2: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 },
      h3: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 },
      h4: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 },
      h5: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 },
      h6: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    shadows: darkMode
      ? [
          "none",
          "0 1px 3px rgba(0,0,0,0.5)",
          "0 4px 12px rgba(0,0,0,0.4)",
          "0 8px 24px rgba(0,0,0,0.5)",
          ...Array(21).fill("0 12px 40px rgba(0,0,0,0.6)"),
        ]
      : [
          "none",
          "0 1px 3px rgba(15,23,42,0.08)",
          "0 4px 12px rgba(15,23,42,0.08)",
          "0 8px 24px rgba(15,23,42,0.10)",
          ...Array(21).fill("0 12px 40px rgba(15,23,42,0.12)"),
        ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", fontWeight: 600, borderRadius: 8 },
          contained: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,23,42,0.06)",
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: 6, fontWeight: 600, fontSize: "0.75rem" } },
      },
      MuiTableCell: {
        styleOverrides: { root: { borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)" } },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            "& fieldset": { borderColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.15)" },
          },
        },
      },
      MuiDialog: {
        styleOverrides: { paper: { borderRadius: 20 } },
      },
    },
  });

export default getTheme;
