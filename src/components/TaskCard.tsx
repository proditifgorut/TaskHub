import React from 'react';
import { Task } from '../types';
import { Calendar, Flag, Tag, Trash2, Edit, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  rendah: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  sedang: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  tinggi: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const categoryColors = {
  pekerjaan: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  pribadi: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  belajar: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
  lainnya: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400',
};

const statusLabels = {
  belum: 'Belum Dimulai',
  proses: 'Sedang Dikerjakan',
  selesai: 'Selesai',
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete, onEdit }) => {
  const toggleStatus = () => {
    const statusOrder: Task['status'][] = ['belum', 'proses', 'selesai'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    
    onUpdate(task.id, {
      status: nextStatus,
      completedAt: nextStatus === 'selesai' ? new Date().toISOString() : undefined,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 card-hover border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`text-base sm:text-lg font-semibold mb-2 ${task.status === 'selesai' ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {task.description}
          </p>
        </div>
        <button
          onClick={toggleStatus}
          className={`ml-2 p-2 rounded-lg transition-all ${
            task.status === 'selesai'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Check size={18} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          <Flag size={12} className="inline mr-1" />
          {task.priority}
        </span>
        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
          <Tag size={12} className="inline mr-1" />
          {task.category}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Calendar size={14} />
          <span>{new Date(task.dueDate).toLocaleDateString('id-ID')}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs">
            {statusLabels[task.status]}
          </span>
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
          >
            <Edit size={16} className="text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <Trash2 size={16} className="text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
