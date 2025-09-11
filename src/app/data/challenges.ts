export interface Challenge {
  Ref: number;
  Skill: string;
  Specialism: string;
  Experience: string;
  Scenario: string;
  Challenge: string;
  Task: string;
}

export const challengeData: Challenge[] = [
  {
    "Ref": 1,
    "Skill": "Strategy",
    "Specialism": "Healthcare",
    "Experience": "Senior",
    "Scenario": "In a bold move, Foodora pushed the checkout optimization engine live across all regions. You were part of the core team that rushed this through beta, but early reports from the healthcare segment show unexpected user behavior and negative sentiment. Patient wait times increased by 24%, while readmission rates rose to 19%.",
    "Challenge": "With care outcomes slipping, execs want to know how product changes affect operational efficiency and patient safety metrics.",
    "Task": "As a senior PM, apply your strategy strengths to diagnose the issues with the product. Use outcomes data, clinician feedback, and error reports to propose a recovery path that balances compliance and care quality."
  },
  {
    "Ref": 2,
    "Skill": "Prioritisation",
    "Specialism": "Technology",
    "Experience": "Entry",
    "Scenario": "The executive team at PulseBank prioritized the content discovery feed as a strategic differentiator. Your team's first sprint focused on engagement metrics and user retention. However, after the initial launch, you noticed that power users are abandoning the platform faster than expected.",
    "Challenge": "Leadership wants to understand why engagement dropped and how to prioritize the backlog to recover user confidence.",
    "Task": "As an entry-level PM, create a prioritization framework that balances user feedback, technical debt, and business objectives. Present your recommendations for the next three sprints."
  },
  {
    "Ref": 3,
    "Skill": "Discovery",
    "Specialism": "Retail",
    "Experience": "Mid",
    "Scenario": "QuickShop's mobile app has seen a 15% increase in cart abandonment over the past quarter. User research suggests checkout friction, but the data shows mixed signals about where exactly users are dropping off.",
    "Challenge": "The VP of Product wants a comprehensive discovery process to identify the root causes and validate solutions before the next major release.",
    "Task": "Design and execute a discovery process that combines quantitative data analysis with qualitative user research. Present your findings and recommended solutions to stakeholders."
  }
];

export const skillOptions = ["Strategy", "Prioritisation", "Discovery", "Launch Planning", "Metrics"];
export const industryOptions = ["Healthcare", "Technology", "Media", "AI", "Retail", "Finance"];
export const experienceOptions = ["Entry", "Mid", "Senior"];