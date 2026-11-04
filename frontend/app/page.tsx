"use client";
import { useCallback, useEffect, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskList } from "@/components/TaskList";
import { api } from "@/lib/api";
import type { Filter, Task, TaskStatus } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reload = useCallback(async () => {
    try { setTasks(await api.list()); setError(false); }
    catch { setError(true); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void reload(); }, [reload]);

  async function changeStatus(id: number, status: TaskStatus) {
    try { const updated = await api.updateStatus(id, status); setTasks(current => current.map(task => task.id === id ? updated : task)); }
    catch { setError(true); }
  }
  async function remove(id: number) {
    try { await api.remove(id); setTasks(current => current.filter(task => task.id !== id)); }
    catch { setError(true); }
  }

  const visible = tasks.filter(task => filter === "all" || task.status === filter || (filter === "in_progress" && task.status === "done"));
  return <main className="mx-auto max-w-6xl px-5 py-10">
    <header className="mb-9 flex items-center justify-between"><div><div className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">Your workspace</div><h1 className="mt-1 text-4xl font-bold tracking-tight">TaskFlow</h1><p className="mt-2 text-slate-500">Keep your work moving, one task at a time.</p></div><div className="hidden rounded-xl bg-indigo-100 px-4 py-3 text-indigo-700 sm:block">✦ Focus on what matters</div></header>
    <section aria-label="Task summary" className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">{["Total tasks", "To Do", "In Progress", "Completed"].map(label => <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-300">—</p></div>)}</section>
    <div className="grid gap-7 lg:grid-cols-[320px_1fr]"><aside><TaskForm onCreated={() => { if (filter === "all") void reload(); }} /></aside><section><div className="mb-5 flex flex-col gap-4"><div><h2 className="text-xl font-semibold">Your tasks</h2><p className="text-sm text-slate-500">A home for everything on your list.</p></div><input aria-label="Search tasks" placeholder="Search tasks..." className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-indigo-500" /><TaskFilters value={filter} onChange={setFilter} /></div>{loading ? <p className="py-10 text-center text-slate-500">Loading tasks…</p> : error ? <p className="py-10 text-center text-rose-600">Something went wrong.</p> : <TaskList tasks={visible} onStatus={changeStatus} onDelete={remove} />}</section></div>
  </main>;
}
