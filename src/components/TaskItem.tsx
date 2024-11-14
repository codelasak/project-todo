import React from 'react';
import { Calendar, Tag, CheckSquare, Square, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { SubTaskList } from './SubTaskList';

interface TaskItemProps {
  task: Task;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addSubTask: (taskId: string, title: string) => void;
}

export function TaskItem({ task, toggleTask, updateTask, deleteTask, addSubTask }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek': return 'text-red-600';
      case 'Orta': return 'text-yellow-600';
      case 'Düşük': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => toggleTask(task.id)}
          className="mt-1 text-gray-500 hover:text-purple-600 transition-colors"
        >
          {task.completed ? <CheckSquare className="h-6 w-6" /> : <Square className="h-6 w-6" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Tag size={16} />
              {task.category}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Calendar size={16} />
              {new Date(task.dueDate).toLocaleDateString('tr-TR')}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
          {task.description && <p className="text-gray-600 mb-4">{task.description}</p>}
          <SubTaskList
            subTasks={task.subTasks}
            taskId={task.id}
            updateTask={updateTask}
            addSubTask={addSubTask}
          />
        </div>
      </div>
    </div>
  );
}