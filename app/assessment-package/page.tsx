"use client";

import { useEffect, useState } from "react";
import { Copy, Download, Printer } from "lucide-react";
import { Shell } from "@/components/Brand";
import { Badge, Card } from "@/components/ui";
import {
  GeneratedReport,
  REPORT_STORAGE_KEY,
  mockGeneratedReport,
  rubricToText
} from "@/lib/report";

export default function AssessmentPackagePage() {
  const [report, setReport] = useState<GeneratedReport>(mockGeneratedReport);
  const [copied, setCopied] = useState<"rubric" | "matrix" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(REPORT_STORAGE_KEY);
    if (stored) {
      setReport(JSON.parse(stored) as GeneratedReport);
    }
  }, []);

  async function copyRubric() {
    await navigator.clipboard.writeText(rubricToText(report));
    setCopied("rubric");
    window.setTimeout(() => setCopied(null), 1600);
  }

  async function copyMatrix() {
    await navigator.clipboard.writeText(
      report.assessmentPackage.alignmentMatrix
        .map(
          (row) =>
            `${row.objective}\t${row.assignmentTask}\t${row.rubricCriterion}\t${row.bloomLevel}\t${row.evidence}`
        )
        .join("\n")
    );
    setCopied("matrix");
    window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <Shell active="Assessment Package">
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-card">
        <div className="brand-gradient-line mb-6 max-w-md" />
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Badge tone="orange">Rebuild</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">
              Faculty Assessment Package
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              AR3 moves beyond review by generating a revised assignment, aligned rubric,
              student-facing instructions, and a transparent alignment matrix.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-card">
              <Download className="h-4 w-4" /> Export PDF
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-card">
              <Printer className="h-4 w-4" /> Print Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <h2 className="text-2xl font-semibold text-ink">Revised Assignment Prompt</h2>
          <p className="mt-4 rounded-2xl bg-white p-5 leading-7 text-slate-700">
            {report.assessmentPackage.revisedAssignmentPrompt}
          </p>
        </Card>

        <Card>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-semibold text-ink">AI-Generated Rubric</h2>
            <button
              type="button"
              onClick={copyRubric}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
            >
              <Copy className="h-4 w-4" /> {copied === "rubric" ? "Copied" : "Copy Rubric"}
            </button>
          </div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[920px] border-collapse bg-white text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Criterion</th>
                  <th className="px-4 py-3 font-semibold">Exemplary</th>
                  <th className="px-4 py-3 font-semibold">Proficient</th>
                  <th className="px-4 py-3 font-semibold">Developing</th>
                  <th className="px-4 py-3 font-semibold">Beginning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.assessmentPackage.rubric.map((criterion) => (
                  <tr key={criterion.criterion}>
                    <td className="px-4 py-4 font-semibold text-ink">
                      {criterion.criterion}
                      <span className="block text-xs text-slate-500">{criterion.points} pts</span>
                    </td>
                    {["Exemplary", "Proficient", "Developing", "Beginning"].map((level) => (
                      <td key={level} className="px-4 py-4 text-slate-600">
                        {criterion.levels.find((item) => item.level === level)?.descriptor || "Descriptor pending."}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-semibold text-ink">Alignment Matrix</h2>
          <button
            type="button"
            onClick={copyMatrix}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            <Copy className="h-4 w-4" /> {copied === "matrix" ? "Copied" : "Copy Alignment Matrix"}
          </button>
        </div>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[920px] border-collapse bg-white text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Course Learning Objective</th>
                <th className="px-4 py-3 font-semibold">Assignment Task</th>
                <th className="px-4 py-3 font-semibold">Rubric Criterion</th>
                <th className="px-4 py-3 font-semibold">Bloom Level</th>
                <th className="px-4 py-3 font-semibold">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {report.assessmentPackage.alignmentMatrix.map((row) => (
                <tr key={`${row.objective}-${row.assignmentTask}`}>
                  <td className="px-4 py-4 font-semibold text-ink">{row.objective}</td>
                  <td className="px-4 py-4 text-slate-600">{row.assignmentTask}</td>
                  <td className="px-4 py-4 text-slate-600">{row.rubricCriterion}</td>
                  <td className="px-4 py-4"><Badge tone="purple">{row.bloomLevel}</Badge></td>
                  <td className="px-4 py-4 text-slate-600">{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold text-ink">Faculty Notes</h2>
          <ul className="mt-4 space-y-3">
            {report.assessmentPackage.facultyNotes.map((note) => (
              <li key={note} className="rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-900">
                {note}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-ink">Student-Facing Instructions</h2>
          <ol className="mt-4 space-y-3">
            {report.assessmentPackage.studentInstructions.map((instruction, index) => (
              <li key={instruction} className="flex gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                  {index + 1}
                </span>
                {instruction}
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </Shell>
  );
}
