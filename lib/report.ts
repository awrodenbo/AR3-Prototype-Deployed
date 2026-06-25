import {
  alignmentRows,
  bloomDistribution,
  coverageRows,
  recommendations,
  rubricCriteria
} from "@/lib/sample";

export const REPORT_STORAGE_KEY = "ar3-generated-report";
export const REPORT_HISTORY_KEY = "ar3-report-history";

export type Priority = "High Priority" | "Medium Priority" | "Low Priority";

export type ReportFinding = {
  title: string;
  evidence: string;
  impact: string;
  recommendation: string;
};

export type ReportRecommendation = {
  priority: Priority;
  title: string;
  reason: string;
  expectedImpact: string;
};

export type RubricLevel = {
  level: "Exemplary" | "Proficient" | "Developing" | "Beginning";
  descriptor: string;
};

export type RubricCriterion = {
  criterion: string;
  points: number;
  levels: RubricLevel[];
};

export type AlignmentMatrixRow = {
  objective: string;
  assignmentTask: string;
  rubricCriterion: string;
  bloomLevel: string;
  evidence: string;
};

export type GeneratedReport = {
  id: string;
  generatedAt: string;
  source: "openai" | "mock";
  title: string;
  subtitle: string;
  status: string;
  scores: {
    overall: number;
    learningObjectiveAlignment: number;
    bloomLevel: string;
    academicRigor: number;
    rubricAlignment: number;
    assessmentCoverage: number;
  };
  bloomDistribution: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  objectiveCoverage: Array<{
    clo: string;
    text: string;
    score: number;
    evidence: string;
  }>;
  findings: {
    strengths: ReportFinding[];
    highPriorityIssues: ReportFinding[];
    mediumPriorityIssues: ReportFinding[];
    lowPriorityIssues: ReportFinding[];
  };
  recommendations: ReportRecommendation[];
  assessmentPackage: {
    revisedAssignmentPrompt: string;
    rubric: RubricCriterion[];
    alignmentMatrix: AlignmentMatrixRow[];
    facultyNotes: string[];
    studentInstructions: string[];
  };
};

export const mockGeneratedReport: GeneratedReport = {
  id: "mock-eng-111",
  generatedAt: new Date("2026-06-25T12:00:00.000Z").toISOString(),
  source: "mock",
  title: "Instructional Intelligence Report",
  subtitle: "Annotated Bibliography - ENG 111, Module 4",
  status: "Ready with targeted revisions",
  scores: {
    overall: 89,
    learningObjectiveAlignment: 94,
    bloomLevel: "Analyze",
    academicRigor: 88,
    rubricAlignment: 91,
    assessmentCoverage: 82
  },
  bloomDistribution,
  objectiveCoverage: coverageRows.map((row) => ({
    ...row,
    evidence:
      row.clo === "CLO 4"
        ? "Original instructions do not require peer or instructor feedback before final submission."
        : "Assignment instructions and rubric criteria provide observable evidence for this objective."
  })),
  findings: {
    strengths: [
      {
        title: "Strong source-evaluation foundation",
        evidence: "Students evaluate credibility, relevance, and usefulness for five sources.",
        impact: "The assignment supports early research preparation in a 100-level writing course.",
        recommendation: "Retain source-evaluation expectations in the revised prompt."
      },
      {
        title: "Appropriate course-level rigor",
        evidence: "The task asks students to summarize and evaluate sources before composing an argument.",
        impact: "Students can build research readiness without being overloaded by final-paper demands.",
        recommendation: "Use the assignment as a bridge into the researched argument."
      },
      {
        title: "Relevant rubric categories",
        evidence: "The rubric includes source credibility, depth of discussion, citation, and mechanics.",
        impact: "Students receive signals about both research quality and academic writing conventions.",
        recommendation: "Keep these categories while making synthesis and revision more measurable."
      }
    ],
    highPriorityIssues: [
      {
        title: "CLO 4 is weakly assessed",
        evidence: "No revision cycle is required in the original assignment instructions.",
        impact: "Students may not demonstrate revision using peer or instructor feedback.",
        recommendation: "Add peer review, instructor comments, and a revised submission."
      },
      {
        title: "Synthesis language is vague",
        evidence: "The rubric names cohesiveness but does not define measurable synthesis behaviors.",
        impact: "Faculty may not be able to score source integration consistently.",
        recommendation: "Add descriptors for comparing viewpoints and connecting sources to the research question."
      },
      {
        title: "Create-level demand is limited",
        evidence: "Students annotate sources but are not asked to defend a research question or claim.",
        impact: "The task may stop short of preparing students for original argument development.",
        recommendation: "Require a short reflective memo defending the research question or emerging thesis."
      }
    ],
    mediumPriorityIssues: [
      {
        title: "Rhetorical vocabulary needs scaffolding",
        evidence: "CLO 1 references rhetorical strategies, but the prompt does not name key concepts.",
        impact: "Students may not know how to apply rhetorical analysis to source selection.",
        recommendation: "Add a glossary or low-stakes practice activity for ethos, pathos, logos, and kairos."
      },
      {
        title: "Transfer to final argument could be clearer",
        evidence: "The prompt asks how sources may support the final paper but does not require comparison.",
        impact: "Students may treat annotations as isolated summaries.",
        recommendation: "Require a synthesis statement that explains how sources work together."
      }
    ],
    lowPriorityIssues: [
      {
        title: "Accessibility support can be more explicit",
        evidence: "The assignment does not mention accessible formats or walkthrough support.",
        impact: "Students may need additional access points for instructions.",
        recommendation: "Offer instructions in HTML and plain-text formats with a captioned walkthrough."
      }
    ]
  },
  recommendations: recommendations.map((recommendation) => ({
    ...recommendation,
    expectedImpact:
      recommendation.priority === "High Priority"
        ? "Improves objective coverage and scoring evidence."
        : "Improves clarity, accessibility, or transfer to the final researched argument."
  })) as ReportRecommendation[],
  assessmentPackage: {
    revisedAssignmentPrompt:
      "Create an annotated bibliography with at least five credible academic or professional sources connected to your approved research question. For each source, provide a complete MLA or APA citation, a concise summary, an evaluation of credibility and relevance, and a synthesis statement explaining how the source connects to at least one other source. After peer and instructor feedback, submit a revised version with a short reflective memo describing the changes you made and how the bibliography prepares you for the final researched argument.",
    rubric: rubricCriteria.map((criterion) => ({
      criterion,
      points: 20,
      levels: [
        {
          level: "Exemplary",
          descriptor: "Consistently precise, complete, evidence-based, and aligned to the task."
        },
        {
          level: "Proficient",
          descriptor: "Clear and accurate with minor gaps in evidence, clarity, or completeness."
        },
        {
          level: "Developing",
          descriptor: "Partially complete with uneven evidence, limited explanation, or unclear alignment."
        },
        {
          level: "Beginning",
          descriptor: "Limited, missing, inaccurate, or insufficiently connected to the assignment."
        }
      ]
    })),
    alignmentMatrix: alignmentRows.map((row) => ({
      objective: row.objective,
      assignmentTask: row.task,
      rubricCriterion: row.criterion,
      bloomLevel: row.bloom,
      evidence: row.evidence
    })),
    facultyNotes: [
      "The revision cycle was added so CLO 4 is directly assessed rather than implied.",
      "Bloom's level increased because students now evaluate sources, analyze relationships, and defend research decisions.",
      "The rubric better matches the assignment by measuring synthesis, revision, citation accuracy, and reflective transfer.",
      "The revised assignment improves assessment coverage across all five course learning objectives."
    ],
    studentInstructions: [
      "Select at least five credible sources related to your research question.",
      "Write an annotation for each source that summarizes, evaluates, and connects the source to your project.",
      "Include one synthesis statement that compares source perspectives or explains how sources work together.",
      "Participate in peer review and revise your bibliography after receiving feedback.",
      "Submit a short reflective memo explaining your revisions and next steps for the final researched argument."
    ]
  }
};

export function normalizeReport(report: GeneratedReport): GeneratedReport {
  return {
    ...mockGeneratedReport,
    ...report,
    scores: { ...mockGeneratedReport.scores, ...report.scores },
    findings: { ...mockGeneratedReport.findings, ...report.findings },
    assessmentPackage: {
      ...mockGeneratedReport.assessmentPackage,
      ...report.assessmentPackage
    }
  };
}

export function reportToText(report: GeneratedReport) {
  const lines = [
    report.title,
    report.subtitle,
    `Status: ${report.status}`,
    `Overall Instructional Intelligence Score: ${report.scores.overall}/100`,
    `Learning Objective Alignment: ${report.scores.learningObjectiveAlignment}%`,
    `Bloom's Taxonomy Level: ${report.scores.bloomLevel}`,
    `Academic Rigor: ${report.scores.academicRigor}%`,
    `Rubric Alignment: ${report.scores.rubricAlignment}%`,
    `Assessment Coverage: ${report.scores.assessmentCoverage}%`,
    "",
    "Recommendations",
    ...report.recommendations.map(
      (recommendation) =>
        `${recommendation.priority}: ${recommendation.title} Reason: ${recommendation.reason}`
    )
  ];

  return lines.join("\n");
}

export function rubricToText(report: GeneratedReport) {
  return report.assessmentPackage.rubric
    .map(
      (criterion) =>
        `${criterion.criterion} (${criterion.points} pts)\n${criterion.levels
          .map((level) => `${level.level}: ${level.descriptor}`)
          .join("\n")}`
    )
    .join("\n\n");
}
