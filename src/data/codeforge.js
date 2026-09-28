export const kishikaProfile = {
  username: "kishika",
  fullName: "Kishika Sharma",
  email: "kishika@codeforge.dev",
  role: "Admin",
  rank: 1,
  solved: 312,
  acceptance: 99,
  streak: 46,
  languages: ["JavaScript", "Python", "C++", "Go"]
};

export const challengeVaultSeed = [
  { id: 101, title: "Matrix Spiral", difficulty: "Intermediate", acceptance: 67, category: "Arrays & Matrices", status: "Resolved" },
  { id: 102, title: "Token Balancer", difficulty: "Novice", acceptance: 81, category: "String Parsing", status: "Resolved" },
  { id: 103, title: "Sequence Matcher", difficulty: "Master", acceptance: 54, category: "Dynamic Optimization", status: "In Review" },
  { id: 104, title: "Graph Traversal", difficulty: "Intermediate", acceptance: 63, category: "Graph Theory", status: "Resolved" },
  { id: 105, title: "Tree Balance", difficulty: "Master", acceptance: 49, category: "Tree Traversals", status: "Unresolved" }
];

export const skillTrackSeed = [
  { id: 1, title: "Algorithmic Foundations Track", progress: 82, challenges: 5, badge: "Core Mastery", earned: true },
  { id: 2, title: "Java Enterprise Mastery", progress: 66, challenges: 4, badge: "Platform Ready", earned: false },
  { id: 3, title: "System Design Sprint", progress: 41, challenges: 6, badge: "Advanced", earned: false }
];

export const credentialSeed = [
  { id: "CF-2026-ALGO-01", label: "Algorithmic Foundations", status: "Credential Earned", score: 98 },
  { id: "CF-2026-DEV-02", label: "Java Enterprise Mastery", status: "In Progress", score: 76 },
  { id: "CF-2026-OPS-03", label: "Systems Thinking", status: "Credential Earned", score: 92 }
];

export const arenaSeed = [
  { id: 1, title: "AlgoSprint Delta", status: "Active", timer: "02:14:11", challengeCount: 5, host: "Kishika", invited: true },
  { id: 2, title: "Backend Code-Off 2026", status: "Upcoming", timer: "18:00:00", challengeCount: 8, host: "Kishika", invited: true },
  { id: 3, title: "Systems Rapid Fire", status: "Staging", timer: "00:45:00", challengeCount: 3, host: "Kishika", invited: false },
  { id: 4, title: "Debugging Gauntlet", status: "Concluded", timer: "Finished", challengeCount: 4, host: "Kishika", invited: true }
];
