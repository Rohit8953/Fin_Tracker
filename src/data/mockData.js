import dayjs from "dayjs";

export const CATEGORIES = [
  { id: "food", label: "Food & Dining", color: "#F59E0B", icon: "🍽️" },
  { id: "transport", label: "Transport", color: "#3B82F6", icon: "🚗" },
  { id: "shopping", label: "Shopping", color: "#EC4899", icon: "🛍️" },
  { id: "entertainment", label: "Entertainment", color: "#8B5CF6", icon: "🎬" },
  { id: "utilities", label: "Utilities", color: "#10B981", icon: "⚡" },
  { id: "health", label: "Health", color: "#EF4444", icon: "🏥" },
  { id: "salary", label: "Salary", color: "#22C55E", icon: "💼" },
  { id: "freelance", label: "Freelance", color: "#06B6D4", icon: "💻" },
  { id: "investment", label: "Investment", color: "#D97706", icon: "📈" },
  { id: "other", label: "Other", color: "#6B7280", icon: "💡" },
];

export const generateTransactions = () => {
  const now = dayjs();
  const txns = [
    // January
    { id: "t1", date: now.subtract(3, "month").date(2).format("YYYY-MM-DD"), description: "Monthly Salary", amount: 85000, category: "salary", type: "income" },
    { id: "t2", date: now.subtract(3, "month").date(5).format("YYYY-MM-DD"), description: "Netflix Subscription", amount: 649, category: "entertainment", type: "expense" },
    { id: "t3", date: now.subtract(3, "month").date(7).format("YYYY-MM-DD"), description: "Grocery Store", amount: 3200, category: "food", type: "expense" },
    { id: "t4", date: now.subtract(3, "month").date(10).format("YYYY-MM-DD"), description: "Electricity Bill", amount: 1800, category: "utilities", type: "expense" },
    { id: "t5", date: now.subtract(3, "month").date(12).format("YYYY-MM-DD"), description: "Freelance Project", amount: 25000, category: "freelance", type: "income" },
    { id: "t6", date: now.subtract(3, "month").date(15).format("YYYY-MM-DD"), description: "Restaurant Dinner", amount: 1450, category: "food", type: "expense" },
    { id: "t7", date: now.subtract(3, "month").date(18).format("YYYY-MM-DD"), description: "Uber Rides", amount: 890, category: "transport", type: "expense" },
    { id: "t8", date: now.subtract(3, "month").date(20).format("YYYY-MM-DD"), description: "Amazon Shopping", amount: 5600, category: "shopping", type: "expense" },
    { id: "t9", date: now.subtract(3, "month").date(22).format("YYYY-MM-DD"), description: "Doctor Visit", amount: 2000, category: "health", type: "expense" },
    { id: "t10", date: now.subtract(3, "month").date(25).format("YYYY-MM-DD"), description: "Mutual Funds", amount: 10000, category: "investment", type: "expense" },

    // February
    { id: "t11", date: now.subtract(2, "month").date(1).format("YYYY-MM-DD"), description: "Monthly Salary", amount: 85000, category: "salary", type: "income" },
    { id: "t12", date: now.subtract(2, "month").date(3).format("YYYY-MM-DD"), description: "Swiggy Orders", amount: 2800, category: "food", type: "expense" },
    { id: "t13", date: now.subtract(2, "month").date(6).format("YYYY-MM-DD"), description: "Petrol", amount: 3500, category: "transport", type: "expense" },
    { id: "t14", date: now.subtract(2, "month").date(9).format("YYYY-MM-DD"), description: "Spotify Premium", amount: 119, category: "entertainment", type: "expense" },
    { id: "t15", date: now.subtract(2, "month").date(12).format("YYYY-MM-DD"), description: "Freelance Design", amount: 18000, category: "freelance", type: "income" },
    { id: "t16", date: now.subtract(2, "month").date(14).format("YYYY-MM-DD"), description: "Valentine's Dinner", amount: 4200, category: "food", type: "expense" },
    { id: "t17", date: now.subtract(2, "month").date(17).format("YYYY-MM-DD"), description: "Internet Bill", amount: 999, category: "utilities", type: "expense" },
    { id: "t18", date: now.subtract(2, "month").date(20).format("YYYY-MM-DD"), description: "Clothes Shopping", amount: 7800, category: "shopping", type: "expense" },
    { id: "t19", date: now.subtract(2, "month").date(23).format("YYYY-MM-DD"), description: "Gym Membership", amount: 1500, category: "health", type: "expense" },
    { id: "t20", date: now.subtract(2, "month").date(26).format("YYYY-MM-DD"), description: "Stock Purchase", amount: 15000, category: "investment", type: "expense" },
    { id: "t21", date: now.subtract(2, "month").date(28).format("YYYY-MM-DD"), description: "Dividend Income", amount: 3200, category: "investment", type: "income" },

    // March
    { id: "t22", date: now.subtract(1, "month").date(1).format("YYYY-MM-DD"), description: "Monthly Salary", amount: 90000, category: "salary", type: "income" },
    { id: "t23", date: now.subtract(1, "month").date(4).format("YYYY-MM-DD"), description: "Grocery Store", amount: 4100, category: "food", type: "expense" },
    { id: "t24", date: now.subtract(1, "month").date(7).format("YYYY-MM-DD"), description: "Metro Card Recharge", amount: 500, category: "transport", type: "expense" },
    { id: "t25", date: now.subtract(1, "month").date(10).format("YYYY-MM-DD"), description: "Movie Tickets", amount: 850, category: "entertainment", type: "expense" },
    { id: "t26", date: now.subtract(1, "month").date(13).format("YYYY-MM-DD"), description: "Water Bill", amount: 450, category: "utilities", type: "expense" },
    { id: "t27", date: now.subtract(1, "month").date(15).format("YYYY-MM-DD"), description: "Freelance Consulting", amount: 30000, category: "freelance", type: "income" },
    { id: "t28", date: now.subtract(1, "month").date(18).format("YYYY-MM-DD"), description: "Pharmacy", amount: 1200, category: "health", type: "expense" },
    { id: "t29", date: now.subtract(1, "month").date(20).format("YYYY-MM-DD"), description: "Electronics Shopping", amount: 12000, category: "shopping", type: "expense" },
    { id: "t30", date: now.subtract(1, "month").date(23).format("YYYY-MM-DD"), description: "SIP Investment", amount: 5000, category: "investment", type: "expense" },
    { id: "t31", date: now.subtract(1, "month").date(26).format("YYYY-MM-DD"), description: "Zomato Orders", amount: 2100, category: "food", type: "expense" },
    { id: "t32", date: now.subtract(1, "month").date(28).format("YYYY-MM-DD"), description: "Cab Rides", amount: 1500, category: "transport", type: "expense" },

    // April (current month)
    { id: "t33", date: now.date(1).format("YYYY-MM-DD"), description: "Monthly Salary", amount: 90000, category: "salary", type: "income" },
    { id: "t34", date: now.date(2).format("YYYY-MM-DD"), description: "Grocery Shopping", amount: 3800, category: "food", type: "expense" },
    { id: "t35", date: now.date(3).format("YYYY-MM-DD"), description: "Bus Pass", amount: 300, category: "transport", type: "expense" },
    { id: "t36", date: now.date(4).format("YYYY-MM-DD"), description: "OTT Bundle", amount: 999, category: "entertainment", type: "expense" },
  ];

  return txns.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
};

export const INITIAL_TRANSACTIONS = generateTransactions();

export const getMonthlyData = (transactions) => {
  const monthMap = {};
  transactions.forEach((t) => {
    const month = dayjs(t.date).format("MMM YY");
    if (!monthMap[month]) monthMap[month] = { month, income: 0, expenses: 0, balance: 0 };
    if (t.type === "income") monthMap[month].income += t.amount;
    else monthMap[month].expenses += t.amount;
  });
  return Object.values(monthMap)
    .map((m) => ({ ...m, balance: m.income - m.expenses }))
    .reverse();
};

export const getCategoryBreakdown = (transactions) => {
  const catMap = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!catMap[t.category]) catMap[t.category] = 0;
      catMap[t.category] += t.amount;
    });
  return Object.entries(catMap)
    .map(([id, value]) => {
      const cat = CATEGORIES.find((c) => c.id === id);
      return { id, label: cat?.label || id, value, color: cat?.color || "#999", icon: cat?.icon || "💡" };
    })
    .sort((a, b) => b.value - a.value);
};
