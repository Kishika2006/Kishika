export const problemsSeed = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: 48,
    topics: ["Array", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Exactly one valid answer exists."],
    inputFormat: "nums = [2,7,11,15], target = 9",
    outputFormat: "[0,1]",
    exampleInput: "[2,7,11,15], 9",
    exampleOutput: "[0,1]",
    explanation: "nums[0] + nums[1] equals 9.",
    starter: {
      JavaScript: "function twoSum(nums, target) {\n  const seen = new Map();\n  return [];\n}",
      Python: "def two_sum(nums, target):\n    seen = {}\n    return []",
      Java: "class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    return new int[]{};\n  }\n}",
      "C++": "class Solution {\npublic:\n  vector<int> twoSum(vector<int>& nums, int target) {\n    return {};\n  }\n};",
      C: "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n  *returnSize = 0;\n  return NULL;\n}"
    }
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: 41,
    topics: ["Stack", "String"],
    description: "Determine if an input string containing brackets is valid based on matching open and close pairs.",
    constraints: ["1 <= s.length <= 10^4", "s consists only of brackets."],
    inputFormat: "s = \"()[]{}\"",
    outputFormat: "true",
    exampleInput: "\"()[]{}\"",
    exampleOutput: "true",
    explanation: "Every opened bracket is closed in the correct order."
  },
  { id: 3, title: "Merge Sorted Array", difficulty: "Easy", acceptance: 52, topics: ["Array", "Two Pointers"], description: "Merge nums2 into nums1 as one sorted array in-place.", constraints: ["nums1.length == m + n", "0 <= m,n <= 200"], inputFormat: "nums1, m, nums2, n", outputFormat: "nums1 sorted in nondecreasing order", exampleInput: "[1,2,3,0,0,0], 3, [2,5,6], 3", exampleOutput: "[1,2,2,3,5,6]", explanation: "The combined sorted order is placed back into nums1." },
  { id: 4, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", acceptance: 55, topics: ["Array", "Dynamic Programming"], description: "Find the maximum profit from one buy and one sell.", constraints: ["1 <= prices.length <= 10^5"], inputFormat: "prices = [7,1,5,3,6,4]", outputFormat: "5", exampleInput: "[7,1,5,3,6,4]", exampleOutput: "5", explanation: "Buy at 1 and sell at 6." },
  { id: 5, title: "Binary Tree Inorder Traversal", difficulty: "Easy", acceptance: 74, topics: ["Tree", "DFS", "Stack"], description: "Return the inorder traversal of a binary tree's node values.", constraints: ["0 <= number of nodes <= 100"], inputFormat: "root = [1,null,2,3]", outputFormat: "[1,3,2]", exampleInput: "[1,null,2,3]", exampleOutput: "[1,3,2]", explanation: "Visit left subtree, node, then right subtree." },
  { id: 6, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: 36, topics: ["Hash Table", "String", "Sliding Window"], description: "Find the length of the longest substring without duplicate characters.", constraints: ["0 <= s.length <= 5 * 10^4"], inputFormat: "s = \"abcabcbb\"", outputFormat: "3", exampleInput: "\"abcabcbb\"", exampleOutput: "3", explanation: "The answer is abc." },
  { id: 7, title: "Container With Most Water", difficulty: "Medium", acceptance: 56, topics: ["Array", "Two Pointers", "Greedy"], description: "Choose two lines that together with the x-axis contain the most water.", constraints: ["2 <= height.length <= 10^5"], inputFormat: "height = [1,8,6,2,5,4,8,3,7]", outputFormat: "49", exampleInput: "[1,8,6,2,5,4,8,3,7]", exampleOutput: "49", explanation: "The widest useful pair has height 7 and width 7." },
  { id: 8, title: "3Sum", difficulty: "Medium", acceptance: 34, topics: ["Array", "Two Pointers", "Sorting"], description: "Return all unique triplets whose sum is zero.", constraints: ["3 <= nums.length <= 3000"], inputFormat: "nums = [-1,0,1,2,-1,-4]", outputFormat: "[[-1,-1,2],[-1,0,1]]", exampleInput: "[-1,0,1,2,-1,-4]", exampleOutput: "[[-1,-1,2],[-1,0,1]]", explanation: "These are the unique triplets that sum to zero." },
  { id: 9, title: "Course Schedule", difficulty: "Medium", acceptance: 47, topics: ["Graph", "Topological Sort", "DFS"], description: "Determine whether all courses can be finished given prerequisite pairs.", constraints: ["1 <= numCourses <= 2000"], inputFormat: "numCourses = 2, prerequisites = [[1,0]]", outputFormat: "true", exampleInput: "2, [[1,0]]", exampleOutput: "true", explanation: "There is no cycle." },
  { id: 10, title: "Product of Array Except Self", difficulty: "Medium", acceptance: 66, topics: ["Array", "Prefix Sum"], description: "Return an array where each answer is the product of all elements except itself without division.", constraints: ["2 <= nums.length <= 10^5"], inputFormat: "nums = [1,2,3,4]", outputFormat: "[24,12,8,6]", exampleInput: "[1,2,3,4]", exampleOutput: "[24,12,8,6]", explanation: "Each index uses product of all other values." },
  { id: 11, title: "LRU Cache", difficulty: "Medium", acceptance: 43, topics: ["Hash Table", "Linked List", "Design"], description: "Design a cache with O(1) get and put operations using least-recently-used eviction.", constraints: ["1 <= capacity <= 3000"], inputFormat: "operations and values", outputFormat: "operation results", exampleInput: "LRUCache(2), put(1,1), put(2,2), get(1)", exampleOutput: "null,null,null,1", explanation: "Recently accessed keys remain in cache." },
  { id: 12, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: 39, topics: ["Array", "Binary Search", "Divide and Conquer"], description: "Find the median of two sorted arrays in O(log(m+n)) time.", constraints: ["0 <= m,n <= 1000", "m + n >= 1"], inputFormat: "nums1 = [1,3], nums2 = [2]", outputFormat: "2.0", exampleInput: "[1,3], [2]", exampleOutput: "2.0", explanation: "The merged order is [1,2,3]." },
  { id: 13, title: "Trapping Rain Water", difficulty: "Hard", acceptance: 61, topics: ["Array", "Two Pointers", "Dynamic Programming"], description: "Compute how much rain water can be trapped after raining.", constraints: ["1 <= height.length <= 2 * 10^4"], inputFormat: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", outputFormat: "6", exampleInput: "[0,1,0,2,1,0,1,3,2,1,2,1]", exampleOutput: "6", explanation: "Water collects between taller bars." },
  { id: 14, title: "Word Ladder", difficulty: "Hard", acceptance: 42, topics: ["Hash Table", "String", "BFS"], description: "Return the shortest transformation sequence length from beginWord to endWord.", constraints: ["1 <= wordList.length <= 5000"], inputFormat: "beginWord, endWord, wordList", outputFormat: "shortest length", exampleInput: "\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", exampleOutput: "5", explanation: "hit -> hot -> dot -> dog -> cog." },
  { id: 15, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", acceptance: 57, topics: ["Tree", "DFS", "Design"], description: "Design algorithms to serialize and deserialize a binary tree.", constraints: ["-1000 <= Node.val <= 1000"], inputFormat: "root = [1,2,3,null,null,4,5]", outputFormat: "same tree after decode", exampleInput: "[1,2,3,null,null,4,5]", exampleOutput: "[1,2,3,null,null,4,5]", explanation: "The codec preserves structure and values." }
];

export const allTopics = [...new Set(problemsSeed.flatMap((problem) => problem.topics))].sort();
export const languages = ["JavaScript", "Python", "Java", "C++", "C"];
