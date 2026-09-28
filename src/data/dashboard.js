export const solvedByDifficulty = [
  { name: "Easy", solved: 58, total: 210 },
  { name: "Medium", solved: 52, total: 430 },
  { name: "Hard", solved: 16, total: 190 }
];

export const languageUsage = [
  { name: "JavaScript", value: 38 },
  { name: "Python", value: 28 },
  { name: "Java", value: 16 },
  { name: "C++", value: 13 },
  { name: "C", value: 5 }
];

export const adminSubmissionStats = [
  { day: "Mon", submissions: 180, accepted: 104 },
  { day: "Tue", submissions: 220, accepted: 146 },
  { day: "Wed", submissions: 195, accepted: 120 },
  { day: "Thu", submissions: 260, accepted: 173 },
  { day: "Fri", submissions: 310, accepted: 207 },
  { day: "Sat", submissions: 275, accepted: 182 },
  { day: "Sun", submissions: 240, accepted: 151 }
];

export const registrations = [
  { month: "Mar", users: 860 },
  { month: "Apr", users: 980 },
  { month: "May", users: 1110 },
  { month: "Jun", users: 1260 },
  { month: "Jul", users: 1440 },
  { month: "Aug", users: 1610 }
];

export const difficultyDistribution = [
  { name: "Easy", value: 210 },
  { name: "Medium", value: 430 },
  { name: "Hard", value: 190 }
];

// Temporary activity seed kept separate so it can be replaced by backend data.
export const demoActivityCounts = {
  "2026-05-10": 1,
  "2026-05-14": 4,
  "2026-05-18": 2,
  "2026-05-22": 7,
  "2026-05-27": 12,
  "2026-06-02": 3,
  "2026-06-06": 1,
  "2026-06-11": 9,
  "2026-06-17": 5,
  "2026-06-21": 14,
  "2026-06-28": 2,
  "2026-07-04": 6,
  "2026-07-09": 3,
  "2026-07-15": 11,
  "2026-07-19": 1,
  "2026-07-24": 8,
  "2026-07-31": 4,
  "2026-08-05": 2,
  "2026-08-12": 10,
  "2026-08-16": 5,
  "2026-08-20": 13,
  "2026-08-24": 1,
  "2026-08-27": 3,
  "2026-08-31": 7,
  "2026-09-03": 2,
  "2026-09-06": 6,
  "2026-09-08": 4
};

export function activityForUser(submissions, username, days = 126, demoCounts = demoActivityCounts) {
  const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const counts = submissions
    .filter((submission) => submission.user === username && submission.verdict === "Accepted")
    .reduce((result, submission) => ({
      ...result,
      [submission.date]: (result[submission.date] || 0) + 1
    }), {});
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - days + index + 1);
    const key = dateKey(date);
    return {
      date: key,
      count: counts[key] || demoCounts[key] || 0
    };
  });
}

export const activity = Array.from({ length: 126 }, (_, index) => {
  const date = new Date("2026-04-24T00:00:00");
  date.setDate(date.getDate() + index);
  return {
    date: date.toISOString().slice(0, 10),
    count: (index * 7 + index % 5) % 9
  };
});
