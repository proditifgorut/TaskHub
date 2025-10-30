import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import Tasks from './views/Tasks';
import Calendar from './views/Calendar';
import Settings from './views/Settings';
import TaskModal from './components/TaskModal';
import { Task } from './types';
import { useTasks } from './context/TaskContext';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { addTask, updateTask } = useTasks();

  const handleOpenModal = (task?: Task) => {
    if (task) {
      setEditingTask(task);
    } else {
      setEditingTask(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    handleCloseModal();
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onEditTask={handleOpenModal} />;
      case 'tasks':
        return <Tasks onAddTask={() => handleOpenModal()} onEditTask={handleOpenModal} />;
      case 'calendar':
        return <Calendar />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onEditTask={handleOpenModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <div className="lg:ml-64">
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          {renderView()}
        </main>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
        editTask={editingTask}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
