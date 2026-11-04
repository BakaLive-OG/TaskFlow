"use client";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";

export function TaskForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await api.create(title, description);
      setTitle("");
      setDescription("");
      onCreated();
    } catch {
      // Keep the entered details for another attempt.
    } finally {
      setSaving(false);
    }
  }

  return <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold">Add a task</h2>
    <p className="mt-1 text-sm text-slate-500">Get an idea out of your head and into your plan.</p>
    <label htmlFor="title" className="mt-5 block text-sm font-medium">Title</label>
    <input id="title" required maxLength={255} value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs doing?" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-indigo-500" />
    <label htmlFor="description" className="mt-4 block text-sm font-medium">Description <span className="font-normal text-slate-400">optional</span></label>
    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Add a little context" className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-indigo-500" />
    <button disabled={saving} className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-60">{saving ? "Adding…" : "Add task"}</button>
  </form>;
}
