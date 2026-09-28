import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, CheckCircle2, Clock3, Download, ShieldCheck, Sparkles, Swords, Trophy } from "lucide-react";
import { useApp } from "../context/AppContext";
import { arenaSeed, challengeVaultSeed, credentialSeed, skillTrackSeed } from "../data/codeforge";

export function ChallengeVaultPage() {
  const { problems } = useApp();
  const [difficulty, setDifficulty] = useState("All");
  const [category, setCategory] = useState("All");
  const list = useMemo(() => problems.filter((problem) => {
    const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
    const matchesCategory = category === "All" || problem.topics.includes(category);
    return matchesDifficulty && matchesCategory;
  }), [problems, difficulty, category]);
  const categories = ["All", ...new Set(problems.flatMap((problem) => problem.topics))];
  return (
    <div className="page">
      <h1>Challenge Vault</h1>
      <div className="toolbar">
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>All</option><option>Easy</option><option>Medium</option><option>Hard</option></select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      <div className="vault-grid">
        {list.map((problem) => (
          <div className="vault-card" key={problem.id}>
            <div className="vault-topline"><span className="vault-status">{challengeVaultSeed.find((entry) => entry.title.toLowerCase().includes(problem.title.split(" ")[0].toLowerCase()))?.status || "Resolved"}</span><span>#{problem.id}</span></div>
            <h3>{problem.title}</h3>
            <div className="tag-row"><span className="badge neutral">{problem.topics[0]}</span><span className="badge neutral">{problem.difficulty}</span></div>
            <p>{problem.description}</p>
            <div className="vault-meta"><span>Success {problem.acceptance}%</span><span>Category {problem.topics[0]}</span></div>
            <Link to={`/problems/${problem.id}`} className="primary button-link">Open challenge</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillTracksPage() {
  return (
    <div className="page">
      <h1>Skill Velocity</h1>
      <div className="vault-grid">
        {skillTrackSeed.map((track) => (
          <div className="vault-card" key={track.id}>
            <h3>{track.title}</h3>
            <div className="vault-meta"><span>{track.challenges} Core Challenges</span><span>{track.progress}%</span></div>
            <div className="bar"><i style={{ width: `${track.progress}%` }} /></div>
            <div className="skill-badges"><span className="badge good">{track.earned ? "Credential Earned" : "In Progress"}</span><span className="badge neutral">{track.badge}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CredentialsPage() {
  return (
    <div className="page">
      <h1>Master Credentials</h1>
      <div className="vault-grid">
        {credentialSeed.map((item) => (
          <div className="vault-card" key={item.id}>
            <div className="vault-topline"><BadgeCheck size={16} /><span>{item.id}</span></div>
            <h3>{item.label}</h3>
            <p>{item.status}</p>
            <div className="vault-meta"><span>Score {item.score}</span><span>{item.status === "Credential Earned" ? "Awarded" : "Progressing"}</span></div>
            <Link to="/certificate" className="primary button-link">View certificate</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArenaPage() {
  const [selected, setSelected] = useState("My Scheduled Arenas");
  return (
    <div className="page">
      <h1>Timed Code Arenas</h1>
      <div className="toolbar">
        <button className={selected === "My Scheduled Arenas" ? "primary" : ""} onClick={() => setSelected("My Scheduled Arenas")}>My Scheduled Arenas</button>
        <button className={selected === "Invitations" ? "primary" : ""} onClick={() => setSelected("Invitations")}>Invitations</button>
      </div>
      <div className="vault-grid">
        {arenaSeed.filter((arena) => selected === "Invitations" ? arena.invited : true).map((arena) => (
          <div className="vault-card" key={arena.id}>
            <div className="vault-topline"><span className="vault-status">{arena.status}</span><span>{arena.challengeCount} challenges</span></div>
            <h3>{arena.title}</h3>
            <p>Host: {arena.host}</p>
            <div className="vault-meta"><span><Clock3 size={14} /> {arena.timer}</span><span>{arena.status}</span></div>
            <button className="primary">Enter Arena</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminCommandCenterPage() {
  return (
    <div className="page">
      <h1>Admin Command Center</h1>
      <div className="stats-grid admin">
        <div className="stat-card"><span>Candidate Roster</span><strong>128</strong><small>Active entrants</small></div>
        <div className="stat-card"><span>Vault Management</span><strong>156</strong><small>Challenges</small></div>
        <div className="stat-card"><span>Test Vectors</span><strong>42</strong><small>Current sets</small></div>
        <div className="stat-card"><span>Submissions Audit</span><strong>1,284</strong><small>Reviewed</small></div>
        <div className="stat-card"><span>Leaderboards</span><strong>7</strong><small>Regional boards</small></div>
        <div className="stat-card"><span>Platform Health</span><strong>99.99%</strong><small>Reliability</small></div>
      </div>
      <div className="vault-grid">
        <div className="vault-card"><h3>Challenge Authoring</h3><p>Manage vault content, hints, editorials, and quality gates.</p><Link to="/admin/problems" className="primary button-link">Open Vault</Link></div>
        <div className="vault-card"><h3>Candidate roster</h3><p>Track active users, statuses, and access controls.</p><Link to="/admin/users" className="primary button-link">Open roster</Link></div>
        <div className="vault-card"><h3>CMS & Editorials</h3><p>Create progressive hints and official walkthroughs.</p><Link to="/admin/editorials" className="primary button-link">Open CMS</Link></div>
      </div>
    </div>
  );
}
