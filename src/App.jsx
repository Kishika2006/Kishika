import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { Login, Register, UserDashboard, ProblemsPage, ProblemDetail, SubmissionsPage, ProgressPage, LeaderboardPage, ProfilePage, NotificationsPage, SettingsPage } from "./pages/UserPages";
import { AdminAnalytics, AdminDashboard, AdminEditorials, AdminLeaderboards, AdminProblems, AdminSubmissions, AdminTestCases, AdminUsers } from "./pages/AdminPages";
import { CertificatePage, VerifyCertificatePage } from "./pages/Certificates";
import { ArenaPage, ChallengeVaultPage, CredentialsPage, SkillTracksPage, AdminCommandCenterPage } from "./pages/CodeForgeExtras";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/challenge-vault" element={<ChallengeVaultPage />} />
        <Route path="/skill-tracks" element={<SkillTracksPage />} />
        <Route path="/credentials" element={<CredentialsPage />} />
        <Route path="/arenas" element={<ArenaPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
      </Route>
      <Route path="/verify/:certificateId" element={<VerifyCertificatePage />} />
      <Route element={<AppLayout admin />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/problems" element={<AdminProblems />} />
        <Route path="/admin/test-cases" element={<AdminTestCases />} />
        <Route path="/admin/submissions" element={<AdminSubmissions />} />
        <Route path="/admin/leaderboards" element={<AdminLeaderboards />} />
        <Route path="/admin/editorials" element={<AdminEditorials />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/command-center" element={<AdminCommandCenterPage />} />
        <Route path="/admin/settings" element={<SettingsPage admin />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
