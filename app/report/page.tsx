"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  Lightbulb,
  Target
} from "lucide-react";
import { Shell } from "@/components/Brand";
import { Badge, Card } from "@/components/ui";
import {
  GeneratedReport,
  REPORT_STORAGE_KEY,
  mockGeneratedReport,
  reportToText
} from "@/lib/report";

function scoreTone(score: number) {
  if (score >= 85) return "bg-green-100 text-green-800";
  if (score >= 60) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

const bloomColors = ["bg-slate-400", "bg-blue-400", "bg-green-500", "bg-analyze", "bg-orange-500", "bg-pink-500"];

export default function ReportPage() {
  const [report, setReport] = useState<GeneratedReport>(mockGeneratedReport);
  const [actions, setActions] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(REPORT_STORAGE_KEY);
    if (stored) {
      setReport(JSON.parse(stored) as GeneratedReport);
    }
  }, []);

  const kpis = useMemo(
    () => [
      {
        label: "Overall Instructional Intelligence Score",
        value: `${report.scores.overall}/100`,
        icon: Target,
        tone: "text-analyze"
      },
      {
        label: "Learning Objective Alignment",
        value: `${report.scores.learningObjectiveAlignment}%`,
        icon: CheckCircle2,
        tone: "text-recommend"
      },
      {
        label: "Bloom's Taxonomy Level",
        value: report.scores.bloomLevel,
        icon: Brain,
        tone: "text-analyze"
      },
      {
        label: "Academic Rigor",
        value: `${report.scores.academicRigor}%`,
        icon: BookOpenCheck,
        tone: "text-review"
      },
      {
        label: "Rubric Alignment",
        value: `${report.scores.rubricAlignment}%`,
        icon: FileText,
        tone: "text-rebuild"
      },
      {
        label: "Assessment Coverage",
        value: `${report.scores.assessmentCoverage}%`,
        icon: BarChart3,
        tone: "text-review"
      },
      {
        label: "AI Recommendations",
        value: String(report.recommendations.length),
        icon: Lightbulb,
        tone: "text-recommend"
      }
    ],
    [report]
  );

  async function copyReport() {
    await navigator.clipboard.writeText(reportToText(report));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Shell active="Report">
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-card">
        <div className="brand-gradient-line mb-6 max-w-md" />
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Badge tone={report.source === "openai" ? "green" : "orange"}>
              {report.source === "openai" ? "Generated with OpenAI" : "Sample fallback report"}
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{report.title}</h1>
            <p className="mt-3 text-slate-600">{report.subtitle}</p>
            <p className="mt-2 text-sm font-semibold text-green-700">{report.status}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-card"
            >
              <Download className="h-4 w-4" /> Export PDF
            </button>
            <button
              type="button"
              onClick={copyReport}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-card"
            >
              <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy Report"}
            </button>
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Report KPI cards">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className={index === 0 ? "md:col-span-2 bg-ink text-white" : ""}>
              <Icon className={`h-6 w-6 ${kpi.tone}`} aria-hidden="true" />
              <p className={`mt-5 text-3xl font-semibold ${index === 0 ? "text-white" : "text-ink"}`}>
                {kpi.value}
              </p>
              <p className={`mt-2 text-sm leading-5 ${index === 0 ? "text-slate-200" : "text-slate-600"}`}>
                {kpi.label}
              </p>
            </Card>
          );
        })}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card>
          <h2 className="text-2xl font-semibold text-ink">Bloom's Taxonomy Distribution</h2>
          <p className="mt-2 text-sm text-slate-600">
            AR3 estimates the cognitive demand represented across the assignment and rubric.
          </p>
          <div className="mt-6 flex h-6 overflow-hidden rounded-full bg-slate-100" aria-label="Bloom distribution">
            {report.bloomDistribution.map((item, index) => (
              <div
                key={item.label}
                className={item.color || bloomColors[index % bloomColors.length]}
                style={{ width: `${item.value}%` }}
                title={`${item.label}: ${item.value}%`}
              />
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {report.bloomDistribution.map((item, index) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white p-3">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span className={`h-3 w-3 rounded-full ${item.color || bloomColors[index % bloomColors.length]}`} />
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-ink">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-ink">Learning Objective Coverage</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full border-collapse bg-white text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Objective</th>
                  <th className="px-4 py-3 font-semibold">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.objectiveCoverage.map((row) => (
                  <tr key={`${row.clo}-${row.text}`}>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-ink">{row.clo}</span>
                      <span className="mt-1 block text-slate-600">{row.text}</span>
                      <span className="mt-2 block text-xs leading-5 text-slate-500">Evidence: {row.evidence}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreTone(row.score)}`}>
                        {row.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <FindingCard title="Strengths" items={report.findings.strengths} tone="green" />
        <FindingCard title="High-priority issues" items={report.findings.highPriorityIssues} tone="orange" />
        <FindingCard title="Medium-priority issues" items={report.findings.mediumPriorityIssues} tone="blue" />
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold text-ink">Recommendations</h2>
            <p className="mt-2 text-slate-600">
              Each recommendation includes the reason faculty can review before applying.
            </p>
          </div>
          <Link
            href="/assessment-package"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft"
          >
            View Assessment Package <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {report.recommendations.map((recommendation, index) => (
            <Card key={`${recommendation.title}-${index}`}>
              <Badge
                tone={
                  recommendation.priority.startsWith("High")
                    ? "orange"
                    : recommendation.priority.startsWith("Medium")
                      ? "blue"
                      : "green"
                }
              >
                {recommendation.priority}
              </Badge>
              <h3 className="mt-4 text-xl font-semibold text-ink">{recommendation.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                <span className="font-semibold text-ink">Reason: </span>
                {recommendation.reason}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                <span className="font-semibold text-ink">Expected impact: </span>
                {recommendation.expectedImpact}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Apply", "Modify", "Dismiss"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActions((current) => ({ ...current, [index]: label }))}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      actions[index] === label
                        ? "bg-ink text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Shell>
  );
}

function FindingCard({
  title,
  items,
  tone
}: {
  title: string;
  items: GeneratedReport["findings"]["strengths"];
  tone: "green" | "orange" | "blue";
}) {
  const toneClass = {
    green: "border-green-200 bg-green-50 text-green-800",
    orange: "border-orange-200 bg-orange-50 text-orange-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800"
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={`${item.title}-${item.evidence}`} className={`rounded-2xl border p-4 text-sm leading-6 ${toneClass[tone]}`}>
            <span className="block font-semibold">{item.title}</span>
            <span className="mt-2 block">Evidence: {item.evidence}</span>
            <span className="mt-2 block">Impact: {item.impact}</span>
            <span className="mt-2 block">Recommendation: {item.recommendation}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
