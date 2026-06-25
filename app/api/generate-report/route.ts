import { NextResponse } from "next/server";
import { GeneratedReport, mockGeneratedReport, normalizeReport } from "@/lib/report";

export const runtime = "nodejs";

const reportSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "title",
    "subtitle",
    "status",
    "scores",
    "bloomDistribution",
    "objectiveCoverage",
    "findings",
    "recommendations",
    "assessmentPackage"
  ],
  properties: {
    title: { type: "string" },
    subtitle: { type: "string" },
    status: { type: "string" },
    scores: {
      type: "object",
      additionalProperties: false,
      required: [
        "overall",
        "learningObjectiveAlignment",
        "bloomLevel",
        "academicRigor",
        "rubricAlignment",
        "assessmentCoverage"
      ],
      properties: {
        overall: { type: "number" },
        learningObjectiveAlignment: { type: "number" },
        bloomLevel: { type: "string" },
        academicRigor: { type: "number" },
        rubricAlignment: { type: "number" },
        assessmentCoverage: { type: "number" }
      }
    },
    bloomDistribution: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["label", "value"],
        properties: {
          label: { type: "string" },
          value: { type: "number" }
        }
      }
    },
    objectiveCoverage: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["clo", "text", "score", "evidence"],
        properties: {
          clo: { type: "string" },
          text: { type: "string" },
          score: { type: "number" },
          evidence: { type: "string" }
        }
      }
    },
    findings: {
      type: "object",
      additionalProperties: false,
      required: ["strengths", "highPriorityIssues", "mediumPriorityIssues", "lowPriorityIssues"],
      properties: {
        strengths: { type: "array", items: { $ref: "#/$defs/finding" } },
        highPriorityIssues: { type: "array", items: { $ref: "#/$defs/finding" } },
        mediumPriorityIssues: { type: "array", items: { $ref: "#/$defs/finding" } },
        lowPriorityIssues: { type: "array", items: { $ref: "#/$defs/finding" } }
      }
    },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["priority", "title", "reason", "expectedImpact"],
        properties: {
          priority: { type: "string", enum: ["High Priority", "Medium Priority", "Low Priority"] },
          title: { type: "string" },
          reason: { type: "string" },
          expectedImpact: { type: "string" }
        }
      }
    },
    assessmentPackage: {
      type: "object",
      additionalProperties: false,
      required: [
        "revisedAssignmentPrompt",
        "rubric",
        "alignmentMatrix",
        "facultyNotes",
        "studentInstructions"
      ],
      properties: {
        revisedAssignmentPrompt: { type: "string" },
        rubric: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["criterion", "points", "levels"],
            properties: {
              criterion: { type: "string" },
              points: { type: "number" },
              levels: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["level", "descriptor"],
                  properties: {
                    level: {
                      type: "string",
                      enum: ["Exemplary", "Proficient", "Developing", "Beginning"]
                    },
                    descriptor: { type: "string" }
                  }
                }
              }
            }
          }
        },
        alignmentMatrix: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["objective", "assignmentTask", "rubricCriterion", "bloomLevel", "evidence"],
            properties: {
              objective: { type: "string" },
              assignmentTask: { type: "string" },
              rubricCriterion: { type: "string" },
              bloomLevel: { type: "string" },
              evidence: { type: "string" }
            }
          }
        },
        facultyNotes: { type: "array", items: { type: "string" } },
        studentInstructions: { type: "array", items: { type: "string" } }
      }
    }
  },
  $defs: {
    finding: {
      type: "object",
      additionalProperties: false,
      required: ["title", "evidence", "impact", "recommendation"],
      properties: {
        title: { type: "string" },
        evidence: { type: "string" },
        impact: { type: "string" },
        recommendation: { type: "string" }
      }
    }
  }
};

export async function POST(request: Request) {
  const input = await request.json().catch(() => null);

  if (!input) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      report: withGeneratedMetadata(mockGeneratedReport, "mock"),
      usedFallback: true,
      message: "OPENAI_API_KEY is not configured, so AR3 returned the built-in sample report."
    });
  }

  try {
    const model = process.env.OPENAI_MODEL || "gpt-5.5";
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content:
              "You are AR3, an instructional intelligence assistant for higher education. Analyze course objectives, module objectives, assignment instructions, rubric details, and instructor concerns. Produce rigorous, evidence-based instructional design review output for faculty. Keep professional judgment visible: recommendations assist faculty and instructional designers, not replace them."
          },
          {
            role: "user",
            content: `Create an Instructional Intelligence Report and Faculty Assessment Package from this input:\n\n${JSON.stringify(
              input,
              null,
              2
            )}`
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "ar3_instructional_intelligence_report",
            schema: reportSchema,
            strict: true
          }
        }
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("OpenAI report generation failed:", detail);
      return NextResponse.json({
        report: withGeneratedMetadata(mockGeneratedReport, "mock"),
        usedFallback: true,
        message: "OpenAI generation failed, so AR3 returned the built-in sample report."
      });
    }

    const payload = await response.json();
    const text = extractOutputText(payload);
    const parsed = JSON.parse(text) as GeneratedReport;
    const report = withGeneratedMetadata(normalizeReport(parsed), "openai");

    return NextResponse.json({ report, usedFallback: false });
  } catch (error) {
    console.error("Unexpected report generation error:", error);
    return NextResponse.json({
      report: withGeneratedMetadata(mockGeneratedReport, "mock"),
      usedFallback: true,
      message: "AR3 could not complete live generation, so it returned the built-in sample report."
    });
  }
}

function extractOutputText(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "output_text" in payload &&
    typeof payload.output_text === "string"
  ) {
    return payload.output_text;
  }

  const output = (payload as { output?: Array<{ content?: Array<{ text?: string }> }> }).output;
  const text = output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter(Boolean)
    .join("");

  if (!text) {
    throw new Error("OpenAI response did not include output text.");
  }

  return text;
}

function withGeneratedMetadata(report: GeneratedReport, source: "openai" | "mock") {
  return {
    ...report,
    id:
      source === "mock"
        ? `mock-${Date.now()}`
        : `ar3-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    generatedAt: new Date().toISOString(),
    source
  };
}
