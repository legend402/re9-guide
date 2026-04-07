'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';

interface WeaponChartProps {
  comparedWeapons: Array<{
    id: string;
    name_cn: string;
    stats?: {
      power?: number | string;
      stability?: number | string;
      precision?: number | string;
      rate_of_fire?: number | string;
      reload_speed?: number | string;
    };
  }>;
  compareType: 'stats' | 'radar';
}

const colors = ['#7C3AED', '#F43F5E', '#3B82F6'];

export default function WeaponChart({ comparedWeapons, compareType }: WeaponChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] flex items-center justify-center text-text-muted">
        加载图表中...
      </div>
    );
  }

  // Helper to convert stat value to number
  const toNumber = (val: number | string | undefined): number => {
    if (val === undefined) return 0;
    return typeof val === 'number' ? val : parseFloat(val) || 0;
  };

  const chartData = [
    { name: '威力', ...comparedWeapons.reduce((acc, w) => ({ ...acc, [w.name_cn]: toNumber(w.stats?.power) }), {}) },
    { name: '稳定性', ...comparedWeapons.reduce((acc, w) => ({ ...acc, [w.name_cn]: toNumber(w.stats?.stability) }), {}) },
    { name: '精准度', ...comparedWeapons.reduce((acc, w) => ({ ...acc, [w.name_cn]: toNumber(w.stats?.precision) }), {}) },
    { name: '射速', ...comparedWeapons.reduce((acc, w) => ({ ...acc, [w.name_cn]: toNumber(w.stats?.rate_of_fire) }), {}) },
    { name: '装填', ...comparedWeapons.reduce((acc, w) => ({ ...acc, [w.name_cn]: toNumber(w.stats?.reload_speed) }), {}) },
  ];

  const radarData = comparedWeapons.map((w) => ({
    name: w.name_cn,
    威力: toNumber(w.stats?.power) * 20,
    稳定性: toNumber(w.stats?.stability) * 20,
    精准度: toNumber(w.stats?.precision) * 20,
    射速: toNumber(w.stats?.rate_of_fire) * 20,
    装填: toNumber(w.stats?.reload_speed) * 20,
  }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        {compareType === 'stats' ? (
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D2D44" />
            <XAxis dataKey="name" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A2E',
                border: '1px solid #2D2D44',
                borderRadius: '8px',
              }}
            />
            <Legend />
            {comparedWeapons.map((w, i) => (
              <Bar key={w.id} dataKey={w.name_cn} fill={colors[i]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        ) : (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#2D2D44" />
            <PolarAngleAxis dataKey="name" stroke="#94A3B8" />
            <PolarRadiusAxis stroke="#2D2D44" />
            <Legend />
            {comparedWeapons.map((w, i) => (
              <Radar
                key={w.id}
                name={w.name_cn}
                dataKey={w.name_cn}
                stroke={colors[i]}
                fill={colors[i]}
                fillOpacity={0.3}
              />
            ))}
          </RadarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
