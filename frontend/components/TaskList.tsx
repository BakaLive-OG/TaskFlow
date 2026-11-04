import type { Task, TaskStatus } from "@/types/task";
import { TaskCard } from "./TaskCard";

export function TaskList({ tasks, onStatus, onDelete }: { tasks: Task[]; onStatus: (id: number, status: TaskStatus) => void; onDelete: (id: number) => void }) {
  return <div className="grid gap-3">{tasks.map(task => <TaskCard key={task.id} task={task} onStatus={onStatus} onDelete={onDelete} />)}</div>;
}
