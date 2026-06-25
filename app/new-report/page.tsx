"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ClipboardList, Loader2, WandSparkles } from "lucide-react";
import { Shell } from "@/components/Brand";
import { Badge, Card, Completion } from "@/components/ui";
import { GeneratedReport, REPORT_HISTORY_KEY, REPORT_STORAGE_KEY } from "@/lib/report";
import { ReportInputKey, sampleReportInput } from "@/lib/sample";

const sections: Array<{
  key: ReportInputKey;
  title: string;
  helper: string;
}> = [
  {
    key: "courseObjectives",
    title: "Course Learning Objectives",
    helper: "Paste course-level outcomes or learning objectives."
  },
  {
    key: "moduleObjectives",
    title: "Module Objectives",
    helper: "Add the module-level learning targets for this assignment."
  },
  {
    key: "assignmentInstructions",
    title: "Assignment Instructions",
    helper: "Paste the student-facing prompt or assignment description."
  },
  {
    key: "assignmentRubric",
    title: "Assignment Rubric",
    helper: "Add rubric criteria, performance levels, or a rubric summary."
  },
  {
    key: "instructionalConcerns",
    title: "High-Priority Instructional Concerns",
    helper: "Name the review priorities AR³ should emphasize."
  }
];

const progressSteps = [
  "Reading objectives",
  "Analyzing assignment",
  "Mapping rubric criteria",
  "Detecting Bloom's levels",
  "Reviewing assessment coverage",
  "Generating recommendations",
  "Building faculty assessment package"
];

function wordCount(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

export default function NewReportPage() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<ReportInputKey>("courseObjectives");
  const [values, setValues] = useState<Record<ReportInputKey, string>>({
    courseObjectives: "",
    moduleObjectives: "",
    assignmentInstructions: "",
    assignmentRubric: "",
    instructionalConcerns: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [generationMessage, setGenerationMessage] = useState<string | null>(null);

  const completed = useMemo(
    () => sections.filter((section) => values[section.key].trim().length > 0).length,
    [values]
  );

  const activeSection = sections.find((section) => section.key === activeKey)!;

  function updateValue(key: ReportInputKey, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function loadSample() {
    setValues(sampleReportInput);
  }

  async function generateReport() {
    localStorage.setItem("ar3-report-input", JSON.stringify(values));
    setIsGenerating(true);
    setGenerationMessage(null);
    setStepIndex(0);

    let index = 0;
    const timer = window.setInterval(() => {
      index = Math.min(index + 1, progressSteps.length - 1);
      setStepIndex(index);
    }, 700);

    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error("Report generation failed.");
      }

      const result = (await response.json()) as {
        report: GeneratedReport;
        usedFallback?: boolean;
        message?: string;
      };

      localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(result.report));
      saveReportToHistory(result.report);
      setStepIndex(progressSteps.length - 1);

      if (result.usedFallback && result.message) {
        setGenerationMessage(result.message);
        window.setTimeout(() => router.push("/report"), 1200);
      } else {
        router.push("/report");
      }
    } catch (error) {
      console.error(error);
      setGenerationMessage("AR3 could not generate a report. Check your connection and try again.");
      setIsGenerating(false);
    } finally {
      window.clearInterval(timer);
    }
  }

  return (
    <Shell active="New Report">
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-card">
        <div className="brand-gradient-line mb-6 max-w-sm" />
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Badge tone="blue">New Instructional Intelligence Report</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">
              Review an assessment package
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Add objectives, assignment instructions, rubric details, and instructional concerns.
              This prototype uses local state and mock AR³ analysis for the ENG 111 sample.
            </p>
          </div>
          <button
            type="button"
            onClick={loadSample}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-card transition hover:-translate-y-0.5"
          >
            <ClipboardList className="h-4 w-4" /> Load Sample ENG 111
          </button>
        </div>
      </div>

      {isGenerating ? (
        <Card className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-review">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-ink">
            Generating Instructional Intelligence Report
          </h2>
          <p className="mt-3 text-slate-600">Estimated time: 15-30 seconds</p>
          {generationMessage && (
            <p className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-900">
              {generationMessage}
            </p>
          )}
          <div className="mt-8 overflow-hidden rounded-full bg-slate-100">
            <div
              className="progress-stripes h-3 rounded-full bg-gradient-to-r from-analyze via-review to-recommend transition-all duration-500"
              style={{ width: `${Math.min(((stepIndex + 1) / progressSteps.length) * 100, 100)}%` }}
            />
          </div>
          <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {progressSteps.map((step, index) => (
              <li
                key={step}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                  index <= stepIndex
                    ? "border-blue-200 bg-blue-50 text-blue-800"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {step}
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card className="h-fit">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Input sections</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {completed}/5 complete
              </span>
            </div>
            <nav className="space-y-2" aria-label="Report input sections">
              {sections.map((section, index) => (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveKey(section.key)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    activeKey === section.key
                      ? "border-ink bg-ink text-white shadow-card"
                      : "border-slate-200 bg-white text-ink hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">
                    Step {index + 1}
                  </span>
                  <span className="mt-1 block font-semibold">{section.title}</span>
                </button>
              ))}
            </nav>
          </Card>

          <Card>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-2xl font-semibold text-ink">{activeSection.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{activeSection.helper}</p>
              </div>
              <Completion done={values[activeKey].trim().length > 0} />
            </div>
            <textarea
              value={values[activeKey]}
              onChange={(event) => updateValue(activeKey, event.target.value)}
              className="mt-6 min-h-[360px] w-full resize-y rounded-3xl border border-slate-200 bg-white p-5 text-base leading-7 text-ink shadow-inner"
              placeholder={`Paste ${activeSection.title.toLowerCase()} here...`}
            />
            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>{wordCount(values[activeKey])} words</span>
                <span aria-hidden="true">•</span>
                <button
                  type="button"
                  onClick={() => updateValue(activeKey, sampleReportInput[activeKey])}
                  className="font-semibold text-review hover:text-blue-800"
                >
                  Use sample text
                </button>
              </div>
              <button
                type="button"
                onClick={generateReport}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                <WandSparkles className="h-4 w-4" />
                Generate Instructional Intelligence Report
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>
      )}
    </Shell>
  );
}

function saveReportToHistory(report: GeneratedReport) {
  const existing = JSON.parse(localStorage.getItem(REPORT_HISTORY_KEY) || "[]") as GeneratedReport[];
  const next = [report, ...existing.filter((item) => item.id !== report.id)].slice(0, 12);
  localStorage.setItem(REPORT_HISTORY_KEY, JSON.stringify(next));
}
