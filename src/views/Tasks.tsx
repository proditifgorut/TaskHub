import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import { TaskStatus, TaskCategory, TaskPriority, Task } from '../types';
import { motion } from 'framer-motion';

interface TasksProps {
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

const Tasks: React.FC<TasksProps> = ({ onAddTask, onEditTask }) => {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<TaskCategory | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Semua Tugas</h2>
        <button
          onClick={onAddTask}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          <span>Tambah Tugas</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari tugas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'all')}
                className="bg-transparent border-none focus:ring-0 text-sm"
              >
                <option value="all">Semua Status</option>
                <option value="belum">Belum Dimulai</option>
                <option value="proses">Sedang Dikerjakan</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as TaskCategory | 'all')}
              className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">Semua Kategori</option>
              <option value="pekerjaan">Pekerjaan</option>
              <option value="pribadi">Pribadi</option>
              <option value="belajar">Belajar</option>
              <option value="lainnya">Lainnya</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as TaskPriority | 'all')}
              className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">Semua Prioritas</option>
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onEdit={onEditTask}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchTerm || filterStatus !== 'all' || filterCategory !== 'all' || filterPriority !== 'all'
                  ? 'Tidak ada tugas yang sesuai dengan filter'
                  : 'Belum ada tugas. Klik tombol "Tambah Tugas" untuk memulai!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
