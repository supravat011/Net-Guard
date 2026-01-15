import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'rose' | 'amber';
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color, trend }) => {
  // Mapping simplified to a unified dark theme with colored accents
  const colors = {
    blue: {
      border: 'group-hover:border-blue-500/30',
      icon: 'text-blue-400',
      bg: 'bg-blue-500/10',
      trend: 'text-blue-400'
    },
    emerald: {
      border: 'group-hover:border-emerald-500/30',
      icon: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      trend: 'text-emerald-400'
    },
    rose: {
      border: 'group-hover:border-rose-500/30',
      icon: 'text-rose-400',
      bg: 'bg-rose-500/10',
      trend: 'text-rose-400'
    },
    amber: {
      border: 'group-hover:border-amber-500/30',
      icon: 'text-amber-400',
      bg: 'bg-amber-500/10',
      trend: 'text-amber-400'
    },
  };

  const c = colors[color];

  return (
    <div className={`group relative p-6 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-zinc-900/60 ${c.border}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-zinc-500 mb-2">{label}</p>
          <h3 className="text-3xl font-semibold text-white tracking-tight">{value}</h3>
          {trend && <p className={`text-xs mt-3 font-medium ${c.trend}`}>{trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${c.bg} border border-white/5`}>
          <Icon className={`h-5 w-5 ${c.icon}`} />
        </div>
      </div>
    </div>
  );
};