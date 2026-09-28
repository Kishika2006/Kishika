export const editorialsSeed = [
  { id: 1, problem: "Two Sum", hint: "Track numbers already seen.", difficultyNote: "Hash lookup makes the brute force loop unnecessary.", approach: "Use a hash map from value to index while scanning once." },
  { id: 2, problem: "Course Schedule", hint: "A cycle makes completion impossible.", difficultyNote: "The challenge is modeling prerequisites as a directed graph.", approach: "Use indegrees and process zero-indegree courses with a queue." },
  { id: 3, problem: "Trapping Rain Water", hint: "Water level is bounded by the shorter side.", difficultyNote: "Two pointers remove the need for prefix arrays.", approach: "Move the side with the smaller max height inward." }
];
