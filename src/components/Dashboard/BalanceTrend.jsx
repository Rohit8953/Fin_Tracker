import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { getMonthlyData } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        background: darkMode ? "#1E293B" : "#fff",
        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)"}`,
        borderRadius: "10px",
        p: 1.5,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 700, color: darkMode ? "#94A3B8" : "#64748B", display: "block", mb: 0.5 }}>
        {label}
      </Typography>
      {payload.map((p) => (
        <Box key={p.name} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.3 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
          <Typography variant="caption" sx={{ fontWeight: 600, color: darkMode ? "#F1F5F9" : "#0F172A" }}>
            {p.name}: {formatCurrency(p.value, true)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default function BalanceTrend() {
  const { darkMode } = useSelector((s) => s.ui);
  const transactions = useSelector((s) => s.transactions.items);
  const data = getMonthlyData(transactions);

  const gridColor = darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)";
  const textColor = darkMode ? "#64748B" : "#94A3B8";

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 }, height: "100%" }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
            Monthly Overview
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Income vs Expenses trend
          </Typography>
        </Box>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="income" name="Income" stroke="#10B981" strokeWidth={2.5} fill="url(#incomeGrad)" dot={{ fill: "#10B981", strokeWidth: 0, r: 4 }} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2.5} fill="url(#expenseGrad)" dot={{ fill: "#EF4444", strokeWidth: 0, r: 4 }} />
            <Area type="monotone" dataKey="balance" name="Balance" stroke="#F59E0B" strokeWidth={2.5} fill="url(#balanceGrad)" dot={{ fill: "#F59E0B", strokeWidth: 0, r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
