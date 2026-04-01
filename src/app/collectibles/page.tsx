'use client';

import Layout from '@/components/Layout';
import { getCollectibleData } from '@/lib/data';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  Cat, 
  FileText, 
  Coins, 
  Lock, 
  Package, 
  Sprout,
  Trophy,
  MapPin,
  AlertTriangle
} from 'lucide-react';

type TabId = 'raccoon' | 'files' | 'coins' | 'safes' | 'containers' | 'plants';

interface Tab {
  id: TabId;
  label: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

export default function CollectiblesPage() {
  const data = getCollectibleData();
  const [activeTab, setActiveTab] = useState<TabId>('raccoon');

  const tabs: Tab[] = [
    { id: 'raccoon', label: '浣熊先生', icon: Cat, count: data.mr_raccoon.total, color: 'text-green-400' },
    { id: 'files', label: '文件', icon: FileText, count: data.files.total, color: 'text-blue-400' },
    { id: 'coins', label: '古董币', icon: Coins, count: data.antique_coins.total, color: 'text-yellow-400' },
    { id: 'safes', label: '保险箱', icon: Lock, count: data.safes.total, color: 'text-purple-400' },
    { id: 'containers', label: 'BSAA集装箱', icon: Package, count: data.bsaa_containers.total, color: 'text-orange-400' },
    { id: 'plants', label: '植物幼苗', icon: Sprout, count: data.plant_seedlings.total, color: 'text-emerald-400' },
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <Layout isHomePage={false}>
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="font-heading text-4xl sm:text-5xl text-text-primary mb-4">
              收集品指南
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              浣熊先生、文件、保险箱密码、古董币等全收集指南
            </p>
            <div className="section-divider max-w-md mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`card p-4 text-center transition-all ${
                    activeTab === tab.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${tab.color}`} />
                  <div className="font-heading text-2xl text-text-primary">{tab.count}</div>
                  <div className="text-text-secondary text-sm">{tab.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-6">
        <div className="container-custom">
          <div className="card border-yellow-500/30 bg-yellow-500/5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="font-heading text-lg text-yellow-400 mb-2">重要提示</h3>
                <ul className="space-y-1 text-text-secondary text-sm">
                  <li>• {data.overview.missable_warning}</li>
                  <li>• {data.overview.carry_over}</li>
                  <li>• {data.overview.tracking}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* Mr. Raccoon */}
          {activeTab === 'raccoon' && (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center gap-4 mb-6">
                  <Cat className="w-8 h-8 text-green-400" />
                  <div>
                    <h2 className="font-heading text-2xl text-text-primary">{data.mr_raccoon.name_cn}</h2>
                    <p className="text-text-muted">{data.mr_raccoon.name_en}</p>
                  </div>
                  <div className="ml-auto text-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <span className="text-sm text-text-secondary">{data.mr_raccoon.trophy}</span>
                  </div>
                </div>
                <p className="text-text-secondary mb-4">{data.mr_raccoon.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full">
                    破坏方式: {data.mr_raccoon.destruction_method}
                  </span>
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full">
                    奖励: {data.mr_raccoon.reward}
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                {data.mr_raccoon.locations_by_area.map((area, idx) => (
                  <div key={idx} className="card">
                    <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {area.area}
                      <span className="ml-auto px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-sm">
                        {area.count}个
                      </span>
                    </h3>
                    {area.details && (
                      <div className="space-y-2">
                        {area.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-surface-hover rounded">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-medium">
                              {detail.number.replace('#', '')}
                            </span>
                            <div className="flex-1">
                              <div className="text-text-primary">{detail.location}</div>
                              {detail.note && (
                                <div className="text-text-muted text-sm">{detail.note}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {area.method && (
                      <p className="text-text-secondary">{area.method}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {activeTab === 'files' && (
            <div className="card">
              <div className="flex items-center gap-4 mb-6">
                <FileText className="w-8 h-8 text-blue-400" />
                <div>
                  <h2 className="font-heading text-2xl text-text-primary">{data.files.name_cn}</h2>
                  <p className="text-text-muted">{data.files.name_en}</p>
                </div>
                <div className="ml-auto text-center">
                  <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                  <span className="text-sm text-text-secondary">{data.files.trophy}</span>
                </div>
              </div>
              <p className="text-text-secondary mb-6">{data.files.description}</p>
              
              <h3 className="font-heading text-lg text-text-primary mb-3">文件分类</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {data.files.categories.map((cat, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    {cat}
                  </span>
                ))}
              </div>

              <h3 className="font-heading text-lg text-text-primary mb-3">关键文件位置</h3>
              <div className="space-y-2">
                {data.files.key_files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-surface-hover rounded">
                    <span className="text-text-primary">{file.name}</span>
                    <span className="text-text-muted text-sm">{file.location}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Antique Coins */}
          {activeTab === 'coins' && (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center gap-4 mb-6">
                  <Coins className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h2 className="font-heading text-2xl text-text-primary">{data.antique_coins.name_cn}</h2>
                    <p className="text-text-muted">{data.antique_coins.name_en}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-surface-hover rounded">
                    <div className="text-text-muted text-sm mb-1">专属角色</div>
                    <div className="text-blue-400">{data.antique_coins.character}</div>
                  </div>
                  <div className="p-4 bg-surface-hover rounded">
                    <div className="text-text-muted text-sm mb-1">使用地点</div>
                    <div className="text-text-primary">{data.antique_coins.location}</div>
                  </div>
                </div>

                <h3 className="font-heading text-lg text-text-primary mb-3">可兑换物品</h3>
                <div className="space-y-3">
                  {data.antique_coins.upgrades.map((upgrade, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-surface-hover rounded">
                      <div>
                        <div className="text-text-primary">{upgrade.item}</div>
                        <div className="text-text-muted text-sm">{upgrade.effect}</div>
                      </div>
                      <div className="text-yellow-400 font-medium">{upgrade.cost}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                  <span className="text-text-muted">总计需要: </span>
                  <span className="text-yellow-400">{data.antique_coins.total_cost}</span>
                </div>
              </div>

              <div className="card">
                <h3 className="font-heading text-lg text-text-primary mb-4">关键位置</h3>
                <div className="grid gap-2">
                  {data.antique_coins.key_locations.map((loc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-surface-hover rounded">
                      <span className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm">
                        {loc.coin.replace('#', '')}
                      </span>
                      <span className="text-text-secondary">{loc.location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Safes */}
          {activeTab === 'safes' && (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center gap-4 mb-6">
                  <Lock className="w-8 h-8 text-purple-400" />
                  <div>
                    <h2 className="font-heading text-2xl text-text-primary">{data.safes.name_cn}</h2>
                    <p className="text-text-muted">{data.safes.name_en}</p>
                  </div>
                  <div className="ml-auto text-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <span className="text-sm text-text-secondary">{data.safes.trophy}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                    专属: {data.safes.character}
                  </span>
                  <span className="px-3 py-1 bg-cta/10 text-cta rounded-full">
                    {data.safes.insanity_change}
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                {data.safes.list.map((safe) => (
                  <div key={safe.id} className="card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading text-lg text-text-primary flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {safe.location}
                      </h3>
                      {safe.special && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">
                          {safe.special}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-surface-hover rounded">
                        <div className="text-text-muted text-sm mb-1">普通难度密码</div>
                        <div className="text-text-primary font-mono">{safe.normal_code || '特定密码'}</div>
                      </div>
                      {safe.insanity_code && (
                        <div className="p-3 bg-cta/5 rounded">
                          <div className="text-text-muted text-sm mb-1">癫狂难度密码</div>
                          <div className="text-cta font-mono">{safe.insanity_code}</div>
                        </div>
                      )}
                    </div>
                    {safe.reward && (
                      <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <span className="text-text-muted">奖励: </span>
                        <span className="text-green-400">{safe.reward}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BSAA Containers */}
          {activeTab === 'containers' && (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center gap-4 mb-6">
                  <Package className="w-8 h-8 text-orange-400" />
                  <div>
                    <h2 className="font-heading text-2xl text-text-primary">{data.bsaa_containers.name_cn}</h2>
                    <p className="text-text-muted">{data.bsaa_containers.name_en}</p>
                  </div>
                  <div className="ml-auto text-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <span className="text-sm text-text-secondary">{data.bsaa_containers.trophy}</span>
                  </div>
                </div>
                <div className="p-4 bg-surface-hover rounded mb-6">
                  <div className="text-text-muted text-sm mb-1">钥匙获取</div>
                  <div className="text-text-primary">{data.bsaa_containers.key_location}</div>
                </div>
              </div>

              <div className="grid gap-4">
                {data.bsaa_containers.contents.map((container) => (
                  <div key={container.container} className="card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-heading">
                          {container.container}
                        </span>
                        <div>
                          <div className="text-text-primary font-medium">{container.location}</div>
                          <div className="text-text-secondary text-sm">{container.content}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Plant Seedlings */}
          {activeTab === 'plants' && (
            <div className="card">
              <div className="flex items-center gap-4 mb-6">
                <Sprout className="w-8 h-8 text-emerald-400" />
                <div>
                  <h2 className="font-heading text-2xl text-text-primary">{data.plant_seedlings.name_cn}</h2>
                  <p className="text-text-muted">{data.plant_seedlings.name_en}</p>
                </div>
                <div className="ml-auto text-center">
                  <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                  <span className="text-sm text-text-secondary">{data.plant_seedlings.trophy}</span>
                </div>
              </div>
              <p className="text-text-secondary">{data.plant_seedlings.description}</p>
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded">
                <span className="text-text-muted">总数量: </span>
                <span className="text-emerald-400 font-heading text-xl">{data.plant_seedlings.total}</span>
                <span className="text-text-muted text-sm ml-2">{data.plant_seedlings.locations}</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
