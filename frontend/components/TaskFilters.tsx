"use client";
import type { Filter } from "@/types/task";

const choices: { value: Filter; label: string }[] = [
  { value: "all", label: "All" }, { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" }, { value: "done", label: "Completed" },
];

export function TaskFilters({ value, onChange }: { value: Filter; onChange: (value: Filter) => void }) {
  return <div aria-label="Filter tasks" className="flex flex-wrap gap-2">{choices.map(choice =>
    <button key={choice.value} onClick={() => onChange(choice.value)} className={`rounded-full px-4 py-2 text-sm font-medium ${value === choice.value ? "bg-indigo-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"}`}>{choice.label}</button>
  )}</div>;
}
