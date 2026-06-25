import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="AR3 home">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1 shadow-card ring-1 ring-slate-200">
        <img
          src="/brand/ar3-logo.png"
          alt=""
          className="h-full w-full rounded-xl object-contain"
        />
      </span>
      <span>
        <span className="block text-sm font-extrabold uppercase tracking-[0.18em] text-ink">
          AR<sup>3</sup> Technologies
        </span>
        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#3f2ca0]">
          Instructional Intelligence
        </span>
      </span>
    </Link>
  );
}

export function Shell({
  children,
  active = "Dashboard"
}: {
  children: React.ReactNode;
  active?: string;
}) {
  const nav = [
    ["Dashboard", "/"],
    ["New Report", "/new-report"],
    ["Report", "/report"],
    ["Assessment Package", "/assessment-package"]
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/88 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Brand />
          <nav className="flex flex-wrap items-center gap-2" aria-label="Primary">
            {nav.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === label
                    ? "bg-ink text-white shadow-card"
                    : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">{children}</main>
    </div>
  );
}
