import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card, CardContent, Typography, Box, Chip, IconButton, Button,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { CATEGORIES } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";
import { setActiveTab } from "../../store/uiSlice";
import dayjs from "dayjs";

export default function RecentTransactions() {
  const dispatch = useDispatch();
  const transactions = useSelector((s) => s.transactions.items).slice(0, 6);

  return (
    <Card>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
              Recent Transactions
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Latest activity
            </Typography>
          </Box>
          <Button
            endIcon={<ArrowForwardRoundedIcon />}
            size="small"
            onClick={() => dispatch(setActiveTab("transactions"))}
            sx={{ fontSize: "0.75rem", fontWeight: 600, color: "primary.main" }}
          >
            View All
          </Button>
        </Box>
        {transactions.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="text.secondary">No transactions yet</Typography>
          </Box>
        ) : (
          transactions.map((txn) => {
            const cat = CATEGORIES.find((c) => c.id === txn.category);
            return (
              <Box
                key={txn.id}
                sx={{
                  display: "flex", alignItems: "center", gap: 1.5,
                  py: 1.2, borderBottom: "1px solid", borderColor: "divider",
                  "&:last-child": { borderBottom: "none" },
                  transition: "background 0.15s",
                  borderRadius: "8px", px: 0.5,
                  "&:hover": { background: "rgba(245,158,11,0.04)" },
                }}
              >
                <Box
                  sx={{
                    width: 38, height: 38, borderRadius: "10px",
                    background: `${cat?.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", flexShrink: 0,
                  }}
                >
                  {cat?.icon || "💡"}
                </Box>
                <Box flex={1} minWidth={0}>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.82rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {txn.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {dayjs(txn.date).format("DD MMM YYYY")}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700, fontSize: "0.85rem",
                      color: txn.type === "income" ? "#10B981" : "#EF4444",
                    }}
                  >
                    {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount, true)}
                  </Typography>
                  <Chip
                    label={cat?.label || txn.category}
                    size="small"
                    sx={{
                      height: 16, fontSize: "0.62rem",
                      background: `${cat?.color}18`,
                      color: cat?.color,
                      border: "none",
                    }}
                  />
                </Box>
              </Box>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
