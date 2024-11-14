import { CheckSquare, Square, Plus } from 'lucide-react';
import { SubTask } from '../types';

interface SubTaskListProps {
  subTasks: SubTask[];
  taskId: string;
  updateTask: (taskId: string, updates: unknown) => void;
  addSubTask: (taskId: string, title: string) => void;
}

export function SubTaskList({ subTasks, taskId, updateTask, addSubTask }: SubTaskListProps) {
  return (
    <div className="pl-4 border-l-2 border-gray-200">
      {subTasks.map(subTask => (
        <div key={subTask.id} className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              updateTask(taskId, {
                subTasks: subTasks.map(st =>
                  st.id === subTask.id ? { ...st, completed: !st.completed } : st
                )
              })
            }
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            {subTask.completed ? <CheckSquare size={16} /> : <Square size={16} />}
          </button>
          <span
            className={`text-sm ${
              subTask.completed ? 'line-through text-gray-400' : 'text-gray-600'
            }`}
          >
            {subTask.title}
          </span>
        </div>
      ))}
      <button
        onClick={() => {
          const subTaskTitle = window.prompt('Alt görev başlığı:');
          if (subTaskTitle) addSubTask(taskId, subTaskTitle);
        }}
        className="text-sm text-purple-600 hover:text-purple-700 mt-2 flex items-center gap-1"
      >
        <Plus size={16} />
        Alt Görev Ekle
      </button>
    </div>
  );
}