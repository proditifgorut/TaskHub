import React from 'react';
import { CheckCircle2, Clock, PlayCircle, ListTodo } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import { motion } from 'framer-motion';

interface DashboardProps {
  onEditTask: (task: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onEditTask }) => {
  const { tasks, stats, updateTask, deleteTask } = useTasks();
  
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const upcomingTasks = tasks
    .filter(t => t.status !== 'selesai')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tugas"
          value={stats.total}
          icon={ListTodo}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          index={0}
        />
        <StatCard
          title="Selesai"
          value={stats.completed}
          icon={CheckCircle2}
          color="bg-gradient-to-br from-green-500 to-green-600"
          index={1}
        />
        <StatCard
          title="Sedang Dikerjakan"
          value={stats.inProgress}
          icon={PlayCircle}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          index={2}
        />
        <StatCard
          title="Belum Dimulai"
          value={stats.pending}
          icon={Clock}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold mb-4">Tugas Mendatang</h3>
          <div className="space-y-3">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  onEdit={onEditTask}
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Tidak ada tugas mendatang
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  onEdit={onEditTask}
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Belum ada tugas
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
