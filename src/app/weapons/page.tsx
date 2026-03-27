'use client';

import Layout from '@/components/Layout';
import Tag from '@/components/Tag';
import StatBar from '@/components/StatBar';
import { getWeaponData } from '@/lib/data';
import { useState } from 'react';
import { Target, Sword, Zap, Shield, ChevronDown, ChevronUp } from 'lucide-react';

export default function WeaponsPage() {
  const { weapons, upgrade_system, recommended_loadouts } = getWeaponData();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedWeapon, setExpandedWeapon] = useState<string | null>(null);

  const weaponTypes = ['all', '手枪', '左轮', '霰弹枪', '冲锋枪', '狙击步枪', '突击步枪', '近战', '特殊武器'];

  const filteredWeapons = selectedType === 'all' 
    ? weapons 
    : weapons.filter(w => w.type === selectedType);

  const getWeaponIcon = (type: string) => {
    switch (type) {
      case '近战': return <Sword className="w-5 h-5" />;
      case '特殊武器': return <Zap className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getCharacterColor = (character: string) => {
    if (character.includes('格蕾丝')) return 'blue';
    if (character.includes('里昂')) return 'red';
    return 'purple';
  };

  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="font-heading text-4xl sm:text-5xl text-text-primary mb-4">
              武器图鉴
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              25种武器的详细数据、升级路线和装备推荐
            </p>
            <div className="section-divider max-w-md mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="font-heading text-3xl text-red-400 mb-1">{weapons.length}</div>
              <div className="text-text-secondary text-sm">总武器数</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-blue-400 mb-1">
                {weapons.filter(w => w.character.includes('格蕾丝')).length}
              </div>
              <div className="text-text-secondary text-sm">格蕾丝专用</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-red-400 mb-1">
                {weapons.filter(w => w.character.includes('里昂')).length}
              </div>
              <div className="text-text-secondary text-sm">里昂专用</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-purple-400 mb-1">
                {weapons.filter(w => w.character === '通用').length}
              </div>
              <div className="text-text-secondary text-sm">通用武器</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {weaponTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedType === type
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary hover:text-text-primary border border-border'
                }`}
              >
                {type === 'all' ? '全部' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Weapons Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWeapons.map((weapon) => {
              const isExpanded = expandedWeapon === weapon.id;
              const charColor = getCharacterColor(weapon.character);
              
              return (
                <div 
                  key={weapon.id} 
                  className={`card card-glow transition-all ${
                    charColor === 'blue' ? 'hover:border-blue-500/50' : 
                    charColor === 'red' ? 'hover:border-red-500/50' : 
                    'hover:border-purple-500/50'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        charColor === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                        charColor === 'red' ? 'bg-red-500/20 text-red-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {getWeaponIcon(weapon.type)}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg text-text-primary">{weapon.name_cn}</h3>
                        <p className="text-text-muted text-sm">{weapon.name_en}</p>
                      </div>
                    </div>
                    <Tag variant={charColor === 'blue' ? 'grace' : charColor === 'red' ? 'leon' : 'both'}>
                      {weapon.character}
                    </Tag>
                  </div>

                  {/* Type & Obtain */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-surface-hover rounded text-sm text-text-secondary">
                      {weapon.type}
                    </span>
                    <span className="px-2 py-1 bg-surface-hover rounded text-sm text-text-secondary">
                      {weapon.ammo_type}
                    </span>
                  </div>

                  <div className="text-text-secondary text-sm mb-4">
                    <span className="text-text-muted">获取方式: </span>
                    {weapon.obtain_method}
                  </div>

                  {/* Description */}
                  {weapon.description && (
                    <p className="text-text-secondary text-sm mb-4">{weapon.description}</p>
                  )}

                  {/* Stats */}
                  {weapon.stats && (
                    <div className="space-y-2 mb-4">
                      {weapon.stats.power && typeof weapon.stats.power === 'number' && (
                        <StatBar label="威力" value={weapon.stats.power} max={5} />
                      )}
                      {weapon.stats.stability && typeof weapon.stats.stability === 'number' && (
                        <StatBar label="稳定性" value={weapon.stats.stability} max={5} />
                      )}
                      {weapon.stats.precision && typeof weapon.stats.precision === 'number' && (
                        <StatBar label="精准度" value={weapon.stats.precision} max={5} />
                      )}
                      {weapon.stats.rate_of_fire && typeof weapon.stats.rate_of_fire === 'number' && (
                        <StatBar label="射速" value={weapon.stats.rate_of_fire} max={5} />
                      )}
                      {weapon.stats.reload_speed && typeof weapon.stats.reload_speed === 'number' && (
                        <StatBar label="装填速度" value={weapon.stats.reload_speed} max={5} />
                      )}
                      {weapon.stats.ammo_capacity && (
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">弹容量</span>
                          <span className="text-text-primary">{weapon.stats.ammo_capacity}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Expand Button */}
                  {weapon.upgrades && (
                    <button
                      onClick={() => setExpandedWeapon(isExpanded ? null : weapon.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 text-primary hover:text-primary-light transition-colors"
                    >
                      <span>{isExpanded ? '收起' : '查看升级'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}

                  {/* Upgrades */}
                  {isExpanded && weapon.upgrades && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-heading text-text-primary mb-3">升级路线</h4>
                      <div className="space-y-2">
                        {weapon.upgrades.map((upgrade, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-surface-hover rounded">
                            <div>
                              <div className="text-text-primary text-sm">{upgrade.name}</div>
                              <div className="text-text-muted text-xs">{upgrade.stats}</div>
                            </div>
                            <div className="text-cta font-medium">{upgrade.cost} pts</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Notes */}
                  {(weapon.special || weapon.note || weapon.recommendation) && (
                    <div className="mt-4 space-y-2">
                      {weapon.special && (
                        <div className="flex items-start gap-2 text-sm">
                          <Zap className="w-4 h-4 text-yellow-400 mt-0.5" />
                          <span className="text-text-secondary">{weapon.special}</span>
                        </div>
                      )}
                      {weapon.recommendation && (
                        <div className="flex items-start gap-2 text-sm">
                          <Shield className="w-4 h-4 text-green-400 mt-0.5" />
                          <span className="text-text-secondary">{weapon.recommendation}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended Loadouts */}
      <section className="py-12 bg-surface">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl text-text-primary mb-2">推荐装备配置</h2>
            <p className="text-text-secondary">不同阶段的装备建议</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leon Early */}
            <div className="card border-red-500/30">
              <h3 className="font-heading text-xl text-red-400 mb-4">里昂 - 前期配置</h3>
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
              <h3 className="font-heading text-xl text-red-400 mb-4">里昂 - 中期配置</h3>
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
              <h3 className="font-heading text-xl text-blue-400 mb-4">格蕾丝配置</h3>
              <div className="space-y-3">
                {Object.entries(recommended_loadouts.grace).map(([slot, weapon]) => (
                  <div key={slot} className="flex items-center justify-between p-3 bg-surface-hover rounded">
                    <span className="text-text-muted capitalize">{slot}</span>
                    <span className="text-text-primary">{weapon}</span>
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-sm mt-4">{recommended_loadouts.grace.note}</p>
            </div>

            {/* Speedrun */}
            <div className="card border-purple-500/30">
              <h3 className="font-heading text-xl text-purple-400 mb-4">速通推荐</h3>
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

      {/* Upgrade System */}
      <section className="py-12">
        <div className="container-custom">
          <div className="card">
            <h2 className="font-heading text-2xl text-text-primary mb-4">升级系统说明</h2>
            <p className="text-text-secondary mb-4">{upgrade_system.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-surface-hover rounded-lg">
                <h3 className="font-heading text-lg text-primary mb-2">Tier 1-2 升级</h3>
                <p className="text-text-secondary text-sm">{upgrade_system.tier_1_2}</p>
              </div>
              <div className="p-4 bg-surface-hover rounded-lg">
                <h3 className="font-heading text-lg text-primary mb-2">Tier 3 升级</h3>
                <p className="text-text-secondary text-sm">{upgrade_system.tier_3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
