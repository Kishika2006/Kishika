import { useState } from "react";
import { Award, BarChart3, Bell, BookOpen, FileCode2, LayoutDashboard, LogOut, Settings, Shield, TestTube2, Users, User, Lightbulb, ClipboardList, BadgeCheck, Trophy, TimerReset, BriefcaseBusiness } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Sidebar, TopNav } from "../components/UI";

const userItems = [
  { label: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={19} /> },
  { label: "Challenge Vault", to: "/challenge-vault", icon: <BookOpen size={19} /> },
  { label: "Problems", to: "/problems", icon: <BookOpen size={19} /> },
  { label: "My Submissions", to: "/submissions", icon: <FileCode2 size={19} /> },
  { label: "Skill Velocity", to: "/skill-tracks", icon: <BarChart3 size={19} /> },
  { label: "Global Matrix", to: "/leaderboard", icon: <Award size={19} /> },
  { label: "Master Credentials", to: "/credentials", icon: <BadgeCheck size={19} /> },
  { label: "Timed Code Arenas", to: "/arenas", icon: <TimerReset size={19} /> },
  { label: "Developer Profile", to: "/profile", icon: <User size={19} /> },
  { label: "Certificates", to: "/certificate", icon: <Shield size={19} /> },
  { label: "System Preferences", to: "/settings", icon: <Settings size={19} /> },
  { label: "Logout", logout: true, icon: <LogOut size={19} /> }
];

const adminItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard size={19} /> },
  { label: "Candidate Roster", to: "/admin/users", icon: <Users size={19} /> },
  { label: "Challenge Vault", to: "/admin/problems", icon: <BookOpen size={19} /> },
  { label: "Test Vector Studio", to: "/admin/test-cases", icon: <TestTube2 size={19} /> },
  { label: "Global Submissions Audit", to: "/admin/submissions", icon: <FileCode2 size={19} /> },
  { label: "Matrix Leaderboards", to: "/admin/leaderboards", icon: <Award size={19} /> },
  { label: "Hint & Editorial CMS", to: "/admin/editorials", icon: <Lightbulb size={19} /> },
  { label: "Platform Health Analytics", to: "/admin/analytics", icon: <ClipboardList size={19} /> },
  { label: "Admin Command Center", to: "/admin/command-center", icon: <BriefcaseBusiness size={19} /> },
  { label: "System Preferences", to: "/admin/settings", icon: <Settings size={19} /> },
  { label: "Logout", logout: true, icon: <LogOut size={19} /> }
];

export function AppLayout({ admin = false }) {
  const { auth } = useApp();
  const [open, setOpen] = useState(false);
  if (!auth.loggedIn) return <Navigate to="/login" replace />;
  if (admin && auth.role !== "Admin") return <Navigate to="/dashboard" replace />;
  return (
    <div className="app-shell">
      <TopNav admin={admin} onMenu={() => setOpen(true)} />
      <Sidebar items={admin ? adminItems : userItems} open={open} setOpen={setOpen} />
      <main className="main-panel">
        <Outlet />
      </main>
    </div>
  );
}
