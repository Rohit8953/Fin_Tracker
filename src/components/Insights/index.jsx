import React from "react";
import { useSelector } from "react-redux";
import {
  Grid, Card, CardContent, Typography, Box, LinearProgress,
  Chip, Divider,
} from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { getMonthlyData, getCategoryBreakdown } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";
import dayjs from "dayjs";

const InsightCard = ({ icon, title, subtitle, color, children, badge }) => {
  const { darkMode } = useSelector((s) => s.ui);
  return (
    <Card sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: "12px", background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
            {icon}
          </Box>
          <Box flex={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{title}</Typography>
              {badge && <Chip label={badge} size="small" sx={{ height: 18, fontSize: "0.62rem", background: `${color}20`, color, border: "none", fontWeight: 700 }} />}
            </Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>{subtitle}</Typography>
          </Box>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

export default function Insights() {
  const { darkMode } = useSelector((s) => s.ui);
  const transactions = useSelector((s) => s.transactions.items);

  const monthlyData = getMonthlyData(transactions);
  const categoryData = getCategoryBreakdown(transactions);
  const topCategory = categoryData[0];

  // Savings rate
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Month over month
  const sorted = [...monthlyData].reverse();
  const lastMonth = sorted[sorted.length - 2];
  const currMonth = sorted[sorted.length - 1];
  const expenseChange = lastMonth && currMonth
    ? ((currMonth.expenses - lastMonth.expenses) / lastMonth.expenses) * 100
    : 0;

  // Average monthly spend
  const avgMonthlySpend = monthlyData.length > 0 ? totalExpenses / monthlyData.length : 0;

  // Income vs expense ratio
  const ratio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  const gridColor = darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)";
  const textColor = darkMode ? "#64748B" : "#94A3B8";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Top Insight Cards */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <InsightCard
            icon={<EmojiEventsRoundedIcon />}
            title="Top Spending"
            subtitle="Highest expense category"
            color="#F59E0B"
            badge="#1"
          >
            {topCategory ? (
              <>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#F59E0B" }}>
                  {topCategory.icon} {topCategory.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 0.5 }}>
                  {formatCurrency(topCategory.value, true)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((topCategory.value / totalExpenses) * 100, 100)}
                  sx={{ mt: 1, borderRadius: 4, height: 6, background: "rgba(245,158,11,0.15)", "& .MuiLinearProgress-bar": { background: "#F59E0B", borderRadius: 4 } }}
                />
                <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
                  {((topCategory.value / totalExpenses) * 100).toFixed(1)}% of total expenses
                </Typography>
              </>
            ) : <Typography variant="body2" color="text.secondary">No data</Typography>}
          </InsightCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <InsightCard
            icon={<SavingsRoundedIcon />}
            title="Savings Rate"
            subtitle="Income saved after expenses"
            color={savingsRate >= 20 ? "#10B981" : "#EF4444"}
            badge={savingsRate >= 20 ? "Healthy" : "Low"}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: savingsRate >= 20 ? "#10B981" : "#EF4444" }}>
              {savingsRate.toFixed(1)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(savingsRate, 100)}
              sx={{
                mt: 1, borderRadius: 4, height: 8,
                background: "rgba(0,0,0,0.08)",
                "& .MuiLinearProgress-bar": {
                  background: savingsRate >= 20 ? "linear-gradient(90deg, #10B981, #059669)" : "linear-gradient(90deg, #EF4444, #DC2626)",
                  borderRadius: 4,
                },
              }}
            />
            <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
              Target: ≥ 20% savings rate
            </Typography>
          </InsightCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <InsightCard
            icon={<TrendingUpRoundedIcon />}
            title="Monthly Change"
            subtitle="Expense vs previous month"
            color={expenseChange <= 0 ? "#10B981" : "#EF4444"}
            badge={expenseChange <= 0 ? "↓ Better" : "↑ Higher"}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: expenseChange <= 0 ? "#10B981" : "#EF4444" }}>
              {expenseChange > 0 ? "+" : ""}{expenseChange.toFixed(1)}%
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.8rem" }}>
              {currMonth ? `${currMonth.month}: ${formatCurrency(currMonth.expenses, true)}` : "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
              {lastMonth ? `${lastMonth.month}: ${formatCurrency(lastMonth.expenses, true)}` : "N/A"}
            </Typography>
          </InsightCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <InsightCard
            icon={<WarningAmberRoundedIcon />}
            title="Expense Ratio"
            subtitle="Expenses as % of income"
            color={ratio > 80 ? "#EF4444" : ratio > 60 ? "#F59E0B" : "#10B981"}
            badge={ratio > 80 ? "Critical" : ratio > 60 ? "Watch" : "Good"}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: ratio > 80 ? "#EF4444" : ratio > 60 ? "#F59E0B" : "#10B981" }}>
              {ratio.toFixed(1)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(ratio, 100)}
              sx={{
                mt: 1, borderRadius: 4, height: 8,
                background: "rgba(0,0,0,0.08)",
                "& .MuiLinearProgress-bar": {
                  background: ratio > 80 ? "#EF4444" : ratio > 60 ? "#F59E0B" : "#10B981",
                  borderRadius: 4,
                },
              }}
            />
            <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
              Avg monthly spend: {formatCurrency(avgMonthlySpend, true)}
            </Typography>
          </InsightCard>
        </Grid>
      </Grid>

      {/* Monthly Comparison Bar Chart */}
      <Card>
        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
              Monthly Comparison
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Income vs Expenses by month
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(v, name) => [formatCurrency(v), name]}
                contentStyle={{
                  background: darkMode ? "#1E293B" : "#fff",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  borderRadius: "10px",
                }}
              />
              <Bar dataKey="income" name="Income" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Breakdown Table */}
      <Card>
        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem", mb: 2 }}>
            Category Analysis
          </Typography>
          {categoryData.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No expense data available</Typography>
          ) : (
            categoryData.map((cat, i) => (
              <Box key={cat.id}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5 }}>
                  <Typography sx={{ minWidth: 28, textAlign: "center", fontSize: "18px" }}>{cat.icon}</Typography>
                  <Box flex={1} minWidth={0}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.82rem" }}>{cat.label}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: cat.color, fontSize: "0.82rem" }}>
                        {formatCurrency(cat.value, true)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(cat.value / categoryData[0].value) * 100}
                      sx={{ borderRadius: 4, height: 6, background: `${cat.color}20`, "& .MuiLinearProgress-bar": { background: cat.color, borderRadius: 4 } }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", minWidth: 40, textAlign: "right" }}>
                    {((cat.value / totalExpenses) * 100).toFixed(1)}%
                  </Typography>
                </Box>
                {i < categoryData.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
