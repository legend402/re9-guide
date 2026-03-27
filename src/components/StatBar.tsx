'use client';

interface StatBarProps {
  label: string;
  value: number | string;
  max?: number;
  color?: string;
}

export default function StatBar({ label, value, max = 5, color = 'bg-primary' }: StatBarProps) {
  const numValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;
  const percentage = Math.min((numValue / max) * 100, 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-primary font-medium">{value}</span>
      </div>
      <div className="stat-bar">
        <div 
          className={`stat-bar-fill ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
