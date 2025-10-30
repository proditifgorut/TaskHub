import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-4 rounded-lg ${color}`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
