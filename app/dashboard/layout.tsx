import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleep Tracker",
  description: "Track and analyze your sleep patterns",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
