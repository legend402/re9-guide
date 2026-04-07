'use client';

import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import { getWeaponData } from '@/lib/data';
import { useState } from 'react';
import { Scale, Target, BarChart3 } from 'lucide-react';

// 动态导入图表组件，禁用 SSR
const WeaponChart = dynamic(
  () => import('@/components/WeaponChart'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center text-text-muted">
        加载图表中...
      </div>
    ),
  },
);

export default function ComparePage() {
  const { weapons, recommended_loadouts } = getWeaponData();
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([]);
  const [compareType, setCompareType] = useState<'stats' | 'radar'>('stats');

  const weaponsWithStats = weapons.filter((w) => w.stats && typeof w.stats.power === 'number');

  const handleWeaponToggle = (weaponId: string) => {
    if (selectedWeapons.includes(weaponId)) {
      setSelectedWeapons(selectedWeapons.filter((id) => id !== weaponId));
    } else if (selectedWeapons.length < 3) {
      setSelectedWeapons([...selectedWeapons, weaponId]);
    }
  };

  const comparedWeapons = weaponsWithStats.filter((w) => selectedWeapons.includes(w.id));

  const colors = ['#7C3AED', '#F43F5E', '#3B82F6'];

  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="font-heading text-4xl sm:text-5xl text-text-primary mb-4">
              数据对比
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              武器对比工具和装备配置推荐
            </p>
            <div className="section-divider max-w-md mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* Weapon Selector */}
      <section className="py-6">
        <div className="container-custom">
          <div className="card">
            <h2 className="font-heading text-xl text-text-primary mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              选择武器进行对比 (最多3个)
            </h2>
            <div className="flex flex-wrap gap-2">
              {weaponsWithStats.map((weapon) => (
                <button
                  key={weapon.id}
                  type="button"
                  onClick={() => handleWeaponToggle(weapon.id)}
                  disabled={!selectedWeapons.includes(weapon.id) && selectedWeapons.length >= 3}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedWeapons.includes(weapon.id)
                      ? 'bg-primary text-white'
                      : selectedWeapons.length >= 3
                        ? 'bg-surface-hover text-text-muted cursor-not-allowed'
                        : 'bg-surface text-text-secondary hover:text-text-primary border border-border'
                  }`}
                >
                  {weapon.name_cn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Charts */}
      {comparedWeapons.length > 0 && (
        <section className="py-6">
          <div className="container-custom">
            <div className="flex justify-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => setCompareType('stats')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  compareType === 'stats'
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary border border-border'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                柱状图
              </button>
              <button
                type="button"
                onClick={() => setCompareType('radar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  compareType === 'radar'
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary border border-border'
                }`}
              >
                <Target className="w-4 h-4" />
                雷达图
              </button>
            </div>

            <div className="card">
              <h3 className="font-heading text-xl text-text-primary mb-6 text-center">
                武器属性对比
              </h3>
              <WeaponChart comparedWeapons={comparedWeapons} compareType={compareType} />
            </div>

            {/* Detailed Comparison Table */}
            <div className="card mt-6">
              <h3 className="font-heading text-xl text-text-primary mb-4">详细数据对比</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-text-muted">属性</th>
                      {comparedWeapons.map((w, i) => (
                        <th key={w.id} className="text-left py-3 px-4" style={{ color: colors[i] }}>
                          {w.name_cn}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: '类型', key: 'type' },
                      { label: '威力', key: 'power' },
                      { label: '稳定性', key: 'stability' },
                      { label: '精准度', key: 'precision' },
                      { label: '射速', key: 'rate_of_fire' },
                      { label: '装填速度', key: 'reload_speed' },
                      { label: '弹容量', key: 'ammo_capacity' },
                      { label: '弹药类型', key: 'ammo_type' },
                    ].map((row) => (
                      <tr key={row.key} className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">{row.label}</td>
                        {comparedWeapons.map((w) => (
                          <td key={w.id} className="py-3 px-4 text-text-primary">
                            {row.key === 'type'
                              ? w.type
                              : w.stats && row.key in w.stats
                                ? String(w.stats[row.key as keyof typeof w.stats])
                                : row.key === 'ammo_type'
                                  ? w.ammo_type
                                  : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recommended Loadouts */}
      <section className="py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl text-text-primary mb-2">推荐装备配置</h2>
            <p className="text-text-secondary">根据游戏进度和玩法的装备建议</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leon Early */}
            <div className="card border-red-500/30">
              <h3 className="font-heading text-xl text-red-400 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                里昂 - 前期
              </h3>
              <div className="space-y-3">
                {Object.entries(recommended_loadouts.leon_early).map(([slot, weapon]) => (
                  <div key={slot} className="flex items-center justify-between p-3 bg-surface-hover rounded">
                    <span className="text-text-muted capitalize">{slot}</span>
                    <span className="text-text-primary">{weapon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leon Mid */}
            <div className="card border-red-500/30">
              <h3 className="font-heading text-xl text-red-400 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                里昂 - 中期
              </h3>
              <div className="space-y-3">
                {Object.entries(recommended_loadouts.leon_mid).map(([slot, weapon]) => (
                  <div key={slot} className="flex items-center justify-between p-3 bg-surface-hover rounded">
                    <span className="text-text-muted capitalize">{slot}</span>
                    <span className="text-text-primary">{weapon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grace */}
            <div className="card border-blue-500/30">
              <h3 className="font-heading text-xl text-blue-400 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                格蕾丝配置
              </h3>
              <div className="space-y-3">
                {Object.entries(recommended_loadouts.grace)
                  .filter(([k]) => k !== 'note')
                  .map(([slot, weapon]) => (
                    <div key={slot} className="flex items-center justify-between p-3 bg-surface-hover rounded">
                      <span className="text-text-muted capitalize">{slot}</span>
                      <span className="text-text-primary">{String(weapon)}</span>
                    </div>
                  ))}
              </div>
              <p className="text-text-muted text-sm mt-4">{recommended_loadouts.grace.note}</p>
            </div>

            {/* Speedrun */}
            <div className="card border-purple-500/30">
              <h3 className="font-heading text-xl text-purple-400 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                速通配置
              </h3>
              <div className="space-y-3">
                {Object.entries(recommended_loadouts.speedrun).map(([slot, item]) => (
                  <div key={slot} className="flex items-center justify-between p-3 bg-surface-hover rounded">
                    <span className="text-text-muted capitalize">{slot}</span>
                    <span className="text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
