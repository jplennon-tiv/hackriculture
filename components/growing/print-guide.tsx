"use client";
import { Printer } from "lucide-react";
export function PrintGuide() {
  return <button type="button" className="guide-print" onClick={() => window.print()}><Printer size={17} aria-hidden="true"/>Print this guide</button>;
}
