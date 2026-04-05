import React from "react";
import { useSelector } from "react-redux";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { selectSummary } from "../../store/transactionsSlice";
import { formatCurrency } from "../../utils/format";

const StatCard = ({ title, value, subtitle, icon, gradient, trend }) => {
  const { darkMode } = useSelector((s) => s.ui);
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box flex={1}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontSize: "0.65rem" }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700, fontSize: { xs: "1.4rem", md: "1.7rem" }, color: "text.primary", lineHeight: 1.2 }}>
              {formatCurrency(value, true)}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 48, height: 48, borderRadius: "14px",
              background: gradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, ml: 2,
              boxShadow: `0 4px 16px ${gradient.includes("F59E0B") ? "rgba(245,158,11,0.3)" : gradient.includes("10B981") ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
            }}
          >
            {icon}
          </Box>
        </Box>
        {trend !== undefined && (
          <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              sx={{
                display: "inline-flex", alignItems: "center", gap: 0.3,
                px: 1, py: 0.3, borderRadius: "6px",
                background: trend >= 0 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                color: trend >= 0 ? "#10B981" : "#EF4444",
              }}
            >
              {trend >= 0 ? <TrendingUpRoundedIcon sx={{ fontSize: 14 }} /> : <TrendingDownRoundedIcon sx={{ fontSize: 14 }} />}
              <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.72rem" }}>
                {Math.abs(trend).toFixed(1)}%
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>vs last month</Typography>
          </Box>
        )}
      </CardContent>
      {/* Decorative circle */}
      <Box
        sx={{
          position: "absolute", right: -20, top: -20, width: 100, height: 100,
          borderRadius: "50%", background: gradient, opacity: 0.06,
        }}
      />
    </Card>
  );
};

export default function SummaryCards() {
  const summary = useSelector(selectSummary);

  const cards = [
    {
      title: "Total Balance",
      value: summary.totalBalance,
      subtitle: `${summary.transactionCount} total transactions`,
      icon: <AccountBalanceWalletRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />,
      gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      trend: 8.2,
    },
    {
      title: "Total Income",
      value: summary.totalIncome,
      subtitle: `This month: ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(summary.monthIncome)}`,
      icon: <TrendingUpRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />,
      gradient: "linear-gradient(135deg, #10B981, #059669)",
      trend: 5.4,
    },
    {
      title: "Total Expenses",
      value: summary.totalExpenses,
      subtitle: `This month: ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(summary.monthExpenses)}`,
      icon: <TrendingDownRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />,
      gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
      trend: -3.1,
    },
    {
      title: "This Month Balance",
      value: summary.monthBalance,
      subtitle: "Net savings for current month",
      icon: <CalendarMonthRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />,
      gradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
    },
  ];

  return (
    <Grid container spacing={2.5}>
      {cards.map((card, i) => (
        <Grid item xs={12} sm={6} lg={3} key={i}>
          <StatCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
