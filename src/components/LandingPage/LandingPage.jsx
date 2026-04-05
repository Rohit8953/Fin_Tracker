
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  // ---------- Reset & Root ----------
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#0A0F1E",
    color: "#F8FAFC",
    overflowX: "hidden",
    lineHeight: 1.6,
    minHeight: "100vh",
  },

  // ---------- Navbar ----------
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    height: 68,
    background: "rgba(10,15,30,0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  navLogoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "linear-gradient(135deg,#F59E0B,#D97706)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 18,
    color: "#0F172A",
    boxShadow: "0 4px 12px rgba(245,158,11,0.35)",
    flexShrink: 0,
  },
  navLogoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#F8FAFC",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 32,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  // ---------- Hero ----------
  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px 5% 60px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 18px",
    borderRadius: 50,
    background: "rgba(245,158,11,0.1)",
    border: "1px solid rgba(245,158,11,0.25)",
    color: "#F59E0B",
    fontSize: "0.78rem",
    fontWeight: 600,
    marginBottom: 28,
    letterSpacing: "0.5px",
  },
  heroH1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
    fontWeight: 700,
    lineHeight: 1.15,
    maxWidth: 780,
    marginBottom: 24,
    color: "#F8FAFC",
  },
  heroHighlight: {
    background: "linear-gradient(135deg, #F59E0B, #FCD34D)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroP: {
    color: "#94A3B8",
    fontSize: "1.1rem",
    maxWidth: 540,
    marginBottom: 40,
    fontWeight: 400,
  },
  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 64,
  },

  // ---------- Stats Strip ----------
  stats: {
    background: "#1E293B",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "28px 5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 24,
  },
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2rem",
    fontWeight: 700,
    background: "linear-gradient(135deg,#F59E0B,#FCD34D)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  // ---------- Sections ----------
  section: {
    padding: "80px 5%",
  },
  sectionAlt: {
    padding: "80px 5%",
    background: "#0F172A",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  sectionLabel: {
    display: "inline-block",
    padding: "5px 14px",
    borderRadius: 50,
    background: "rgba(245,158,11,0.1)",
    border: "1px solid rgba(245,158,11,0.2)",
    color: "#F59E0B",
    fontSize: "0.75rem",
    fontWeight: 600,
    marginBottom: 16,
    letterSpacing: "0.5px",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
    fontWeight: 700,
    marginBottom: 12,
    maxWidth: 540,
    color: "#F8FAFC",
  },
  sectionSub: {
    color: "#94A3B8",
    fontSize: "1rem",
    maxWidth: 500,
    marginBottom: 52,
  },

  // ---------- Feature Cards ----------
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },

  // ---------- How It Works ----------
  howGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    alignItems: "center",
  },
  steps: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    maxWidth: 640,
  },
  stepNum: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "rgba(245,158,11,0.12)",
    border: "1px solid rgba(245,158,11,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#F59E0B",
    flexShrink: 0,
  },

  // ---------- CTA ----------
  ctaSection: {
    margin: "0 5% 80px",
    background: "linear-gradient(135deg,#1E293B,#0F172A)",
    border: "1px solid rgba(245,158,11,0.15)",
    borderRadius: 24,
    padding: "64px 5%",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  // ---------- Footer ----------
  footer: {
    background: "#0F172A",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "40px 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
  },
};

// ─── Reusable Button Components ────────────────────────────────────────────────

function BtnGold({ children, style = {}, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "8px 20px",
        border: "none",
        borderRadius: 8,
        background: "linear-gradient(135deg,#F59E0B,#D97706)",
        color: "#0F172A",
        fontSize: "0.85rem",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
        boxShadow: hovered
          ? "0 6px 20px rgba(245,158,11,0.5)"
          : "0 4px 12px rgba(245,158,11,0.3)",
        transform: hovered ? "translateY(-1px)" : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function BtnGhost({ children, style = {}, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "7px 18px",
        border: hovered
          ? "1px solid #F59E0B"
          : "1px solid rgba(255,255,255,0.15)",
        borderRadius: 8,
        background: "transparent",
        color: hovered ? "#F59E0B" : "#CBD5E1",
        fontSize: "0.85rem",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function BtnPrimary({ children, style = {}, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 32px",
        border: "none",
        borderRadius: 10,
        background: "linear-gradient(135deg,#F59E0B,#D97706)",
        color: "#0F172A",
        fontSize: "1rem",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
        boxShadow: hovered
          ? "0 10px 30px rgba(245,158,11,0.5)"
          : "0 6px 20px rgba(245,158,11,0.35)",
        transform: hovered ? "translateY(-2px)" : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function BtnOutline({ children, style = {}, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "13px 32px",
        border: hovered
          ? "1px solid rgba(255,255,255,0.35)"
          : "1px solid rgba(255,255,255,0.2)",
        borderRadius: 10,
        background: hovered ? "rgba(255,255,255,0.06)" : "transparent",
        color: "#F8FAFC",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── Feature Card ──────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, desc, iconBg, accentColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#1E293B",
        border: hovered
          ? `1px solid ${accentColor}40`
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: 28,
        transition: "all 0.25s",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.35)" : "none",
        cursor: "default",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      />
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
          fontSize: 20,
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8, color: "#F8FAFC" }}>
        {title}
      </div>
      <div style={{ color: "#94A3B8", fontSize: "0.88rem", lineHeight: 1.7 }}>
        {desc}
      </div>
    </div>
  );
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div style={{ width: "100%", maxWidth: 900, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          background: "#111827",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Browser Bar */}
        <div
          style={{
            background: "#0F172A",
            height: 40,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 7,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
          <div
            style={{
              flex: 1,
              height: 20,
              background: "#1E293B",
              borderRadius: 4,
              marginLeft: 10,
              maxWidth: 180,
            }}
          />
        </div>

        {/* Body */}
        <div style={{ display: "flex", height: 300 }}>
          {/* Sidebar */}
          <div
            style={{
              width: 180,
              background: "#0F172A",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              padding: "14px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#F59E0B,#D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0F172A" }}>₹</div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#F8FAFC" }}>FinTrack</span>
            </div>
            {[
              { label: "Dashboard", active: true },
              { label: "Transactions", active: false },
              { label: "Insights", active: false },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "7px 10px", borderRadius: 8,
                  fontSize: "0.72rem",
                  background: item.active ? "rgba(245,158,11,0.12)" : "transparent",
                  color: item.active ? "#F59E0B" : "#64748B",
                  border: item.active ? "1px solid rgba(245,158,11,0.2)" : "1px solid transparent",
                }}
              >
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "currentColor", opacity: 0.7 }} />
                {item.label}
              </div>
            ))}
            <div style={{ marginTop: "auto", padding: "8px 10px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "0.62rem", color: "#94A3B8", fontWeight: 600 }}>Admin User</div>
              <div style={{ fontSize: "0.6rem", color: "#F59E0B", marginTop: 2 }}>● Admin Role</div>
            </div>
          </div>

          {/* Main */}
          <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", fontWeight: 700, color: "#F8FAFC" }}>Dashboard</span>
              <span style={{ padding: "3px 9px", borderRadius: 5, background: "rgba(245,158,11,0.12)", color: "#F59E0B", fontSize: "0.62rem", fontWeight: 700, border: "1px solid rgba(245,158,11,0.25)" }}>Admin</span>
            </div>

            {/* Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {[
                { label: "Balance", val: "₹2.1L", color: "#F59E0B" },
                { label: "Income", val: "₹3.5L", color: "#10B981" },
                { label: "Expenses", val: "₹1.4L", color: "#EF4444" },
                { label: "This Month", val: "₹84K", color: "#06B6D4" },
              ].map((c) => (
                <div key={c.label} style={{ borderRadius: 10, background: "#1E293B", padding: "9px 10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "0.6rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.label}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 700, marginTop: 2, color: c.color }}>{c.val}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 8, flex: 1 }}>
              {/* Bar chart */}
              <div style={{ background: "#1E293B", borderRadius: 10, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div style={{ fontSize: "0.62rem", color: "#64748B", fontWeight: 600, marginBottom: 6 }}>Monthly Overview</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 54 }}>
                  {[[28, 18], [34, 22], [42, 26], [44, 18]].map(([inc, exp], i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: 1 }}>
                      <div style={{ height: inc, background: "#10B981", borderRadius: "3px 3px 0 0", width: "100%", opacity: i < 3 ? 0.75 : 1 }} />
                      <div style={{ height: exp, background: "#EF4444", borderRadius: "3px 3px 0 0", width: "100%", opacity: i < 3 ? 0.75 : 1 }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Donut */}
              <div style={{ background: "#1E293B", borderRadius: 10, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "0.62rem", color: "#64748B", fontWeight: 600, marginBottom: 6 }}>Spending</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, height: 54 }}>
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="18" fill="none" stroke="#1E293B" strokeWidth="10" />
                    <circle cx="26" cy="26" r="18" fill="none" stroke="#F59E0B" strokeWidth="10" strokeDasharray="45 113" strokeDashoffset="28" transform="rotate(-90 26 26)" />
                    <circle cx="26" cy="26" r="18" fill="none" stroke="#EF4444" strokeWidth="10" strokeDasharray="28 113" strokeDashoffset="-17" transform="rotate(-90 26 26)" />
                    <circle cx="26" cy="26" r="18" fill="none" stroke="#06B6D4" strokeWidth="10" strokeDasharray="22 113" strokeDashoffset="-45" transform="rotate(-90 26 26)" />
                    <circle cx="26" cy="26" r="18" fill="none" stroke="#8B5CF6" strokeWidth="10" strokeDasharray="18 113" strokeDashoffset="-67" transform="rotate(-90 26 26)" />
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {[["#F59E0B", "Food"], ["#EF4444", "Health"], ["#06B6D4", "Transport"], ["#8B5CF6", "Fun"]].map(([color, label]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.58rem", color: "#94A3B8" }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "📊",
    title: "Smart Dashboard",
    desc: "See your balance, income, and expenses at a glance with beautiful summary cards and live trend charts.",
    iconBg: "rgba(245,158,11,0.12)",
    accentColor: "#F59E0B",
  },
  {
    icon: "📈",
    title: "Visual Analytics",
    desc: "Interactive area charts and donut charts reveal spending patterns across months and categories.",
    iconBg: "rgba(16,185,129,0.12)",
    accentColor: "#10B981",
  },
  {
    icon: "🔍",
    title: "Transaction Explorer",
    desc: "Search, filter by type, category or date range, sort, and paginate through all transactions with ease.",
    iconBg: "rgba(6,182,212,0.12)",
    accentColor: "#06B6D4",
  },
  {
    icon: "🔐",
    title: "Role-Based Access",
    desc: "Switch between Admin (full CRUD) and Viewer (read-only) modes instantly with the role dropdown.",
    iconBg: "rgba(139,92,246,0.12)",
    accentColor: "#8B5CF6",
  },
  {
    icon: "💡",
    title: "Intelligent Insights",
    desc: "Auto-surfaces savings rate, top spending category, expense ratio, and month-over-month comparisons.",
    iconBg: "rgba(239,68,68,0.12)",
    accentColor: "#EF4444",
  },
  {
    icon: "📤",
    title: "Export & Persist",
    desc: "Export filtered data as CSV or JSON. All data is persisted via localStorage — no login required.",
    iconBg: "rgba(217,119,6,0.12)",
    accentColor: "#D97706",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Clone & Install",
    desc: (
      <>
        Run <code style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", padding: "2px 7px", borderRadius: 5, fontSize: "0.85rem" }}>npm install</code> to pull in React, MUI, Redux, and Recharts — all pre-configured.
      </>
    ),
  },
  {
    num: "2",
    title: "Load Your Data",
    desc: "Start with 36 realistic mock transactions or add your own via the Admin modal. Changes persist automatically.",
  },
  {
    num: "3",
    title: "Explore & Analyze",
    desc: "Navigate between Dashboard, Transactions, and Insights to discover spending patterns and track your goals.",
  },
  {
    num: "4",
    title: "Share or Export",
    desc: "Switch to Viewer mode to share safely, or export your filtered transactions as CSV or JSON with one click.",
  },
];

const STATS = [
  { num: "36+", label: "Transactions tracked" },
  { num: "10", label: "Spending categories" },
  { num: "4", label: "Months of data" },
  { num: "2", label: "Access roles" },
  { num: "100%", label: "Local & private" },
];

export default function LandingPage({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick=()=>{
      navigate("/dashboard");
  }

  return (
    <div style={styles.root}>
      {/* ── Google Fonts ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
        rel="stylesheet"
      />

      {/* ───────────── NAVBAR ───────────── */}
      <nav
        style={{
          ...styles.nav,
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <a href="#" style={styles.navLogo}>
          <div style={styles.navLogoIcon}>₹</div>
          <span style={styles.navLogoText}>FinTrack</span>
        </a>

        {/* <ul style={styles.navLinks}>
          {[
            { label: "Features", id: "features" },
            { label: "How it works", id: "how" },
            { label: "Insights", id: "insights" },
          ].map((item) => (
            <li key={item.id}>
              <span
                onClick={() => scrollTo(item.id)}
                style={{
                  textDecoration: "none",
                  color: "#94A3B8",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#F59E0B")}
                onMouseLeave={(e) => (e.target.style.color = "#94A3B8")}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul> */}

        <BtnGhost 
        onClick={handleClick}
        >Dashboard</BtnGhost>

        <div style={styles.navActions}>
          <BtnGhost onClick={()=>navigate('/login')}>Log in</BtnGhost>
          <BtnGold onClick={onGetStarted}>Get Started →</BtnGold>
        </div>
      </nav>

      {/* ───────────── HERO ───────────── */}
      <section style={styles.hero}>
        {/* Background orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)", top: -100, right: -100, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)", bottom: 50, left: -80, pointerEvents: "none" }} />

        {/* <div style={styles.heroBadge}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", boxShadow: "0 0 8px rgba(245,158,11,0.8)" }} />
          Personal Finance, Reimagined
        </div> */}

        <h1 style={styles.heroH1}>
          Take Control of Your<br />
          <span style={styles.heroHighlight}>Financial Future</span>
        </h1>

        <p style={styles.heroP}>
          Lorem ipsum dolor sit amet consectetur adipisicing suscipit cupiditate architecto laborum reprehenderit dolorum illum est. Harum modi enim est autem ipsam, id omnis!
        </p>

        <div style={styles.heroActions}>
          <BtnPrimary onClick={handleClick}>Start Tracking Free →</BtnPrimary>
        </div>

        <DashboardMockup />
      </section>

      {/* ───────────── STATS ───────────── */}
      <div style={styles.stats}>
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={styles.statNum}>{s.num}</div>
            <div style={{ color: "#94A3B8", fontSize: "0.82rem", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ───────────── FEATURES ───────────── */}
      <section style={styles.section} id="features">
        <div style={styles.sectionLabel}>✦ Core Features</div>
        <h2 style={styles.sectionTitle}>Everything you need to master your money</h2>
        <p style={styles.sectionSub}>
          Six powerful modules built with clarity in mind — giving you complete control over your financial life.
        </p>
        <div style={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section style={styles.ctaSection}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 250, background: "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, marginBottom: 16, position: "relative" }}>
          Ready to take charge of your finances?
        </h2>
        <p style={{ color: "#94A3B8", maxWidth: 480, margin: "0 auto 36px", position: "relative" }}>
          Clone the repo, run npm install, and have a fully working finance dashboard in under two minutes.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", position: "relative" }}>
          <BtnPrimary onClick={handleClick}>Open Dashboard →</BtnPrimary>
          <BtnOutline>View on GitHub</BtnOutline>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer style={styles.footer}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ ...styles.navLogoIcon, width: 30, height: 30, fontSize: 14, borderRadius: 8 }}>₹</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#F8FAFC" }}>FinTrack</span>
          <span style={{ color: "#64748B", fontSize: "0.8rem", marginLeft: 16 }}>© 2025 Personal Finance Dashboard By Rohit</span>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[
            { label: "React 18", bg: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "rgba(245,158,11,0.2)" },
            { label: "MUI v5", bg: "rgba(6,182,212,0.1)", color: "#06B6D4", border: "rgba(6,182,212,0.2)" },
            { label: "Redux", bg: "rgba(139,92,246,0.1)", color: "#8B5CF6", border: "rgba(139,92,246,0.2)" },
          ].map((tag) => (
            <span key={tag.label} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 50, fontSize: "0.72rem", fontWeight: 600, background: tag.bg, color: tag.color, border: `1px solid ${tag.border}` }}>
              {tag.label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
