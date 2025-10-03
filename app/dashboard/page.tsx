"use client";

import type { Metadata } from "next";
import Dashboard from "@/components/dashboard";

// Note: Metadata can't be exported from client components
// Consider moving metadata to layout.tsx if needed

export default function DashboardPage() {
  return <Dashboard />;
}