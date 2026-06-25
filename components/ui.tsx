import { CheckCircle2 } from "lucide-react";

export function Badge({
  children,
  tone = "slate"
}: {
  children: React.ReactNode;
  tone?: "purple" | "blue" | "green" | "orange" | "slate";
}) {
  const tones = {
    purple: "bg-purple-50 text-purple-700 ring-purple-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    green: "bg-green-50 text-green-700 ring-green-200",
    orange: "bg-orange-50 text-orange-700 ring-orange-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Card({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`glass-card rounded-3xl p-6 ${className}`}>{children}</section>;
}

export function Completion({ done }: { done: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        done ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      {done && <CheckCircle2 className="h-3.5 w-3.5" />}
      {done ? "Complete" : "Needs input"}
    </span>
  );
}
