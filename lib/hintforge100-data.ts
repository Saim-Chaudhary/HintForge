// HintForge 100 - Curated list of frequently asked problems in FAANG+ companies

export interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pattern: string[];
  companies: string[];
  leetcodeUrl?: string;
  frequency: 'very-high' | 'high' | 'medium';
}

export const hintforge100: Problem[] = [
  // Arrays & Hashing (15 problems)
  { id: 1, title: "Two Sum", difficulty: "easy", pattern: ["Hash Map", "Array"], companies: ["Google", "Amazon", "Apple", "Microsoft", "Meta"], leetcodeUrl: "https://leetcode.com/problems/two-sum/", frequency: "very-high" },
  { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "easy", pattern: ["Array", "Greedy"], companies: ["Amazon", "Microsoft", "Bloomberg", "Meta"], leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", frequency: "very-high" },
  { id: 3, title: "Contains Duplicate", difficulty: "easy", pattern: ["Hash Map", "Array"], companies: ["Google", "Apple", "Adobe"], leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/", frequency: "high" },
  { id: 4, title: "Product of Array Except Self", difficulty: "medium", pattern: ["Array", "Prefix Sum"], companies: ["Amazon", "Meta", "Apple", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/", frequency: "very-high" },
  { id: 5, title: "Maximum Subarray", difficulty: "medium", pattern: ["Array", "Dynamic Programming"], companies: ["Amazon", "Microsoft", "LinkedIn", "Apple"], leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", frequency: "very-high" },
  { id: 6, title: "3Sum", difficulty: "medium", pattern: ["Two Pointers", "Array"], companies: ["Amazon", "Meta", "Google", "Apple"], leetcodeUrl: "https://leetcode.com/problems/3sum/", frequency: "very-high" },
  { id: 7, title: "Container With Most Water", difficulty: "medium", pattern: ["Two Pointers", "Array"], companies: ["Amazon", "Google", "Meta", "Apple"], leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/", frequency: "high" },
  { id: 8, title: "Group Anagrams", difficulty: "medium", pattern: ["Hash Map", "String"], companies: ["Amazon", "Google", "Bloomberg"], leetcodeUrl: "https://leetcode.com/problems/group-anagrams/", frequency: "high" },
  { id: 9, title: "Valid Anagram", difficulty: "easy", pattern: ["Hash Map", "String"], companies: ["Amazon", "Meta", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/valid-anagram/", frequency: "high" },
  { id: 10, title: "Longest Consecutive Sequence", difficulty: "medium", pattern: ["Hash Map", "Array"], companies: ["Google", "Amazon", "Meta"], leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/", frequency: "high" },
  { id: 11, title: "Subarray Sum Equals K", difficulty: "medium", pattern: ["Hash Map", "Prefix Sum"], companies: ["Meta", "Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/", frequency: "very-high" },
  { id: 12, title: "Top K Frequent Elements", difficulty: "medium", pattern: ["Hash Map", "Heap"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/", frequency: "high" },
  { id: 13, title: "Longest Substring Without Repeating Characters", difficulty: "medium", pattern: ["Hash Map", "Sliding Window"], companies: ["Amazon", "Google", "Meta", "Apple"], leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", frequency: "very-high" },
  { id: 14, title: "Merge Intervals", difficulty: "medium", pattern: ["Array", "Sorting"], companies: ["Meta", "Google", "Amazon", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/merge-intervals/", frequency: "very-high" },
  { id: 15, title: "Insert Interval", difficulty: "medium", pattern: ["Array", "Sorting"], companies: ["Google", "Amazon", "Meta"], leetcodeUrl: "https://leetcode.com/problems/insert-interval/", frequency: "high" },

  // Two Pointers (8 problems)
  { id: 16, title: "Valid Palindrome", difficulty: "easy", pattern: ["Two Pointers", "String"], companies: ["Meta", "Amazon", "Apple"], leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/", frequency: "high" },
  { id: 17, title: "Two Sum II - Input Array Is Sorted", difficulty: "medium", pattern: ["Two Pointers", "Array"], companies: ["Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", frequency: "high" },
  { id: 18, title: "3Sum Closest", difficulty: "medium", pattern: ["Two Pointers", "Array"], companies: ["Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/3sum-closest/", frequency: "medium" },
  { id: 19, title: "Remove Nth Node From End of List", difficulty: "medium", pattern: ["Two Pointers", "Linked List"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", frequency: "high" },
  { id: 20, title: "Trapping Rain Water", difficulty: "hard", pattern: ["Two Pointers", "Array"], companies: ["Google", "Amazon", "Meta", "Apple"], leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/", frequency: "very-high" },
  { id: 21, title: "Move Zeroes", difficulty: "easy", pattern: ["Two Pointers", "Array"], companies: ["Meta", "Google", "Apple"], leetcodeUrl: "https://leetcode.com/problems/move-zeroes/", frequency: "high" },
  { id: 22, title: "Sort Colors", difficulty: "medium", pattern: ["Two Pointers", "Array"], companies: ["Meta", "Microsoft", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/sort-colors/", frequency: "medium" },
  { id: 23, title: "Squares of a Sorted Array", difficulty: "easy", pattern: ["Two Pointers", "Array"], companies: ["Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/squares-of-a-sorted-array/", frequency: "medium" },

  // Linked List (7 problems)
  { id: 24, title: "Reverse Linked List", difficulty: "easy", pattern: ["Linked List"], companies: ["Amazon", "Meta", "Google", "Apple", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/", frequency: "very-high" },
  { id: 25, title: "Merge Two Sorted Lists", difficulty: "easy", pattern: ["Linked List", "Recursion"], companies: ["Amazon", "Meta", "Apple", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/", frequency: "very-high" },
  { id: 26, title: "Linked List Cycle", difficulty: "easy", pattern: ["Linked List", "Two Pointers"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/", frequency: "very-high" },
  { id: 27, title: "Reorder List", difficulty: "medium", pattern: ["Linked List", "Two Pointers"], companies: ["Meta", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/reorder-list/", frequency: "high" },
  { id: 28, title: "Add Two Numbers", difficulty: "medium", pattern: ["Linked List", "Math"], companies: ["Amazon", "Meta", "Google", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/", frequency: "very-high" },
  { id: 29, title: "Copy List with Random Pointer", difficulty: "medium", pattern: ["Linked List", "Hash Map"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/", frequency: "high" },
  { id: 30, title: "Merge K Sorted Lists", difficulty: "hard", pattern: ["Linked List", "Heap"], companies: ["Amazon", "Meta", "Google", "Apple"], leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", frequency: "very-high" },

  // Binary Search (7 problems)
  { id: 31, title: "Binary Search", difficulty: "easy", pattern: ["Binary Search"], companies: ["Amazon", "Google", "Meta"], leetcodeUrl: "https://leetcode.com/problems/binary-search/", frequency: "very-high" },
  { id: 32, title: "Search in Rotated Sorted Array", difficulty: "medium", pattern: ["Binary Search", "Array"], companies: ["Meta", "Amazon", "Google", "Apple"], leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/", frequency: "very-high" },
  { id: 33, title: "Find Minimum in Rotated Sorted Array", difficulty: "medium", pattern: ["Binary Search", "Array"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", frequency: "high" },
  { id: 34, title: "Koko Eating Bananas", difficulty: "medium", pattern: ["Binary Search"], companies: ["Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/", frequency: "medium" },
  { id: 35, title: "Search a 2D Matrix", difficulty: "medium", pattern: ["Binary Search", "Matrix"], companies: ["Amazon", "Google", "Meta"], leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/", frequency: "high" },
  { id: 36, title: "Time Based Key-Value Store", difficulty: "medium", pattern: ["Binary Search", "Hash Map"], companies: ["Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/time-based-key-value-store/", frequency: "medium" },
  { id: 37, title: "Median of Two Sorted Arrays", difficulty: "hard", pattern: ["Binary Search", "Array"], companies: ["Google", "Meta", "Amazon", "Apple"], leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/", frequency: "very-high" },

  // Stack (6 problems)
  { id: 38, title: "Valid Parentheses", difficulty: "easy", pattern: ["Stack", "String"], companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"], leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", frequency: "very-high" },
  { id: 39, title: "Min Stack", difficulty: "medium", pattern: ["Stack", "Design"], companies: ["Amazon", "Google", "Meta"], leetcodeUrl: "https://leetcode.com/problems/min-stack/", frequency: "high" },
  { id: 40, title: "Daily Temperatures", difficulty: "medium", pattern: ["Stack", "Monotonic Stack"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/", frequency: "high" },
  { id: 41, title: "Evaluate Reverse Polish Notation", difficulty: "medium", pattern: ["Stack", "Array"], companies: ["Amazon", "Meta"], leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", frequency: "medium" },
  { id: 42, title: "Largest Rectangle in Histogram", difficulty: "hard", pattern: ["Stack", "Monotonic Stack"], companies: ["Google", "Amazon", "Meta"], leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/", frequency: "high" },
  { id: 43, title: "Generate Parentheses", difficulty: "medium", pattern: ["Stack", "Backtracking"], companies: ["Meta", "Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/", frequency: "very-high" },

  // Trees (15 problems)
  { id: 44, title: "Maximum Depth of Binary Tree", difficulty: "easy", pattern: ["Tree", "DFS"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", frequency: "very-high" },
  { id: 45, title: "Same Tree", difficulty: "easy", pattern: ["Tree", "DFS"], companies: ["Meta", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/same-tree/", frequency: "high" },
  { id: 46, title: "Invert Binary Tree", difficulty: "easy", pattern: ["Tree", "DFS"], companies: ["Google", "Meta", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/", frequency: "very-high" },
  { id: 47, title: "Symmetric Tree", difficulty: "easy", pattern: ["Tree", "DFS"], companies: ["Meta", "Amazon", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/", frequency: "high" },
  { id: 48, title: "Binary Tree Level Order Traversal", difficulty: "medium", pattern: ["Tree", "BFS"], companies: ["Amazon", "Meta", "Google", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/", frequency: "very-high" },
  { id: 49, title: "Validate Binary Search Tree", difficulty: "medium", pattern: ["Tree", "DFS"], companies: ["Amazon", "Meta", "Google", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/", frequency: "very-high" },
  { id: 50, title: "Lowest Common Ancestor of BST", difficulty: "medium", pattern: ["Tree", "BST"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", frequency: "high" },
  { id: 51, title: "Kth Smallest Element in a BST", difficulty: "medium", pattern: ["Tree", "BST"], companies: ["Amazon", "Google", "Meta"], leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", frequency: "high" },
  { id: 52, title: "Binary Tree Right Side View", difficulty: "medium", pattern: ["Tree", "BFS"], companies: ["Meta", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/", frequency: "high" },
  { id: 53, title: "Construct Binary Tree from Preorder and Inorder", difficulty: "medium", pattern: ["Tree", "DFS"], companies: ["Meta", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", frequency: "high" },
  { id: 54, title: "Serialize and Deserialize Binary Tree", difficulty: "hard", pattern: ["Tree", "Design"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", frequency: "very-high" },
  { id: 55, title: "Diameter of Binary Tree", difficulty: "easy", pattern: ["Tree", "DFS"], companies: ["Meta", "Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/", frequency: "high" },
  { id: 56, title: "Subtree of Another Tree", difficulty: "easy", pattern: ["Tree", "DFS"], companies: ["Meta", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/", frequency: "medium" },
  { id: 57, title: "Binary Tree Maximum Path Sum", difficulty: "hard", pattern: ["Tree", "DFS"], companies: ["Meta", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", frequency: "very-high" },
  { id: 58, title: "Count Good Nodes in Binary Tree", difficulty: "medium", pattern: ["Tree", "DFS"], companies: ["Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", frequency: "medium" },

  // Heap/Priority Queue (5 problems)
  { id: 59, title: "Kth Largest Element in an Array", difficulty: "medium", pattern: ["Heap", "Array"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/", frequency: "very-high" },
  { id: 60, title: "Find Median from Data Stream", difficulty: "hard", pattern: ["Heap", "Design"], companies: ["Google", "Amazon", "Meta"], leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/", frequency: "very-high" },
  { id: 61, title: "Task Scheduler", difficulty: "medium", pattern: ["Heap", "Greedy"], companies: ["Meta", "Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/task-scheduler/", frequency: "high" },
  { id: 62, title: "K Closest Points to Origin", difficulty: "medium", pattern: ["Heap", "Array"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin/", frequency: "high" },
  { id: 63, title: "Last Stone Weight", difficulty: "easy", pattern: ["Heap"], companies: ["Amazon"], leetcodeUrl: "https://leetcode.com/problems/last-stone-weight/", frequency: "medium" },

  // Backtracking (7 problems)
  { id: 64, title: "Subsets", difficulty: "medium", pattern: ["Backtracking", "Array"], companies: ["Meta", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/subsets/", frequency: "very-high" },
  { id: 65, title: "Combination Sum", difficulty: "medium", pattern: ["Backtracking", "Array"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/combination-sum/", frequency: "very-high" },
  { id: 66, title: "Permutations", difficulty: "medium", pattern: ["Backtracking", "Array"], companies: ["Meta", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/permutations/", frequency: "very-high" },
  { id: 67, title: "Word Search", difficulty: "medium", pattern: ["Backtracking", "Matrix"], companies: ["Amazon", "Meta", "Google", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/word-search/", frequency: "very-high" },
  { id: 68, title: "Palindrome Partitioning", difficulty: "medium", pattern: ["Backtracking", "String"], companies: ["Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/", frequency: "medium" },
  { id: 69, title: "Letter Combinations of a Phone Number", difficulty: "medium", pattern: ["Backtracking", "String"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", frequency: "high" },
  { id: 70, title: "N-Queens", difficulty: "hard", pattern: ["Backtracking"], companies: ["Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/n-queens/", frequency: "medium" },

  // Dynamic Programming (15 problems)
  { id: 71, title: "Climbing Stairs", difficulty: "easy", pattern: ["Dynamic Programming"], companies: ["Amazon", "Google", "Adobe"], leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/", frequency: "very-high" },
  { id: 72, title: "House Robber", difficulty: "medium", pattern: ["Dynamic Programming"], companies: ["Amazon", "Google", "Apple"], leetcodeUrl: "https://leetcode.com/problems/house-robber/", frequency: "high" },
  { id: 73, title: "House Robber II", difficulty: "medium", pattern: ["Dynamic Programming"], companies: ["Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/", frequency: "medium" },
  { id: 74, title: "Longest Palindromic Substring", difficulty: "medium", pattern: ["Dynamic Programming", "String"], companies: ["Amazon", "Meta", "Google", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/", frequency: "very-high" },
  { id: 75, title: "Palindromic Substrings", difficulty: "medium", pattern: ["Dynamic Programming", "String"], companies: ["Meta", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/", frequency: "medium" },
  { id: 76, title: "Decode Ways", difficulty: "medium", pattern: ["Dynamic Programming", "String"], companies: ["Meta", "Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/decode-ways/", frequency: "high" },
  { id: 77, title: "Coin Change", difficulty: "medium", pattern: ["Dynamic Programming"], companies: ["Amazon", "Google", "Meta"], leetcodeUrl: "https://leetcode.com/problems/coin-change/", frequency: "very-high" },
  { id: 78, title: "Maximum Product Subarray", difficulty: "medium", pattern: ["Dynamic Programming", "Array"], companies: ["Amazon", "LinkedIn"], leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/", frequency: "high" },
  { id: 79, title: "Word Break", difficulty: "medium", pattern: ["Dynamic Programming", "String"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/word-break/", frequency: "very-high" },
  { id: 80, title: "Longest Increasing Subsequence", difficulty: "medium", pattern: ["Dynamic Programming", "Array"], companies: ["Amazon", "Microsoft", "Google"], leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/", frequency: "very-high" },
  { id: 81, title: "Unique Paths", difficulty: "medium", pattern: ["Dynamic Programming", "Math"], companies: ["Amazon", "Google", "Meta"], leetcodeUrl: "https://leetcode.com/problems/unique-paths/", frequency: "high" },
  { id: 82, title: "Jump Game", difficulty: "medium", pattern: ["Dynamic Programming", "Greedy"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/jump-game/", frequency: "high" },
  { id: 83, title: "Edit Distance", difficulty: "medium", pattern: ["Dynamic Programming", "String"], companies: ["Google", "Amazon", "Meta"], leetcodeUrl: "https://leetcode.com/problems/edit-distance/", frequency: "high" },
  { id: 84, title: "Regular Expression Matching", difficulty: "hard", pattern: ["Dynamic Programming", "String"], companies: ["Google", "Meta", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/", frequency: "high" },
  { id: 85, title: "Longest Common Subsequence", difficulty: "medium", pattern: ["Dynamic Programming", "String"], companies: ["Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/", frequency: "high" },

  // Graphs (10 problems)
  { id: 86, title: "Number of Islands", difficulty: "medium", pattern: ["Graph", "DFS"], companies: ["Amazon", "Meta", "Google", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/number-of-islands/", frequency: "very-high" },
  { id: 87, title: "Clone Graph", difficulty: "medium", pattern: ["Graph", "DFS"], companies: ["Meta", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/clone-graph/", frequency: "very-high" },
  { id: 88, title: "Pacific Atlantic Water Flow", difficulty: "medium", pattern: ["Graph", "DFS"], companies: ["Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/", frequency: "medium" },
  { id: 89, title: "Course Schedule", difficulty: "medium", pattern: ["Graph", "Topological Sort"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/course-schedule/", frequency: "very-high" },
  { id: 90, title: "Course Schedule II", difficulty: "medium", pattern: ["Graph", "Topological Sort"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/", frequency: "high" },
  { id: 91, title: "Rotting Oranges", difficulty: "medium", pattern: ["Graph", "BFS"], companies: ["Amazon", "Bloomberg"], leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/", frequency: "high" },
  { id: 92, title: "Word Ladder", difficulty: "hard", pattern: ["Graph", "BFS"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/word-ladder/", frequency: "high" },
  { id: 93, title: "Alien Dictionary", difficulty: "hard", pattern: ["Graph", "Topological Sort"], companies: ["Google", "Meta", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/", frequency: "high" },
  { id: 94, title: "Graph Valid Tree", difficulty: "medium", pattern: ["Graph", "Union Find"], companies: ["Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/graph-valid-tree/", frequency: "medium" },
  { id: 95, title: "Network Delay Time", difficulty: "medium", pattern: ["Graph", "Dijkstra"], companies: ["Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/network-delay-time/", frequency: "medium" },

  // Advanced (5 problems)
  { id: 96, title: "LRU Cache", difficulty: "medium", pattern: ["Design", "Hash Map", "Linked List"], companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"], leetcodeUrl: "https://leetcode.com/problems/lru-cache/", frequency: "very-high" },
  { id: 97, title: "Implement Trie", difficulty: "medium", pattern: ["Trie", "Design"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/", frequency: "very-high" },
  { id: 98, title: "Design Add and Search Words Data Structure", difficulty: "medium", pattern: ["Trie", "Design"], companies: ["Meta", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", frequency: "medium" },
  { id: 99, title: "Word Search II", difficulty: "hard", pattern: ["Trie", "Backtracking"], companies: ["Amazon", "Meta", "Google"], leetcodeUrl: "https://leetcode.com/problems/word-search-ii/", frequency: "high" },
  { id: 100, title: "Sliding Window Maximum", difficulty: "hard", pattern: ["Sliding Window", "Monotonic Stack"], companies: ["Amazon", "Google", "Meta"], leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/", frequency: "very-high" },
];

// Company info
export const companyInfo: Record<string, { name: string; color: string }> = {
  "Amazon": { name: "Amazon", color: "#FF9900" },
  "Google": { name: "Google", color: "#4285F4" },
  "Meta": { name: "Meta", color: "#0081FB" },
  "Apple": { name: "Apple", color: "#A2AAAD" },
  "Microsoft": { name: "Microsoft", color: "#00A4EF" },
  "Netflix": { name: "Netflix", color: "#E50914" },
  "Bloomberg": { name: "Bloomberg", color: "#F7931E" },
  "LinkedIn": { name: "LinkedIn", color: "#0077B5" },
  "Adobe": { name: "Adobe", color: "#FF0000" },
};
