import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Select, FormControl, InputLabel,
  Box, Typography, ToggleButton, ToggleButtonGroup, InputAdornment,
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { addTransaction, updateTransaction } from "../../store/transactionsSlice";
import { closeModal, showSnackbar } from "../../store/uiSlice";
import { CATEGORIES } from "../../data/mockData";
import dayjs from "dayjs";

const EMPTY = { description: "", amount: "", category: "food", type: "expense", date: dayjs().format("YYYY-MM-DD") };

export default function TransactionModal() {
  const dispatch = useDispatch();
  const { modalOpen, editingTransaction } = useSelector((s) => s.ui);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) setForm({ ...editingTransaction, amount: String(editingTransaction.amount) });
    else setForm(EMPTY);
    setErrors({});
  }, [editingTransaction, modalOpen]);

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload = { ...form, amount: Number(form.amount) };
    if (editingTransaction) {
      dispatch(updateTransaction(payload));
      dispatch(showSnackbar({ message: "Transaction updated!", severity: "success" }));
    } else {
      dispatch(addTransaction(payload));
      dispatch(showSnackbar({ message: "Transaction added!", severity: "success" }));
    }
    dispatch(closeModal());
  };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <Dialog open={modalOpen} onClose={() => dispatch(closeModal())} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
          {editingTransaction ? "Edit Transaction" : "Add Transaction"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {editingTransaction ? "Update transaction details" : "Record a new transaction"}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        {/* Type Toggle */}
        <Box sx={{ mb: 2.5 }}>
          <ToggleButtonGroup
            value={form.type}
            exclusive
            onChange={(_, v) => v && set("type", v)}
            fullWidth
            size="small"
            sx={{ "& .MuiToggleButton-root": { borderRadius: "8px !important", border: "1px solid", py: 1, fontWeight: 600 } }}
          >
            <ToggleButton
              value="income"
              sx={{
                borderColor: form.type === "income" ? "#10B981 !important" : "divider",
                color: form.type === "income" ? "#10B981 !important" : "text.secondary",
                background: form.type === "income" ? "rgba(16,185,129,0.1) !important" : "transparent",
                gap: 0.5,
              }}
            >
              <TrendingUpRoundedIcon sx={{ fontSize: 16 }} /> Income
            </ToggleButton>
            <ToggleButton
              value="expense"
              sx={{
                borderColor: form.type === "expense" ? "#EF4444 !important" : "divider",
                color: form.type === "expense" ? "#EF4444 !important" : "text.secondary",
                background: form.type === "expense" ? "rgba(239,68,68,0.1) !important" : "transparent",
                gap: 0.5,
              }}
            >
              <TrendingDownRoundedIcon sx={{ fontSize: 16 }} /> Expense
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            size="small"
            fullWidth
            placeholder="e.g. Monthly Salary"
          />
          <TextField
            label="Amount (₹)"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            error={!!errors.amount}
            helperText={errors.amount}
            size="small"
            fullWidth
            type="number"
            InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
          />
          <FormControl size="small" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={form.category} label="Category" onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => (
                <MenuItem key={c.id} value={c.id} sx={{ gap: 1 }}>
                  {c.icon} {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            error={!!errors.date}
            helperText={errors.date}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 1, gap: 1 }}>
        <Button onClick={() => dispatch(closeModal())} variant="outlined" size="small" sx={{ flex: 1 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" size="small" sx={{ flex: 1 }}>
          {editingTransaction ? "Update" : "Add Transaction"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
