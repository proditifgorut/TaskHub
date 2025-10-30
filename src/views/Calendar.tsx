import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { motion } from 'framer-motion';

const Calendar: React.FC = () => {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const tasksByDate = useMemo(() => {
    const map = new Map();
    tasks.forEach(task => {
      const date = new Date(task.dueDate).toDateString();
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date).push(task);
    });
    return map;
  }, [tasks]);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    const blanks = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<div key={`blank-${i}`} className="p-2 sm:p-4" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toDateString();
      const dayTasks = tasksByDate.get(dateString) || [];
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.05 }}
          className={`p-2 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg min-h-[80px] sm:min-h-[100px] ${
            isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : 'bg-white dark:bg-gray-800'
          }`}
        >
          <div className={`text-sm sm:text-base font-semibold mb-2 ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className={`text-xs p-1 rounded truncate ${
                  task.status === 'selesai'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : task.status === 'proses'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                }`}
              >
                {task.title}
              </div>
            ))}
            {dayTasks.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{dayTasks.length - 2} lainnya
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return [...blanks, ...days];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
            <div key={day} className="text-center font-semibold text-sm sm:text-base p-2 text-gray-600 dark:text-gray-400">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Legenda</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-700"></div>
            <span className="text-sm">Belum Dimulai</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-yellow-100 dark:bg-yellow-900/30"></div>
            <span className="text-sm">Sedang Dikerjakan</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30"></div>
            <span className="text-sm">Selesai</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
