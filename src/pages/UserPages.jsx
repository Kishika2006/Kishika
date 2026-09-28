import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Avatar, Badge, DataTable, DonutChart, Heatmap, ProgressRows, Section, StatCard, Toolbar } from "../components/UI";
import { useApp } from "../context/AppContext";
import { activity, activityForUser, languageUsage, solvedByDifficulty } from "../data/dashboard";
import { allTopics, languages } from "../data/problems";
import { leaderboardSeed } from "../data/leaderboard";

const toneFor = (value) => value === "Accepted" || value === "Active" || value === "Easy" ? "good" : value === "Medium" ? "warn" : value === "Hard" || value === "Disabled" ? "bad" : "neutral";

export function Login() {
  const { auth, setAuth } = useApp();
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();
  if (auth.loggedIn) return <Navigate to={auth.role === "Admin" ? "/admin/dashboard" : "/dashboard"} replace />;
  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={(event) => {
        event.preventDefault();
        const nextUser = role === "Admin" ? "kishika" : "kishika";
        setAuth({ loggedIn: true, role, username: nextUser });
        navigate(role === "Admin" ? "/admin/dashboard" : "/dashboard");
      }}>
        <h1>CodeForge</h1>
        <p>Forge your code. Validate your mastery.</p>
        <div className="segmented">
          {["User", "Admin"].map((item) => <button type="button" className={role === item ? "active" : ""} onClick={() => setRole(item)} key={item}>Login as {item}</button>)}
        </div>
        <input placeholder="Email" defaultValue="kishika@codeforge.dev" />
        <input placeholder="Password" type="password" defaultValue="demo1234" />
        <button className="primary">Login</button>
        <Link to="/register">Create a demo account</Link>
      </form>
    </main>
  );
}

export function Register() {
  const { setAuth, setProfile } = useApp();
  const [form, setForm] = useState({ username: "", email: "", role: "User" });
  const navigate = useNavigate();
  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={(event) => {
        event.preventDefault();
        setProfile((profile) => ({ ...profile, username: form.username || "new_user", email: form.email || "new@example.com" }));
        setAuth({ loggedIn: true, role: form.role, username: form.username || "new_user" });
        navigate(form.role === "Admin" ? "/admin/dashboard" : "/dashboard");
      }}>
        <h1>Register</h1>
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option>User</option><option>Admin</option></select>
        <button className="primary">Start demo</button>
        <Link to="/login">Back to login</Link>
      </form>
    </main>
  );
}

export function UserDashboard() {
  const { profile, submissions } = useApp();
  const recent = submissions.filter((item) => item.user === profile.username).slice(0, 5);
  const activity = activityForUser(submissions, profile.username);
  return (
    <div className="page">
      <h1>Welcome, User</h1>
      <div className="stats-grid">
        <StatCard label="Problems Solved" value={profile.solved} sub="+4 this week" />
        <StatCard label="Current Rank" value={`#${profile.rank}`} sub="Top 12%" />
        <StatCard label="Acceptance Rate" value={`${profile.acceptance}%`} sub="Last 30 days" />
        <StatCard label="Coding Streak" value={`${profile.streak} days`} sub="Personal best" />
      </div>
      <Section title="Solved by Difficulty"><ProgressRows rows={solvedByDifficulty} /></Section>
      <Section title="Coding Heatmap Calendar"><Heatmap data={activity} /></Section>
      <Section title="Language Usage"><DonutChart data={languageUsage} /></Section>
      <Section title="Recent Submissions">
        <DataTable rows={recent} columns={[
          { key: "problem", label: "Problem" },
          { key: "verdict", label: "Verdict", render: (r) => <Badge tone={toneFor(r.verdict)}>{r.verdict}</Badge> },
          { key: "language", label: "Language" },
          { key: "time", label: "Time" },
          { key: "date", label: "Date" }
        ]} />
      </Section>
    </div>
  );
}

export function ProblemsPage() {
  const { problems } = useApp();
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [sort, setSort] = useState("id");
  const rows = useMemo(() => problems.filter((problem) =>
    (problem.title.toLowerCase().includes(search.toLowerCase()) || problem.topics.join(" ").toLowerCase().includes(search.toLowerCase())) &&
    (difficulty === "All" || problem.difficulty === difficulty) &&
    (topic === "All" || problem.topics.includes(topic))
  ).sort((a, b) => sort === "acceptance" ? b.acceptance - a.acceptance : sort === "difficulty" ? a.difficulty.localeCompare(b.difficulty) : a.id - b.id), [problems, search, difficulty, topic, sort]);
  return (
    <div className="page">
      <h1>Problems</h1>
      <Toolbar search={search} setSearch={setSearch} placeholder="Search problems or topics">
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>All</option><option>Easy</option><option>Medium</option><option>Hard</option></select>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}><option>All</option>{allTopics.map((item) => <option key={item}>{item}</option>)}</select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="id">Sort by number</option><option value="difficulty">Sort by difficulty</option><option value="acceptance">Sort by acceptance</option></select>
      </Toolbar>
      <DataTable rows={rows} columns={[
        { key: "id", label: "#" },
        { key: "title", label: "Title", render: (r) => <Link to={`/problems/${r.id}`}>{r.title}</Link> },
        { key: "difficulty", label: "Difficulty", render: (r) => <Badge tone={toneFor(r.difficulty)}>{r.difficulty}</Badge> },
        { key: "acceptance", label: "Acceptance Rate", render: (r) => `${r.acceptance}%` },
        { key: "topics", label: "Topics", render: (r) => <div className="tag-row">{r.topics.map((t) => <Badge key={t}>{t}</Badge>)}</div> }
      ]} />
    </div>
  );
}

export function ProblemDetail() {
  const { id } = useParams();
  const { problems, simulateSubmission } = useApp();
  const problem = problems.find((item) => item.id === Number(id));
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [testInput, setTestInput] = useState(problem?.exampleInput || "");
  const [result, setResult] = useState(null);
  if (!problem) return <div className="page"><h1>Problem not found</h1></div>;
  const starter = problem.starter?.[language] || `// ${problem.title}\nfunction solve(input) {\n  return input;\n}`;
  return (
    <div className="solver-page">
      <section className="problem-pane">
        <h1>{problem.id}. {problem.title}</h1>
        <Badge tone={toneFor(problem.difficulty)}>{problem.difficulty}</Badge>
        <p>{problem.description}</p>
        <h3>Input Format</h3><p>{problem.inputFormat}</p>
        <h3>Output Format</h3><p>{problem.outputFormat}</p>
        <h3>Example Input</h3><pre>{problem.exampleInput}</pre>
        <h3>Example Output</h3><pre>{problem.exampleOutput}</pre>
        <h3>Explanation</h3><p>{problem.explanation}</p>
        <h3>Constraints</h3><ul>{problem.constraints.map((c) => <li key={c}>{c}</li>)}</ul>
        <div className="tag-row">{problem.topics.map((topic) => <Badge key={topic}>{topic}</Badge>)}</div>
      </section>
      <section className="editor-pane">
        <div className="editor-toolbar">
          <select value={language} onChange={(e) => { setLanguage(e.target.value); setCode(""); }}>{languages.map((item) => <option key={item}>{item}</option>)}</select>
          <button onClick={() => setResult({ verdict: "Sample Passed", time: "33 ms", memory: "12.5 MB" })}>Run</button>
          <button className="primary" onClick={() => setResult(simulateSubmission(problem, language, code || starter))}>Submit</button>
        </div>
        <textarea className="code-editor" value={code || starter} onChange={(e) => setCode(e.target.value)} spellCheck="false" />
        <label>Test case input</label>
        <textarea className="test-input" value={testInput} onChange={(e) => setTestInput(e.target.value)} />
        <div className="result-panel">
          <strong>Output / Result</strong>
          {result ? <p><Badge tone={toneFor(result.verdict)}>{result.verdict}</Badge> Time: {result.time} Memory: {result.memory}</p> : <p>Run or submit to simulate execution.</p>}
        </div>
      </section>
    </div>
  );
}

export function SubmissionsPage() {
  const { submissions, profile } = useApp();
  const [search, setSearch] = useState("");
  const [verdict, setVerdict] = useState("All");
  const [language, setLanguage] = useState("All");
  const rows = submissions.filter((item) => item.user === profile.username && item.problem.toLowerCase().includes(search.toLowerCase()) && (verdict === "All" || item.verdict === verdict) && (language === "All" || item.language === language));
  return <SubmissionTable title="My Submissions" rows={rows} search={search} setSearch={setSearch} verdict={verdict} setVerdict={setVerdict} language={language} setLanguage={setLanguage} />;
}

export function SubmissionTable({ title, rows, search, setSearch, verdict, setVerdict, language, setLanguage }) {
  return (
    <div className="page">
      <h1>{title}</h1>
      <Toolbar search={search} setSearch={setSearch} placeholder="Search submissions">
        <select value={verdict} onChange={(e) => setVerdict(e.target.value)}><option>All</option><option>Accepted</option><option>Wrong Answer</option><option>Time Limit Exceeded</option><option>Compilation Error</option></select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}><option>All</option>{languages.map((item) => <option key={item}>{item}</option>)}</select>
      </Toolbar>
      <DataTable rows={rows} columns={[
        { key: "problem", label: "Problem" },
        { key: "language", label: "Language" },
        { key: "verdict", label: "Verdict", render: (r) => <Badge tone={toneFor(r.verdict)}>{r.verdict}</Badge> },
        { key: "time", label: "Execution Time" },
        { key: "memory", label: "Memory" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" }
      ]} />
    </div>
  );
}

export function ProgressPage() {
  const { profile, submissions } = useApp();
  return (
    <div className="page">
      <h1>Progress Dashboard</h1>
      <div className="stats-grid">
        <StatCard label="Problems Solved" value={profile.solved} /><StatCard label="Easy Solved" value="58" /><StatCard label="Medium Solved" value="52" /><StatCard label="Hard Solved" value="16" /><StatCard label="Acceptance Rate" value={`${profile.acceptance}%`} /><StatCard label="Coding Streak" value={profile.streak} /><StatCard label="Total Submissions" value={submissions.length} />
      </div>
      <Section title="Language Statistics"><DonutChart data={languageUsage} /></Section>
      <Section title="Coding Activity"><Heatmap data={activity} /></Section>
      <Section title="Solved by Difficulty"><ProgressRows rows={solvedByDifficulty} /></Section>
    </div>
  );
}

export function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rank");
  const rows = leaderboardSeed.filter((row) => row.user.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === "score" ? b.score - a.score : sort === "solved" ? b.solved - a.solved : a.rank - b.rank);
  return (
    <div className="page">
      <h1>Leaderboard</h1>
      <Toolbar search={search} setSearch={setSearch} placeholder="Search users"><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="rank">Rank</option><option value="solved">Problems solved</option><option value="score">Score</option></select></Toolbar>
      <DataTable rows={rows} columns={[
        { key: "rank", label: "Rank", render: (r) => <strong className={r.rank <= 3 ? "rank-hot" : ""}>#{r.rank}</strong> },
        { key: "user", label: "User" },
        { key: "solved", label: "Problems Solved" },
        { key: "score", label: "Score" }
      ]} />
    </div>
  );
}

export function ProfilePage() {
  const { profile, setProfile } = useApp();
  const [draft, setDraft] = useState(profile);
  return (
    <div className="page">
      <h1>Profile</h1>
      <div className="profile-grid">
        <section className="profile-card"><Avatar name={profile.username} /><h2>{profile.username}</h2><p>{profile.email}</p><Badge>Rank #{profile.rank}</Badge></section>
        <section className="section form-section">
          <h2>Edit Profile</h2>
          <input value={draft.username} onChange={(e) => setDraft({ ...draft, username: e.target.value })} />
          <input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
          <input value={draft.languages.join(", ")} onChange={(e) => setDraft({ ...draft, languages: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} />
          <button className="primary" onClick={() => setProfile(draft)}>Save profile</button>
        </section>
      </div>
      <div className="stats-grid"><StatCard label="Problems Solved" value={profile.solved} /><StatCard label="Acceptance Rate" value={`${profile.acceptance}%`} /><StatCard label="Coding Streak" value={profile.streak} /></div>
      <Section title="Recent Activity"><Heatmap data={activity.slice(-70)} /></Section>
    </div>
  );
}

export function NotificationsPage() {
  const { notifications, setNotifications } = useApp();
  return (
    <div className="page">
      <h1>Notifications</h1>
      <button className="primary" onClick={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))}>Mark all as read</button>
      <div className="list-stack">
        {notifications.map((item) => (
          <article className={`notification-card ${item.read ? "" : "unread"}`} key={item.id}>
            <div><h2>{item.title}</h2><p>{item.message}</p><small>{item.date}</small></div>
            <button onClick={() => setNotifications((items) => items.map((n) => n.id === item.id ? { ...n, read: true } : n))}>Mark as read</button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SettingsPage({ admin = false }) {
  const { settings, setSettings } = useApp();
  const keys = admin ? ["adminAuditAlerts", "emailNotifications", "compactTables"] : ["darkMode", "emailNotifications", "weeklyDigest", "publicProfile", "compactTables"];
  return (
    <div className="page">
      <h1>{admin ? "Admin Settings" : "Settings"}</h1>
      <section className="section settings-grid">
        {keys.map((key) => (
          <label className="toggle-row" key={key}>
            <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</span>
            <input type="checkbox" checked={Boolean(settings[key])} onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })} />
          </label>
        ))}
      </section>
    </div>
  );
}
