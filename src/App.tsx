import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { TaskInput } from './components/TaskInput';
import { TaskFilters } from './components/TaskFilters';
import { TaskItem } from './components/TaskItem';
import { Header } from './components/header';
import { Footer } from './components/footer';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showCompleted, setShowCompleted] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Fennaver Yapılcaklar Listesi
        </h1>

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
      <Footer />
    </div>
  );
}

export default App;