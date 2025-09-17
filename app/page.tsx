"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 bg-white/70 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl">
            <span className="text-indigo-600">RMG</span>Fraud
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold"
        >
          Protect the Ready-Made Garments Industry from Fraud
        </motion.h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          A private portal where verified factories, suppliers, and buyers
          report and review fraud or misconduct with evidence and fairness.
        </p>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-16 max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Feature
          icon={<ShieldAlert className="w-5 h-5 text-indigo-600" />}
          title="Secure & Private"
          desc="Only verified members can submit or view reports."
        />
        <Feature
          icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />}
          title="Evidence Based"
          desc="Every claim must include documents or audit trails."
        />
        <Feature
          icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />}
          title="Fair Process"
          desc="Subjects get notified and can appeal before records publish."
        />
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} RMGFraud. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl border bg-white shadow-sm text-left">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  );
}