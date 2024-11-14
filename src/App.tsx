import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { TaskInput } from './components/TaskInput';
import { TaskFilters } from './components/TaskFilters';
import { TaskItem } from './components/TaskItem';
import { Menu, Bell } from 'lucide-react';
import { AdminSidebar } from './components/AdminSidebar';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showCompleted, setShowCompleted] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = ['İş', 'Kişisel', 'Alışveriş', 'Sağlık', 'Diğer'];

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      description: '',
      priority: 'Orta',
      category: 'Kişisel',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false,
      subTasks: []
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addSubTask = (taskId: string, subTaskTitle: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            subTasks: [
              ...task.subTasks,
              { id: Date.now().toString(), title: subTaskTitle, completed: false }
            ]
          }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory !== 'Tümü' && task.category !== selectedCategory) return false;
    if (!showCompleted && task.completed) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Tasks</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            <TaskInput
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
            />

            <TaskFilters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showCompleted={showCompleted}
              setShowCompleted={setShowCompleted}
            />

            <div className="space-y-4">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  toggleTask={toggleTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  addSubTask={addSubTask}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;