import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box, Card, CardContent, Typography, TextField, Select, MenuItem,
  FormControl, InputLabel, Button, IconButton, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Tooltip,
  InputAdornment, TablePagination, Menu, MenuItem as MItem,
  Divider, Alert,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { selectFilteredTransactions, setFilter, clearFilters, deleteTransaction } from "../../store/transactionsSlice";
import { openModal, showSnackbar } from "../../store/uiSlice";
import { CATEGORIES } from "../../data/mockData";
import { formatCurrency, exportToCSV, exportToJSON } from "../../utils/format";
import TransactionModal from "./TransactionModal";
import dayjs from "dayjs";

export default function Transactions() {
  const dispatch = useDispatch();
  const { role } = useSelector((s) => s.ui);
  const filters = useSelector((s) => s.transactions.filters);
  const transactions = useSelector(selectFilteredTransactions);
  const isAdmin = role === "admin";

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [exportAnchor, setExportAnchor] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const paginated = transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSort = (field) => {
    if (filters.sortBy === field) {
      dispatch(setFilter({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" }));
    } else {
      dispatch(setFilter({ sortBy: field, sortOrder: "desc" }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
    dispatch(showSnackbar({ message: "Transaction deleted", severity: "info" }));
    setDeleteConfirm(null);
  };

  const SortIcon = ({ field }) => {
    if (filters.sortBy !== field) return null;
    return filters.sortOrder === "asc"
      ? <ArrowUpwardRoundedIcon sx={{ fontSize: 14, ml: 0.5 }} />
      : <ArrowDownwardRoundedIcon sx={{ fontSize: 14, ml: 0.5 }} />;
  };

  const hasFilters = filters.search || filters.type !== "all" || filters.category !== "all" || filters.dateFrom || filters.dateTo;

  return (
    <Box>
      <TransactionModal />

      {/* Role Banner for Viewer */}
      {!isAdmin && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: "10px" }}>
          You are in <strong>Viewer mode</strong>. Switch to Admin to add or edit transactions.
        </Alert>
      )}

      {/* Toolbar */}
      <Card sx={{ mb: 2.5 }}>
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "flex-end" }}>
            <TextField
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => { dispatch(setFilter({ search: e.target.value })); setPage(0); }}
              size="small"
              sx={{ minWidth: 200, flex: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} /></InputAdornment>,
                endAdornment: filters.search ? (
                  <IconButton size="small" onClick={() => dispatch(setFilter({ search: "" }))}>
                    <ClearRoundedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                ) : null,
              }}
            />

            <FormControl size="small" sx={{ minWidth: 110 }}>
              <InputLabel>Type</InputLabel>
              <Select value={filters.type} label="Type" onChange={(e) => { dispatch(setFilter({ type: e.target.value })); setPage(0); }}>
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Category</InputLabel>
              <Select value={filters.category} label="Category" onChange={(e) => { dispatch(setFilter({ category: e.target.value })); setPage(0); }}>
                <MenuItem value="all">All</MenuItem>
                {CATEGORIES.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.icon} {c.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="From" type="date" size="small" value={filters.dateFrom}
              onChange={(e) => { dispatch(setFilter({ dateFrom: e.target.value })); setPage(0); }}
              InputLabelProps={{ shrink: true }} sx={{ width: 140 }}
            />
            <TextField
              label="To" type="date" size="small" value={filters.dateTo}
              onChange={(e) => { dispatch(setFilter({ dateTo: e.target.value })); setPage(0); }}
              InputLabelProps={{ shrink: true }} sx={{ width: 140 }}
            />

            {hasFilters && (
              <Button size="small" startIcon={<ClearRoundedIcon />} onClick={() => { dispatch(clearFilters()); setPage(0); }} variant="outlined" color="warning">
                Clear
              </Button>
            )}

            <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
              <Button
                size="small"
                startIcon={<DownloadRoundedIcon />}
                variant="outlined"
                onClick={(e) => setExportAnchor(e.currentTarget)}
              >
                Export
              </Button>
              <Menu anchorEl={exportAnchor} open={Boolean(exportAnchor)} onClose={() => setExportAnchor(null)}>
                <MItem onClick={() => { exportToCSV(transactions); setExportAnchor(null); }}>Export as CSV</MItem>
                <MItem onClick={() => { exportToJSON(transactions); setExportAnchor(null); }}>Export as JSON</MItem>
              </Menu>

              {isAdmin && (
                <Button
                  size="small"
                  startIcon={<AddRoundedIcon />}
                  variant="contained"
                  onClick={() => dispatch(openModal())}
                >
                  Add
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Summary */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Showing <strong>{transactions.length}</strong> transactions
        </Typography>
        {hasFilters && (
          <Chip label={`${transactions.length} results`} size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: "0.7rem" }} />
        )}
      </Box>

      {/* Table */}
      <Card>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 0.5, py: 1.5 } }}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleSort("date")}>
                    Date <SortIcon field="date" />
                  </Box>
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleSort("amount")}>
                    Amount <SortIcon field="amount" />
                  </Box>
                </TableCell>
                {isAdmin && <TableCell align="center">Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 6 : 5} sx={{ textAlign: "center", py: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      {hasFilters ? "No transactions match your filters" : "No transactions found"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((txn) => {
                  const cat = CATEGORIES.find((c) => c.id === txn.category);
                  return (
                    <TableRow
                      key={txn.id}
                      sx={{
                        "&:hover": { background: "rgba(245,158,11,0.04)" },
                        "& td": { py: 1.5 },
                      }}
                    >
                      <TableCell>
                        <Typography variant="caption" sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>
                          {dayjs(txn.date).format("DD MMM YY")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.82rem" }}>
                          {txn.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${cat?.icon || ""} ${cat?.label || txn.category}`}
                          size="small"
                          sx={{ background: `${cat?.color}18`, color: cat?.color, border: "none", fontWeight: 600, fontSize: "0.7rem", height: 22 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={txn.type}
                          size="small"
                          sx={{
                            background: txn.type === "income" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                            color: txn.type === "income" ? "#10B981" : "#EF4444",
                            fontWeight: 700, fontSize: "0.7rem", height: 22, border: "none",
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700, fontSize: "0.85rem",
                            color: txn.type === "income" ? "#10B981" : "#EF4444",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount)}
                        </Typography>
                      </TableCell>
                      {isAdmin && (
                        <TableCell align="center">
                          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                            <Tooltip title="Edit">
                              <IconButton size="small" onClick={() => dispatch(openModal(txn))} sx={{ color: "primary.main" }}>
                                <EditRoundedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(txn.id)}
                                sx={{ color: "error.main" }}
                              >
                                <DeleteRoundedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={transactions.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{ "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": { fontSize: "0.78rem" } }}
        />
      </Card>
    </Box>
  );
}
