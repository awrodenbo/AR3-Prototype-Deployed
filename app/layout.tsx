import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AR³ Technologies",
  description: "AI Rigor Review & Recommendation Assistant prototype"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
