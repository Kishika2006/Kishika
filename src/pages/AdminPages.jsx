import { useMemo, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge, COLORS, DataTable, DonutChart, Section, StatCard, Toolbar } from "../components/UI";
import { useApp } from "../context/AppContext";
import { adminSubmissionStats, difficultyDistribution, languageUsage, registrations } from "../data/dashboard";
import { languages } from "../data/problems";
import { leaderboardSeed } from "../data/leaderboard";
import { SubmissionTable } from "./UserPages";

const toneFor = (value) => value === "Accepted" || value === "Active" || value === "Easy" ? "good" : value === "Medium" ? "warn" : value === "Hard" || value === "Disabled" ? "bad" : "neutral";

export function AdminDashboard() {
  const { users, problems, submissions } = useApp();
  return (
    <div className="page">
      <h1>Dashboard Overview</h1>
      <div className="stats-grid admin">
        <StatCard label="Total Users" value={users.length} /><StatCard label="Active Users" value={users.filter((u) => u.status === "Active").length} /><StatCard label="Accepted Solutions" value={submissions.filter((s) => s.verdict === "Accepted").length} /><StatCard label="Total Problems" value={problems.length} /><StatCard label="Total Submissions" value={submissions.length} /><StatCard label="Today's Submissions" value={submissions.filter((s) => s.date === "2026-08-27").length} />
      </div>
      <Section title="Submission Statistics"><ChartWrap><BarChart data={adminSubmissionStats}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Legend /><Bar dataKey="submissions" fill="#2563eb" /><Bar dataKey="accepted" fill="#16a34a" /></BarChart></ChartWrap></Section>
      <Section title="User Registrations"><ChartWrap><AreaChart data={registrations}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area type="monotone" dataKey="users" fill="#bfdbfe" stroke="#2563eb" /></AreaChart></ChartWrap></Section>
      <Section title="Language Usage"><DonutChart data={languageUsage} /></Section>
      <Section title="Recent Submissions"><AdminSubmissionRows rows={submissions.slice(0, 6)} /></Section>
    </div>
  );
}

function ChartWrap({ children }) {
  return <ResponsiveContainer width="100%" height={280}>{children}</ResponsiveContainer>;
}

function AdminSubmissionRows({ rows }) {
  return <DataTable rows={rows} columns={[
    { key: "user", label: "User" },
    { key: "problem", label: "Problem" },
    { key: "language", label: "Language" },
    { key: "verdict", label: "Verdict", render: (r) => <Badge tone={toneFor(r.verdict)}>{r.verdict}</Badge> },
    { key: "time", label: "Time" },
    { key: "date", label: "Date" }
  ]} />;
}

export function AdminUsers() {
  const { users, setUsers } = useApp();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const rows = users.filter((user) => `${user.username} ${user.email}`.toLowerCase().includes(search.toLowerCase()) && (status === "All" || user.status === status));
  const update = (id, patch) => setUsers((current) => current.map((user) => user.id === id ? { ...user, ...patch } : user));
  return (
    <div className="page">
      <h1>User Management</h1>
      <Toolbar search={search} setSearch={setSearch} placeholder="Search users"><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>Active</option><option>Disabled</option></select></Toolbar>
      <DataTable rows={rows} columns={[
        { key: "username", label: "Username" }, { key: "email", label: "Email" },
        { key: "role", label: "Role", render: (r) => <select value={r.role} onChange={(e) => update(r.id, { role: e.target.value })}><option>User</option><option>Admin</option></select> },
        { key: "status", label: "Status", render: (r) => <Badge tone={toneFor(r.status)}>{r.status}</Badge> },
        { key: "solved", label: "Problems Solved" }, { key: "rank", label: "Rank" }, { key: "joinDate", label: "Join Date" }, { key: "lastLogin", label: "Last Login" },
        { key: "actions", label: "Actions", render: (r) => <div className="actions"><button>View</button><button onClick={() => update(r.id, { status: r.status === "Active" ? "Disabled" : "Active" })}>{r.status === "Active" ? "Disable" : "Enable"}</button></div> }
      ]} />
    </div>
  );
}

export function AdminProblems() {
  const { problems, setProblems } = useApp();
  const blank = { id: "", title: "", difficulty: "Easy", acceptance: 45, topics: "", description: "", constraints: "", inputFormat: "", outputFormat: "", exampleInput: "", exampleOutput: "", explanation: "" };
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(blank);
  const rows = problems.filter((problem) => problem.title.toLowerCase().includes(search.toLowerCase()));
  const save = () => {
    const problem = { ...draft, id: draft.id || Date.now(), topics: String(draft.topics).split(",").map((x) => x.trim()).filter(Boolean), constraints: String(draft.constraints).split("\n").filter(Boolean) };
    setProblems((current) => current.some((p) => p.id === problem.id) ? current.map((p) => p.id === problem.id ? problem : p) : [problem, ...current]);
    setDraft(blank);
  };
  return (
    <div className="page">
      <h1>Problem Management</h1>
      <section className="section form-grid">
        <input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <select value={draft.difficulty} onChange={(e) => setDraft({ ...draft, difficulty: e.target.value })}><option>Easy</option><option>Medium</option><option>Hard</option></select>
        <input placeholder="Topics, comma separated" value={draft.topics} onChange={(e) => setDraft({ ...draft, topics: e.target.value })} />
        <input placeholder="Acceptance rate" type="number" value={draft.acceptance} onChange={(e) => setDraft({ ...draft, acceptance: Number(e.target.value) })} />
        <textarea placeholder="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        <textarea placeholder="Constraints, one per line" value={draft.constraints} onChange={(e) => setDraft({ ...draft, constraints: e.target.value })} />
        <input placeholder="Input format" value={draft.inputFormat} onChange={(e) => setDraft({ ...draft, inputFormat: e.target.value })} />
        <input placeholder="Output format" value={draft.outputFormat} onChange={(e) => setDraft({ ...draft, outputFormat: e.target.value })} />
        <button className="primary" onClick={save}>{draft.id ? "Update problem" : "Create problem"}</button>
      </section>
      <Toolbar search={search} setSearch={setSearch} placeholder="Search problems" />
      <DataTable rows={rows} columns={[
        { key: "id", label: "#" }, { key: "title", label: "Title" }, { key: "difficulty", label: "Difficulty", render: (r) => <Badge tone={toneFor(r.difficulty)}>{r.difficulty}</Badge> }, { key: "acceptance", label: "Acceptance" },
        { key: "topics", label: "Topics", render: (r) => <div className="tag-row">{r.topics.map((t) => <Badge key={t}>{t}</Badge>)}</div> },
        { key: "actions", label: "Actions", render: (r) => <div className="actions"><button onClick={() => setDraft({ ...r, topics: r.topics.join(", "), constraints: r.constraints.join("\n") })}>Edit</button><button onClick={() => setProblems((items) => items.filter((p) => p.id !== r.id))}>Delete</button></div> }
      ]} />
    </div>
  );
}

export function AdminTestCases() {
  const { testCases, setTestCases, problems } = useApp();
  const [draft, setDraft] = useState({ problem: problems[0]?.title || "", caseName: "", input: "", expected: "", visibility: "Public" });
  const save = () => {
    setTestCases((items) => [{ ...draft, id: Date.now(), problemId: problems.find((p) => p.title === draft.problem)?.id || 1 }, ...items]);
    setDraft({ ...draft, caseName: "", input: "", expected: "" });
  };
  return (
    <div className="page">
      <h1>Test Case Management</h1>
      <section className="section form-grid">
        <select value={draft.problem} onChange={(e) => setDraft({ ...draft, problem: e.target.value })}>{problems.map((p) => <option key={p.id}>{p.title}</option>)}</select>
        <input placeholder="Test case" value={draft.caseName} onChange={(e) => setDraft({ ...draft, caseName: e.target.value })} />
        <input placeholder="Input" value={draft.input} onChange={(e) => setDraft({ ...draft, input: e.target.value })} />
        <input placeholder="Expected output" value={draft.expected} onChange={(e) => setDraft({ ...draft, expected: e.target.value })} />
        <select value={draft.visibility} onChange={(e) => setDraft({ ...draft, visibility: e.target.value })}><option>Public</option><option>Hidden</option></select>
        <button className="primary" onClick={save}>Add test case</button>
      </section>
      <DataTable rows={testCases} columns={[
        { key: "problem", label: "Problem" }, { key: "caseName", label: "Test Case" }, { key: "input", label: "Input" }, { key: "expected", label: "Expected Output" }, { key: "visibility", label: "Visibility" },
        { key: "actions", label: "Actions", render: (r) => <div className="actions"><button onClick={() => setTestCases((items) => items.map((item) => item.id === r.id ? { ...item, visibility: item.visibility === "Public" ? "Hidden" : "Public" } : item))}>Toggle</button><button onClick={() => setTestCases((items) => items.filter((item) => item.id !== r.id))}>Delete</button></div> }
      ]} />
    </div>
  );
}

export function AdminSubmissions() {
  const { submissions } = useApp();
  const [search, setSearch] = useState("");
  const [verdict, setVerdict] = useState("All");
  const [language, setLanguage] = useState("All");
  const rows = submissions.filter((item) => `${item.user} ${item.problem}`.toLowerCase().includes(search.toLowerCase()) && (verdict === "All" || item.verdict === verdict) && (language === "All" || item.language === language));
  return <SubmissionTable title="Submission Management" rows={rows} search={search} setSearch={setSearch} verdict={verdict} setVerdict={setVerdict} language={language} setLanguage={setLanguage} />;
}

export function AdminLeaderboards() {
  return (
    <div className="page">
      <h1>Leaderboards</h1>
      <DataTable rows={leaderboardSeed} columns={[
        { key: "rank", label: "Rank" }, { key: "user", label: "User" }, { key: "solved", label: "Problems Solved" }, { key: "score", label: "Score" }
      ]} />
    </div>
  );
}

export function AdminAnalytics() {
  return (
    <div className="page">
      <h1>Reports & Analytics</h1>
      <div className="stats-grid"><StatCard label="User Growth" value="+11.8%" /><StatCard label="Acceptance Rate" value="64%" /><StatCard label="Daily Submissions" value="260" /><StatCard label="Active Users" value="1,126" /></div>
      <Section title="User Growth"><ChartWrap><AreaChart data={registrations}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area dataKey="users" stroke="#2563eb" fill="#bfdbfe" /></AreaChart></ChartWrap></Section>
      <Section title="Submission Trends"><ChartWrap><BarChart data={adminSubmissionStats}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="submissions" fill="#2563eb" /></BarChart></ChartWrap></Section>
      <Section title="Problem Difficulty Distribution"><DonutChart data={difficultyDistribution} /></Section>
      <Section title="Language Usage"><DonutChart data={languageUsage} /></Section>
    </div>
  );
}

export function AdminEditorials() {
  const { editorials, setEditorials, problems } = useApp();
  const blank = { id: "", problem: problems[0]?.title || "", hint: "", difficultyNote: "", approach: "" };
  const [draft, setDraft] = useState(blank);
  const save = () => {
    const item = { ...draft, id: draft.id || Date.now() };
    setEditorials((items) => items.some((entry) => entry.id === item.id) ? items.map((entry) => entry.id === item.id ? item : entry) : [item, ...items]);
    setDraft(blank);
  };
  return (
    <div className="page">
      <h1>Hints & Editorials</h1>
      <section className="section form-grid">
        <select value={draft.problem} onChange={(e) => setDraft({ ...draft, problem: e.target.value })}>{problems.map((p) => <option key={p.id}>{p.title}</option>)}</select>
        <input placeholder="Problem hint" value={draft.hint} onChange={(e) => setDraft({ ...draft, hint: e.target.value })} />
        <input placeholder="Difficulty explanation" value={draft.difficultyNote} onChange={(e) => setDraft({ ...draft, difficultyNote: e.target.value })} />
        <textarea placeholder="Solution approach" value={draft.approach} onChange={(e) => setDraft({ ...draft, approach: e.target.value })} />
        <button className="primary" onClick={save}>Add editorial</button>
      </section>
      <DataTable rows={editorials} columns={[
        { key: "problem", label: "Problem" }, { key: "hint", label: "Hint" }, { key: "difficultyNote", label: "Difficulty Explanation" }, { key: "approach", label: "Solution Approach" },
        { key: "actions", label: "Actions", render: (r) => <div className="actions"><button onClick={() => setDraft(r)}>Edit</button><button onClick={() => setEditorials((items) => items.filter((item) => item.id !== r.id))}>Delete</button></div> }
      ]} />
    </div>
  );
}
