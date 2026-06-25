export type ReportInputKey =
  | "courseObjectives"
  | "moduleObjectives"
  | "assignmentInstructions"
  | "assignmentRubric"
  | "instructionalConcerns";

export const sampleReportInput: Record<ReportInputKey, string> = {
  courseObjectives:
    "Course: VCCS ENG 111\nAssignment: Annotated Bibliography - Module 4\nTerm: Fall 2026\n\nCLO 1: Apply rhetorical strategies to academic writing situations.\nCLO 2: Evaluate sources for credibility, relevance, and bias.\nCLO 3: Synthesize multiple perspectives in a researched argument.\nCLO 4: Revise drafts using peer and instructor feedback.\nCLO 5: Demonstrate command of standard written English.",
  moduleObjectives:
    "Identify credible academic and professional sources.\nEvaluate the relevance and reliability of sources.\nSummarize and annotate sources using academic conventions.\nConnect source evidence to a research question.\nPrepare for a researched argument through source synthesis.",
  assignmentInstructions:
    "Students will create an annotated bibliography with at least five credible sources related to their research topic. For each source, students will provide a citation, a concise summary, an evaluation of credibility, and a brief explanation of how the source may support their final researched argument.",
  assignmentRubric:
    "Criteria include source credibility, depth of discussion, cohesiveness, grammar and mechanics, and MLA/APA citation accuracy.",
  instructionalConcerns:
    "Ensure the assignment measures all course learning objectives.\nIncrease academic rigor where appropriate.\nCheck whether the rubric measures the actual assignment.\nIdentify gaps in assessment coverage.\nRecommend improvements for faculty review."
};

export const bloomDistribution = [
  { label: "Remember", value: 5, color: "bg-slate-400" },
  { label: "Understand", value: 12, color: "bg-blue-400" },
  { label: "Apply", value: 22, color: "bg-green-500" },
  { label: "Analyze", value: 31, color: "bg-analyze" },
  { label: "Evaluate", value: 24, color: "bg-orange-500" },
  { label: "Create", value: 6, color: "bg-pink-500" }
];

export const coverageRows = [
  {
    clo: "CLO 2",
    text: "Evaluate sources for credibility, relevance, and bias",
    score: 96
  },
  {
    clo: "CLO 3",
    text: "Synthesize multiple perspectives in a researched argument",
    score: 88
  },
  {
    clo: "CLO 5",
    text: "Demonstrate command of standard written English",
    score: 71
  },
  {
    clo: "CLO 1",
    text: "Apply rhetorical strategies to academic writing situations",
    score: 58
  },
  {
    clo: "CLO 4",
    text: "Revise drafts using peer and instructor feedback",
    score: 22
  }
];

export const recommendations = [
  {
    priority: "High Priority",
    title: "Add a revision component tied to CLO 4.",
    reason:
      "Current assignment ends at submission. Add peer review, instructor comments, and a revised draft so revision is directly assessed."
  },
  {
    priority: "High Priority",
    title: "Scaffold rhetorical analysis vocabulary.",
    reason:
      "Add a one-page glossary or low-stakes practice activity for ethos, pathos, logos, and kairos."
  },
  {
    priority: "Medium Priority",
    title: "Tighten the rubric's synthesis criterion.",
    reason:
      "Replace vague language with measurable indicators such as naming authors, comparing viewpoints, and connecting sources to the research question."
  },
  {
    priority: "Medium Priority",
    title: "Strengthen Create-level demand.",
    reason:
      "Require students to defend an original research question or thesis statement in a short reflective memo."
  },
  {
    priority: "Low Priority",
    title: "Add an accessibility note to instructions.",
    reason:
      "Offer instructions in both HTML and plain-text formats and include captioned walkthrough support."
  }
];

export const rubricCriteria = [
  "Source Credibility and Evaluation",
  "Annotation Depth and Source Summary",
  "Synthesis and Connection to Research Question",
  "Revision and Reflection",
  "Writing, Citation, and Mechanics"
];

export const alignmentRows = [
  {
    objective: "CLO 2",
    task: "Evaluate sources",
    criterion: "Source Credibility and Evaluation",
    bloom: "Evaluate",
    evidence: "Students justify credibility, relevance, and bias for each source."
  },
  {
    objective: "CLO 3",
    task: "Connect sources to research question",
    criterion: "Synthesis and Connection",
    bloom: "Analyze",
    evidence: "Annotations compare perspectives and identify how sources support the argument."
  },
  {
    objective: "CLO 4",
    task: "Revise after feedback",
    criterion: "Revision and Reflection",
    bloom: "Evaluate",
    evidence: "Students submit a revision memo explaining feedback-based changes."
  },
  {
    objective: "CLO 5",
    task: "Use academic writing conventions",
    criterion: "Writing, Citation, and Mechanics",
    bloom: "Apply",
    evidence: "Final submission demonstrates citation accuracy and edited prose."
  },
  {
    objective: "CLO 1",
    task: "Apply rhetorical strategies",
    criterion: "Reflective memo",
    bloom: "Analyze",
    evidence: "Students explain how audience, purpose, and source choices shape the project."
  }
];
