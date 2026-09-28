import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { problemsSeed } from "../data/problems";
import { usersSeed } from "../data/users";
import { submissionsSeed } from "../data/submissions";
import { notificationsSeed } from "../data/notifications";
import { testCasesSeed } from "../data/testCases";
import { editorialsSeed } from "../data/editorials";
import { loadStored, nowDate, saveStored } from "../utils/storage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [auth, setAuthState] = useState(() => loadStored("cf_auth", { loggedIn: false, role: "Admin", username: "kishika" }));
  const [profile, setProfileState] = useState(() => loadStored("cf_profile", {
    username: "kishika",
    email: "kishika@codeforge.dev",
    rank: 1,
    solved: 312,
    acceptance: 99,
    streak: 46,
    languages: ["JavaScript", "Python", "C++", "Go"]
  }));
  const [problems, setProblemsState] = useState(() => loadStored("cf_problems", problemsSeed));
  const [users, setUsersState] = useState(() => loadStored("cf_users", usersSeed));
  const [submissions, setSubmissionsState] = useState(() => loadStored("cf_submissions", submissionsSeed));
  const [notifications, setNotificationsState] = useState(() => loadStored("cf_notifications", notificationsSeed));
  const [testCases, setTestCasesState] = useState(() => loadStored("cf_test_cases", testCasesSeed));
  const [editorials, setEditorialsState] = useState(() => loadStored("cf_editorials", editorialsSeed));
  const [settings, setSettingsState] = useState(() => loadStored("cf_settings", {
    darkMode: false,
    emailNotifications: true,
    weeklyDigest: true,
    compactTables: false,
    publicProfile: true,
    adminAuditAlerts: true
  }));

  const persist = (key, setter) => (valueOrUpdater) => {
    setter((current) => {
      const next = typeof valueOrUpdater === "function" ? valueOrUpdater(current) : valueOrUpdater;
      saveStored(key, next);
      return next;
    });
  };

  const setAuth = persist("cf_auth", setAuthState);
  const setProfile = persist("cf_profile", setProfileState);
  const setProblems = persist("cf_problems", setProblemsState);
  const setUsers = persist("cf_users", setUsersState);
  const setSubmissions = persist("cf_submissions", setSubmissionsState);
  const setNotifications = persist("cf_notifications", setNotificationsState);
  const setTestCases = persist("cf_test_cases", setTestCasesState);
  const setEditorials = persist("cf_editorials", setEditorialsState);
  const setSettings = persist("cf_settings", setSettingsState);

  const simulateSubmission = (problem, language, code) => {
    const outcomes = ["Accepted", "Wrong Answer", "Time Limit Exceeded", "Compilation Error"];
    const signal = (code.length + problem.id + language.length) % outcomes.length;
    const verdict = outcomes[signal];
    const item = {
      id: Date.now(),
      user: profile.username,
      problemId: problem.id,
      problem: problem.title,
      language,
      verdict,
      time: verdict === "Compilation Error" ? "-" : `${36 + signal * 47} ms`,
      memory: verdict === "Compilation Error" ? "-" : `${14 + signal * 8}.3 MB`,
      date: nowDate(),
      status: verdict === "Accepted" ? "Finished" : "Needs Review"
    };
    setSubmissions((current) => [item, ...current]);
    if (verdict === "Accepted") {
      setProfile((current) => ({ ...current, solved: current.solved + 1, acceptance: Math.min(99, current.acceptance + 1) }));
    }
    return item;
  };

  const value = useMemo(() => ({
    auth,
    setAuth,
    profile,
    setProfile,
    problems,
    setProblems,
    users,
    setUsers,
    submissions,
    setSubmissions,
    notifications,
    setNotifications,
    testCases,
    setTestCases,
    editorials,
    setEditorials,
    settings,
    setSettings,
    simulateSubmission
  }), [auth, profile, problems, users, submissions, notifications, testCases, editorials, settings]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}

export function useLogout() {
  const { setAuth } = useApp();
  const navigate = useNavigate();
  return () => {
    setAuth({ loggedIn: false, role: "Admin", username: "kishika" });
    navigate("/login");
  };
}
