import { Bell, Code2, LogOut, Menu, Search, UserCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useApp, useLogout } from "../context/AppContext";

export const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];

export function getInitials(name) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

export function Avatar({ name }) {
  return <div className="profile-avatar" aria-label={`${name} avatar`}>{getInitials(name)}</div>;
}

export function Badge({ children, tone = "neutral" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function StatCard({ label, value, sub }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {sub && <small>{sub}</small>}
    </div>
  );
}

export function DataTable({ columns, rows, empty = "No results found." }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={columns.length}>{empty}</td></tr>}
          {rows.map((row) => (
            <tr key={row.id || row.rank || `${row.user}-${row.problem}`}>
              {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Toolbar({ search, setSearch, children, placeholder = "Search" }) {
  return (
    <div className="toolbar">
      <label className="search-field">
        <Search size={17} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={placeholder} />
      </label>
      {children}
    </div>
  );
}

export function TopNav({ admin = false, onMenu }) {
  const { notifications, profile } = useApp();
  const navigate = useNavigate();
  const logout = useLogout();
  const unread = notifications.filter((item) => !item.read).length;
  return (
    <header className="top-nav">
      <button className="icon-button menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
      <button className="brand" onClick={() => navigate(admin ? "/admin/dashboard" : "/dashboard")}>
        <Code2 size={25} />
        <span>CodeForge</span>
      </button>
      <label className="nav-search">
        <Search size={17} />
        <input placeholder={admin ? "Search admin workspace" : "Search problems"} onKeyDown={(event) => {
          if (event.key === "Enter" && !admin) navigate(`/problems?q=${encodeURIComponent(event.currentTarget.value)}`);
        }} />
      </label>
      <button className="icon-button notification-dot" onClick={() => navigate(admin ? "/admin/settings" : "/notifications")} aria-label="Notifications">
        <Bell size={20} />
        {unread > 0 && <span>{unread}</span>}
      </button>
      <button className="profile-chip" onClick={() => navigate(admin ? "/admin/settings" : "/profile")}>
        <UserCircle size={20} />
        {admin ? "Admin Profile" : profile.username}
      </button>
      <button className="logout-button" onClick={logout}><LogOut size={17} />Logout</button>
    </header>
  );
}

export function Sidebar({ items, open, setOpen }) {
  const logout = useLogout();
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <nav>
          {items.map((item) => item.logout ? (
            <button key={item.label} className="side-link" onClick={logout}>{item.icon}<span>{item.label}</span></button>
          ) : (
            <NavLink key={item.label} to={item.to} className="side-link" onClick={() => setOpen(false)}>
              {item.icon}<span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      {open && <button className="scrim" onClick={() => setOpen(false)} aria-label="Close navigation" />}
    </>
  );
}

export function DonutChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={86} paddingAngle={3}>
          {data.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function Section({ title, children, action }) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-head"><h2 id="modal-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close preview">×</button></div>
        {children}
      </section>
    </div>
  );
}

export function Heatmap({ data }) {
  const heatLevel = (count) => count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
  const formatDate = (date) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${date}T00:00:00`));
  return (
    <>
      <div className="heatmap" aria-label="Coding activity heatmap">
        {data.map((day) => {
          const formattedDate = formatDate(day.date);
          const label = `${formattedDate} — ${day.count} ${day.count === 1 ? "problem" : "problems"} solved`;
          return <span key={day.date} title={label} aria-label={label} className={`heat level-${heatLevel(day.count)}`} />;
        })}
      </div>
      <div className="heatmap-legend" aria-label="Heatmap intensity legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => <i key={level} className={`heat level-${level}`} aria-hidden="true" />)}
        <span>More</span>
      </div>
    </>
  );
}

export function ProgressRows({ rows }) {
  return (
    <div className="progress-list">
      {rows.map((row) => (
        <div className="progress-row" key={row.name}>
          <div><strong>{row.name}</strong><span>{row.solved}/{row.total}</span></div>
          <div className="bar"><i style={{ width: `${Math.round((row.solved / row.total) * 100)}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
