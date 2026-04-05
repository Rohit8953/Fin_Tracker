import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { getCategoryBreakdown } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 12} textAnchor="middle" fill={fill} style={{ fontSize: "14px", fontWeight: 700 }}>
        {payload.icon} {payload.label}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={fill} style={{ fontSize: "13px", fontWeight: 600 }}>
        {formatCurrency(value, true)}
      </text>
      <text x={cx} y={cy + 28} textAnchor="middle" fill="#94A3B8" style={{ fontSize: "11px" }}>
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 12} outerRadius={outerRadius + 16} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.4} />
    </g>
  );
};

export default function SpendingBreakdown() {
  const [activeIdx, setActiveIdx] = useState(0);
  const transactions = useSelector((s) => s.transactions.items);
  const data = getCategoryBreakdown(transactions).slice(0, 6);

  if (!data.length) {
    return (
      <Card sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="body2" color="text.secondary">No expense data</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
            Spending Breakdown
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            By category (top 6)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 2 }}>
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                activeIndex={activeIdx}
                activeShape={renderActiveShape}
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                onMouseEnter={(_, idx) => setActiveIdx(idx)}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box flex={1} sx={{ width: "100%", minWidth: 0 }}>
            {data.map((item, i) => (
              <Box
                key={item.id}
                onClick={() => setActiveIdx(i)}
                sx={{
                  display: "flex", alignItems: "center", gap: 1, mb: 0.8,
                  cursor: "pointer",
                  p: 0.8, borderRadius: "8px",
                  background: activeIdx === i ? `${item.color}15` : "transparent",
                  transition: "background 0.2s",
                  "&:hover": { background: `${item.color}10` },
                }}
              >
                <Box sx={{ width: 10, height: 10, borderRadius: "3px", background: item.color, flexShrink: 0 }} />
                <Typography variant="caption" sx={{ flex: 1, fontWeight: activeIdx === i ? 700 : 400, color: activeIdx === i ? item.color : "text.secondary", fontSize: "0.75rem" }}>
                  {item.icon} {item.label}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.75rem", color: "text.primary" }}>
                  {formatCurrency(item.value, true)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
