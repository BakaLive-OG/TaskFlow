"use client";
import type { Task, TaskStatus } from "@/types/task";

const labels: Record<TaskStatus, string> = { todo: "To Do", in_progress: "In Progress", done: "Completed" };
const colors: Record<TaskStatus, string> = { todo: "bg-slate-100 text-slate-700", in_progress: "bg-amber-100 text-amber-800", done: "bg-emerald-100 text-emerald-800" };

export function TaskCard({ task, onStatus, onDelete }: { task: Task; onStatus: (id: number, status: TaskStatus) => void; onDelete: (id: number) => void }) {
  return <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold">{task.title}</h3>{task.description && <p className="mt-1 text-sm text-slate-500">{task.description}</p>}</div><span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${colors[task.status]}`}>{labels[task.status]}</span></div>
    <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4"><label className="text-sm text-slate-500">Status <select aria-label={`Status for ${task.title}`} value={task.status} onChange={e => onStatus(task.id, e.target.value as TaskStatus)} className="ml-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-700"><option value="todo">To Do</option><option value="in_progress">In Progress</option><option value="done">Completed</option></select></label><button onClick={() => onDelete(task.id)} className="text-sm font-medium text-rose-600 hover:text-rose-800">Delete</button></div>
  </article>;
}
