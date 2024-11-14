import React from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  newTask: string;
  setNewTask: (task: string) => void;
  addTask: () => void;
}

export function TaskInput({ newTask, setNewTask, addTask }: TaskInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Yeni görev ekle..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addTask}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Ekle
        </button>
      </div>
    </div>
  );
}