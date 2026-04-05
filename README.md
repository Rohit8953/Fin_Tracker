# 💰 FinTrack – Personal Finance Dashboard

A clean, interactive finance dashboard built with **React**, **Material UI**, and **Redux Toolkit**.

---

## 📸 Features

- **Dashboard Overview** — Summary cards, balance trend area chart, spending donut chart, recent transactions
- **Transactions Table** — Search, filter (type/category/date), sort, paginate, export CSV/JSON
- **Insights Page** — Savings rate, top category, monthly comparison bar chart, category analysis
- **Role-Based UI** — Admin (add/edit/delete) vs Viewer (read-only), toggle via dropdown
- **Dark / Light Mode** — Toggle with persistence via localStorage
- **Data Persistence** — Transactions and role saved to localStorage across sessions
- **Export** — Download filtered data as CSV or JSON
- **Responsive** — Mobile-first, collapsible sidebar, works on all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Component Library | Material UI v5 |
| State Management | Redux Toolkit |
| Charts | Recharts |
| Date Handling | Day.js |
| Styling | MUI Theme + Emotion |
| Fonts | Playfair Display + DM Sans |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx         # Collapsible sidebar with navigation
│   │   └── TopBar.jsx          # App bar with role switcher & dark mode
│   ├── Dashboard/
│   │   ├── index.jsx           # Dashboard page layout
│   │   ├── SummaryCards.jsx    # 4 KPI summary cards
│   │   ├── BalanceTrend.jsx    # Area chart: income/expense/balance
│   │   ├── SpendingBreakdown.jsx # Interactive donut pie chart
│   │   └── RecentTransactions.jsx # Latest 6 transactions
│   ├── Transactions/
│   │   ├── index.jsx           # Full transactions page with table
│   │   └── TransactionModal.jsx # Add/Edit transaction dialog
│   └── Insights/
│       └── index.jsx           # Insights & analytics page
├── store/
│   ├── index.js                # Redux store configuration
│   ├── transactionsSlice.js    # Transactions state, CRUD, filters
│   └── uiSlice.js              # UI state: role, dark mode, tab, modal
├── data/
│   └── mockData.js             # 36 mock transactions, category config
├── utils/
│   └── format.js               # Currency formatter, CSV/JSON export
├── theme.js                    # MUI theme (dark + light)
├── App.jsx                     # Root component, layout, routing
└── index.js                    # React entry point
```

---

## 🔐 Role-Based UI

Switch roles using the dropdown in the top bar:

| Feature | Admin | Viewer |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Export data | ✅ | ✅ |

---

## 📊 State Management

Redux Toolkit is used with two slices:

**`transactionsSlice`**
- `items` — all transactions (loaded from localStorage)
- `filters` — search, type, category, dateFrom, dateTo, sortBy, sortOrder
- Selectors: `selectFilteredTransactions`, `selectSummary`
- Persists to `localStorage` on every mutation

**`uiSlice`**
- `role` — "admin" | "viewer" (persisted)
- `darkMode` — boolean (persisted)
- `activeTab` — "dashboard" | "transactions" | "insights"
- `sidebarOpen` — boolean
- `modalOpen` + `editingTransaction` — modal state
- `snackbar` — global notification

---

## 🎨 Design Decisions

- **Aesthetic**: Refined financial theme — deep navy sidebar, amber/gold accents, white cards
- **Typography**: Playfair Display (headings) + DM Sans (body) for a premium feel
- **Charts**: Recharts for lightweight, composable SVG charts
- **Responsiveness**: MUI Grid + `useMediaQuery` for adaptive layouts
- **Empty States**: Graceful handling when no transactions match filters

---

## 📦 Optional Enhancements Included

- ✅ Dark mode
- ✅ Data persistence (localStorage)
- ✅ Export functionality (CSV + JSON)
- ✅ Advanced filtering (multi-field) and sorting
- ✅ Role-based UI simulation

---

## 📝 Assumptions

- Currency is Indian Rupees (₹)
- Mock data covers 4 months of realistic transactions
- No backend required — all state is in-memory + localStorage
- Roles are simulated on the frontend only
