import React from "react";
import { Grid, Box } from "@mui/material";
import SummaryCards from "./SummaryCards";
import BalanceTrend from "./BalanceTrend";
import SpendingBreakdown from "./SpendingBreakdown";
import RecentTransactions from "./RecentTransactions";

export default function Dashboard() {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <SummaryCards />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <BalanceTrend />
        </Grid>
        <Grid item xs={12} lg={5}>
          <SpendingBreakdown />
        </Grid>
      </Grid>
      <RecentTransactions />
    </Box>
  );
}
