'use client';

import Layout from '@/components/Layout';
import Tag from '@/components/Tag';
import { getEnemyData } from '@/lib/data';
import { useState } from 'react';
import { Skull, Crown, AlertTriangle, Shield, Zap, Swords } from 'lucide-react';

export default function EnemiesPage() {
  const { common_enemies, bosses, enemy_behavior } = getEnemyData();
  const [activeTab, setActiveTab] = useState<'enemies' | 'bosses'>('enemies');

  const getThreatColor = (level: string) => {
    switch (level) {
      case '低': return 'text-green-400';
      case '中': return 'text-yellow-400';
      case '中高': return 'text-orange-400';
      case '高': return 'text-red-400';
      case '极高':
      case '最高': return 'text-cta';
      default: return 'text-text-secondary';
    }
  };

  return (
    <Layout isHomePage={false}>
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="font-heading text-4xl sm:text-5xl text-text-primary mb-4">
              敌人 / Boss
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              普通敌人弱点分析和9个Boss的详细打法攻略
            </p>
            <div className="section-divider max-w-md mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="font-heading text-3xl text-red-400 mb-1">{common_enemies.length}</div>
              <div className="text-text-secondary text-sm">普通敌人</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-cta mb-1">{bosses.length}</div>
              <div className="text-text-secondary text-sm">Boss数量</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-orange-400 mb-1">
                {common_enemies.filter(e => e.threat_level === '极高' || e.threat_level === '高').length}
              </div>
              <div className="text-text-secondary text-sm">高威胁敌人</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-purple-400 mb-1">
                {bosses.filter(b => b.threat_level === '极高' || b.threat_level === '最高').length}
              </div>
              <div className="text-text-secondary text-sm">终极Boss</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-6">
        <div className="container-custom">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('enemies')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'enemies'
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              <Skull className="w-5 h-5" />
              普通敌人
            </button>
            <button
              onClick={() => setActiveTab('bosses')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'bosses'
                  ? 'bg-cta text-white'
                  : 'bg-surface text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              <Crown className="w-5 h-5" />
              Boss战
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          {activeTab === 'enemies' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {common_enemies.map((enemy) => (
                <div key={enemy.id} className="card card-glow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-lg text-text-primary">{enemy.name_cn}</h3>
                      <p className="text-text-muted text-sm">{enemy.name_en}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getThreatColor(enemy.threat_level)} bg-surface-hover`}>
                      {enemy.threat_level}威胁
                    </span>
                  </div>

                  {/* Type */}
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-surface-hover rounded-full text-sm text-text-secondary">
                      {enemy.type}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-surface-hover rounded">
                      <div className="text-text-muted text-xs">生命值</div>
                      <div className="text-text-primary font-medium">{enemy.health}</div>
                    </div>
                    <div className="text-center p-2 bg-surface-hover rounded">
                      <div className="text-text-muted text-xs">伤害</div>
                      <div className="text-text-primary font-medium">{enemy.damage}</div>
                    </div>
                    <div className="text-center p-2 bg-surface-hover rounded">
                      <div className="text-text-muted text-xs">弱点</div>
                      <div className="text-cta font-medium text-xs">{enemy.weakness}</div>
                    </div>
                  </div>

                  {/* Strategy */}
                  <div className="mb-4">
                    <h4 className="text-text-primary font-medium mb-2 flex items-center gap-2">
                      <Swords className="w-4 h-4 text-primary" />
                      打法策略
                    </h4>
                    <p className="text-text-secondary text-sm">{enemy.strategy}</p>
                  </div>

                  {/* Notes */}
                  {(enemy.note || enemy.description || enemy.warning) && (
                    <div className="space-y-2 pt-4 border-t border-border">
                      {enemy.warning && (
                        <div className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-cta mt-0.5" />
                          <span className="text-cta">{enemy.warning}</span>
                        </div>
                      )}
                      {enemy.note && (
                        <p className="text-text-muted text-sm">{enemy.note}</p>
                      )}
                      {enemy.description && (
                        <p className="text-text-muted text-sm">{enemy.description}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {bosses.map((boss) => (
                <div key={boss.id} className="card card-glow border-cta/30">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-4 border-b border-border">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Crown className="w-6 h-6 text-cta" />
                        <h3 className="font-heading text-2xl text-text-primary">{boss.name_cn}</h3>
                      </div>
                      <p className="text-text-muted">{boss.name_en}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-cta/20 text-cta rounded-full text-sm">
                        {boss.type}
                      </span>
                      {boss.character && (
                        <Tag variant={boss.character.includes('格蕾丝') ? 'grace' : 'leon'}>
                          {boss.character}
                        </Tag>
                      )}
                      {boss.threat_level && (
                        <span className={`px-3 py-1 rounded-full text-sm ${getThreatColor(boss.threat_level)} bg-surface-hover`}>
                          {boss.threat_level}威胁
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {boss.location && (
                      <div className="p-3 bg-surface-hover rounded-lg">
                        <div className="text-text-muted text-xs mb-1">出现地点</div>
                        <div className="text-text-primary">{boss.location}</div>
                      </div>
                    )}
                    {boss.health && (
                      <div className="p-3 bg-surface-hover rounded-lg">
                        <div className="text-text-muted text-xs mb-1">生命值</div>
                        <div className="text-text-primary">{boss.health}</div>
                      </div>
                    )}
                    {boss.damage && (
                      <div className="p-3 bg-surface-hover rounded-lg">
                        <div className="text-text-muted text-xs mb-1">伤害</div>
                        <div className="text-text-primary">{boss.damage}</div>
                      </div>
                    )}
                    {boss.weakness && (
                      <div className="p-3 bg-surface-hover rounded-lg">
                        <div className="text-text-muted text-xs mb-1">弱点</div>
                        <div className="text-cta">{boss.weakness}</div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {boss.description && (
                    <p className="text-text-secondary mb-6">{boss.description}</p>
                  )}

                  {/* Strategy */}
                  {boss.strategy && (
                    <div className="mb-6">
                      <h4 className="font-heading text-lg text-text-primary mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        战斗策略
                      </h4>
                      {Array.isArray(boss.strategy) ? (
                        <ol className="space-y-2">
                          {boss.strategy.map((s, i) => (
                            <li key={i} className="flex items-start gap-3 text-text-secondary">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                                {i + 1}
                              </span>
                              <span className="pt-0.5">{s}</span>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="text-text-secondary">{boss.strategy}</p>
                      )}
                    </div>
                  )}

                  {/* Phases */}
                  {boss.phases && boss.phases.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-heading text-lg text-text-primary mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        阶段攻略
                      </h4>
                      <div className="space-y-4">
                        {boss.phases.map((phase, i) => (
                          <div key={i} className="p-4 bg-surface-hover rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">
                                阶段 {phase.phase}
                              </span>
                              {phase.name && (
                                <span className="text-text-primary font-medium">{phase.name}</span>
                              )}
                            </div>
                            {phase.strategy && (
                              <div className="text-text-secondary text-sm">
                                {Array.isArray(phase.strategy) ? (
                                  <ul className="space-y-1">
                                    {phase.strategy.map((s, j) => (
                                      <li key={j}>• {s}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  phase.strategy
                                )}
                              </div>
                            )}
                            {phase.weakness && (
                              <div className="mt-2 text-sm">
                                <span className="text-text-muted">弱点: </span>
                                <span className="text-cta">{phase.weakness}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  {boss.tips && boss.tips.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-heading text-text-primary mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        注意事项
                      </h4>
                      <ul className="space-y-1">
                        {boss.tips.map((tip, i) => (
                          <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                            <span className="text-yellow-400">★</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Reward */}
                  {boss.reward && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <span className="text-text-muted text-sm">击败奖励: </span>
                      <span className="text-green-400">{boss.reward}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enemy Behavior Info */}
      <section className="py-12 bg-surface">
        <div className="container-custom">
          <div className="card">
            <h2 className="font-heading text-2xl text-text-primary mb-6">敌人行为机制</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading text-lg text-primary mb-3">
                  {enemy_behavior.dynamic_difficulty.description}
                </h3>
                <div className="space-y-2 text-text-secondary text-sm">
                  <p><span className="text-green-400">难度降低:</span> {enemy_behavior.dynamic_difficulty.downgrade}</p>
                  <p><span className="text-cta">难度提升:</span> {enemy_behavior.dynamic_difficulty.upgrade}</p>
                  <p className="text-text-muted">{enemy_behavior.dynamic_difficulty.note}</p>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-lg text-primary mb-3">
                  {enemy_behavior.mutation.description}
                </h3>
                <p className="text-text-secondary text-sm mb-2">{enemy_behavior.mutation.trigger}</p>
                <div className="text-text-secondary text-sm">
                  <span className="text-text-muted">预防措施:</span>
                  <ul className="mt-1 space-y-1">
                    {enemy_behavior.mutation.prevention.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
