import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import { Shell } from "@/components/Brand";
import { Badge, Card } from "@/components/ui";

const pillars = [
  {
    title: "Analyze",
    text: "Understand the instructional design.",
    icon: Brain,
    tone: "text-analyze",
    bg: "bg-purple-50",
    ring: "ring-purple-200",
    line: "from-purple-600 to-purple-400"
  },
  {
    title: "Review",
    text: "Identify strengths and gaps.",
    icon: FileCheck2,
    tone: "text-review",
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    line: "from-blue-600 to-blue-400"
  },
  {
    title: "Recommend",
    text: "Provide evidence-based improvements.",
    icon: Sparkles,
    tone: "text-recommend",
    bg: "bg-green-50",
    ring: "ring-green-200",
    line: "from-green-600 to-green-400"
  },
  {
    title: "Rebuild",
    text: "Generate an aligned assignment package.",
    icon: GraduationCap,
    tone: "text-rebuild",
    bg: "bg-orange-50",
    ring: "ring-orange-200",
    line: "from-orange-600 to-orange-400"
  }
];

const proofPoints = [
  { label: "Align", detail: "to objectives", icon: Target, tone: "text-analyze" },
  { label: "Elevate", detail: "academic rigor", icon: BarChart3, tone: "text-review" },
  { label: "Ensure", detail: "assessment quality", icon: ShieldCheck, tone: "text-recommend" },
  { label: "Empower", detail: "educators", icon: Users, tone: "text-rebuild" }
];

export default function Dashboard() {
  return (
    <Shell active="Dashboard">
      <section className="hero-panel brand-wave rounded-[2rem] border border-slate-200 p-6 shadow-soft lg:p-10">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <img
              src="/brand/ar3-logo.png"
              alt="AR3 Technologies logo"
              className="h-28 w-28 rounded-3xl bg-white object-contain p-2 shadow-card ring-1 ring-slate-200"
            />
            <div className="brand-gradient-line mt-7 max-w-sm" />
            <h1 className="mt-6 max-w-2xl text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
              Intelligent review. Actionable insight. Stronger learning.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              AR<sup>3</sup> helps educators design rigorous, aligned, and student-centered
              learning experiences.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/new-report"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                Start New Report <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#3f2ca0] shadow-card">
                Review. Align. Elevate Learning.
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className={`grid grid-cols-[4.5rem_1fr] items-center gap-4 rounded-[2rem] border border-white/80 ${pillar.bg} p-4 shadow-card ring-1 ${pillar.ring}`}
                >
                  <div className="relative">
                    <span className="absolute -left-1 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-extrabold shadow-card">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-card ${pillar.tone}`}>
                      <Icon className="h-10 w-10" />
                    </span>
                  </div>
                  <div>
                    <div className={`h-1 rounded-full bg-gradient-to-r ${pillar.line}`} />
                    <h2 className={`mt-3 text-3xl font-extrabold ${pillar.tone}`}>{pillar.title}</h2>
                    <p className="mt-2 text-base text-slate-700">{pillar.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4" aria-label="AR3 commitments">
        {proofPoints.map((point) => {
          const Icon = point.icon;
          return (
            <Card key={point.label} className="text-center">
              <Icon className={`mx-auto h-9 w-9 ${point.tone}`} />
              <h2 className="mt-3 text-base font-extrabold uppercase tracking-[0.14em] text-ink">
                {point.label}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{point.detail}</p>
            </Card>
          );
        })}
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
        <Card>
          <Badge tone="purple">AI Rigor Review & Recommendation Assistant</Badge>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">
            Instructional intelligence for higher education
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Built for faculty, instructional designers, and academic technology teams, AR<sup>3</sup>
            turns assignment materials into evidence-rich reports, targeted recommendations, and
            rebuilt assessment packages.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["AI-powered", "Fast review with transparent evidence."],
              ["Instructionally grounded", "Maps objectives, rigor, and rubric quality."],
              ["Built for educators", "Keeps faculty judgment at the center."]
            ].map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <CheckCircle2 className="h-5 w-5 text-recommend" />
                <h3 className="mt-3 font-bold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute right-6 top-6 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            North Star feature
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Instructional Intelligence Score
          </p>
          <h2 className="mt-5 text-6xl font-extrabold text-ink">91<span className="text-2xl text-slate-500">/100</span></h2>
          <div className="brand-gradient-line mt-5" />
          <div className="mt-6 space-y-3">
            {["Strong objective alignment", "Appropriate cognitive rigor", "Comprehensive assessment coverage"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-green-50 p-3 text-sm font-semibold text-green-800">
                <CheckCircle2 className="h-4 w-4" /> {item}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="overflow-hidden p-4">
          <img
            src="/brand/ar3-motto.png"
            alt="AR3 what we do overview"
            className="mx-auto h-auto max-h-[720px] w-full object-contain"
          />
        </Card>
        <Card className="overflow-hidden p-0">
          <img
            src="/brand/ar3-roadmap.png"
            alt="AR3 product roadmap"
            className="h-full min-h-[360px] w-full object-cover object-top"
          />
        </Card>
      </section>
    </Shell>
  );
}
