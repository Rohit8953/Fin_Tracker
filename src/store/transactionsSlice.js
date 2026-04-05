import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_TRANSACTIONS } from "../data/mockData";
import dayjs from "dayjs";

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("finance_transactions");
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  } catch {
    return INITIAL_TRANSACTIONS;
  }
};

const saveToStorage = (transactions) => {
  try {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  } catch {}
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: loadFromStorage(),
    filters: {
      search: "",
      type: "all",
      category: "all",
      dateFrom: "", 
      dateTo: "",
      sortBy: "date",
      sortOrder: "desc",
    },
  },
  reducers: {
    addTransaction: (state, action) => {
      const newTxn = {
        ...action.payload,
        id: `t${Date.now()}`,
        date: action.payload.date || dayjs().format("YYYY-MM-DD"),
      };
      state.items.unshift(newTxn);
      saveToStorage(state.items);
    },
    updateTransaction: (state, action) => {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
        saveToStorage(state.items);
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveToStorage(state.items);
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        type: "all",
        category: "all",
        dateFrom: "",
        dateTo: "",
        sortBy: "date",
        sortOrder: "desc",
      };
    },
    resetToMockData: (state) => {
      state.items = INITIAL_TRANSACTIONS;
      saveToStorage(INITIAL_TRANSACTIONS);
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  clearFilters,
  resetToMockData,
} = transactionsSlice.actions;

export const selectFilteredTransactions = (state) => {
  const { items, filters } = state.transactions;
  let result = [...items];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }
  if (filters.type !== "all") result = result.filter((t) => t.type === filters.type);
  if (filters.category !== "all") result = result.filter((t) => t.category === filters.category);
  if (filters.dateFrom) result = result.filter((t) => dayjs(t.date).isAfter(dayjs(filters.dateFrom).subtract(1, "day")));
  if (filters.dateTo) result = result.filter((t) => dayjs(t.date).isBefore(dayjs(filters.dateTo).add(1, "day")));

  result.sort((a, b) => {
    let av = a[filters.sortBy], bv = b[filters.sortBy];
    if (filters.sortBy === "date") { av = dayjs(av).valueOf(); bv = dayjs(bv).valueOf(); }
    if (filters.sortBy === "amount") { av = Number(av); bv = Number(bv); }
    if (av < bv) return filters.sortOrder === "asc" ? -1 : 1;
    if (av > bv) return filters.sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return result;
};

export const selectSummary = (state) => {
  const items = state.transactions.items;
  const totalIncome = items.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = items.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const now = dayjs();
  const thisMonth = items.filter((t) => dayjs(t.date).month() === now.month() && dayjs(t.date).year() === now.year());
  const monthIncome = thisMonth.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const monthExpenses = thisMonth.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
    monthIncome,
    monthExpenses,
    monthBalance: monthIncome - monthExpenses,
    transactionCount: items.length,
  };
};

export default transactionsSlice.reducer;
