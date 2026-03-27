'use client';

import Layout from '@/components/Layout';
import Tag from '@/components/Tag';
import { getGameData } from '@/lib/data';
import { User, Eye, Gamepad2, Shield, Crosshair, Zap } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  label: string;
  desc: string;
}

interface CharacterDetail {
  name: string;
  role: string;
  playstyle: string;
  default_view: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tag: 'grace' | 'leon';
  features: Feature[];
  weapons: string[];
  specialties: string[];
}

export default function CharactersPage() {
  const { story, game_info } = getGameData();

  const characterDetails: CharacterDetail[] = [
    {
      ...story.main_characters[0],
      icon: <User className="w-6 h-6" />,
      color: 'blue',
      tag: 'grace' as const,
      features: [
        { icon: <Eye className="w-4 h-4" />, label: '第一人称视角', desc: '沉浸式恐怖体验' },
        { icon: <Gamepad2 className="w-4 h-4" />, label: '潜行解谜', desc: '生存恐怖玩法' },
        { icon: <Shield className="w-4 h-4" />, label: '防御为主', desc: '前期缺乏战斗训练' },
      ],
      weapons: ['B934手枪', 'S&S M232手枪', '安魂左轮', '溶血注射器'],
      specialties: ['溶血注射器可永久击杀丧尸', '无法升级武器', '专精潜行和逃脱'],
    },
    {
      ...story.main_characters[1],
      icon: <User className="w-6 h-6" />,
      color: 'red',
      tag: 'leon' as const,
      features: [
        { icon: <Eye className="w-4 h-4" />, label: '第三人称视角', desc: '动作射击体验' },
        { icon: <Crosshair className="w-4 h-4" />, label: '战斗专家', desc: '丰富的武器和技巧' },
        { icon: <Zap className="w-4 h-4" />, label: '主动进攻', desc: '可升级武器装备' },
      ],
      weapons: ['鳄龟手枪', '安魂左轮', '战术斧', 'MSBG 500霰弹枪'],
      specialties: ['武器可在补给箱升级', '拥有回旋踢等体术', '各种战斗技巧'],
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center">
            {/* 角色头像展示 */}
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-blue-500/50 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <img
                    src="/images/grace.jpg"
                    alt="格蕾丝"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  格蕾丝
                </div>
              </div>
              <div className="text-text-muted text-2xl font-heading">VS</div>
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-red-500/50 shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
                  <img
                    src="/images/leon.jpg"
                    alt="里昂"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  里昂
                </div>
              </div>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl text-text-primary mb-4">
              角色介绍
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              了解《生化危机9：安魂曲》的双主角系统
            </p>
            <div className="section-divider max-w-md mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {characterDetails.map((char, index) => (
              <div key={index} className="card card-glow overflow-hidden">
                {/* 角色大图 Banner */}
                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <img
                    src={char.color === 'blue' ? '/images/grace.jpg' : '/images/leon.jpg'}
                    alt={char.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  {/* 角色头像（叠加在大图上） */}
                  <div className="absolute bottom-4 left-6">
                    <div className={`w-20 h-20 rounded-2xl overflow-hidden ring-4 ${
                      char.color === 'blue' ? 'ring-blue-500/50' : 'ring-red-500/50'
                    } shadow-lg`}>
                      <img
                        src={char.color === 'blue' ? '/images/grace.jpg' : '/images/leon.jpg'}
                        alt={char.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <h2 className="font-heading text-2xl text-text-primary">{char.name}</h2>
                    <p className="text-text-muted">{char.role}</p>
                    <div className="mt-2">
                      <Tag variant={char.tag}>
                        {char.color === 'blue' ? '格蕾丝路线' : '里昂路线'}
                      </Tag>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {char.description}
                </p>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-heading text-lg text-text-primary">特色玩法</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {char.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-background rounded-lg"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          char.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {feature.icon}
                        </div>
                        <div>
                          <div className="text-text-primary font-medium">{feature.label}</div>
                          <div className="text-text-muted text-sm">{feature.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Playstyle Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-background rounded-lg">
                    <div className="text-text-muted text-sm mb-1">玩法风格</div>
                    <div className="text-text-primary">{char.playstyle}</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <div className="text-text-muted text-sm mb-1">默认视角</div>
                    <div className="text-text-primary">{char.default_view}</div>
                  </div>
                </div>

                {/* Weapons */}
                <div className="mb-6">
                  <h3 className="font-heading text-lg text-text-primary mb-3">主要武器</h3>
                  <div className="flex flex-wrap gap-2">
                    {char.weapons.map((weapon, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm ${
                          char.color === 'blue'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {weapon}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="font-heading text-lg text-text-primary mb-3">专属特色</h3>
                  <ul className="space-y-2">
                    {char.specialties.map((specialty, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-text-secondary">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                          char.color === 'blue' ? 'bg-blue-400' : 'bg-red-400'
                        }`} />
                        <span>{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-surface">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl text-text-primary mb-2">角色对比</h2>
            <p className="text-text-secondary">快速了解两位主角的差异</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-text-muted font-medium">对比项</th>
                  <th className="text-left py-4 px-4 text-blue-400 font-heading">
                    <div className="flex items-center gap-2">
                      <img src="/images/grace.jpg" alt="格蕾丝" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-400/50" />
                      格蕾丝
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 text-red-400 font-heading">
                    <div className="flex items-center gap-2">
                      <img src="/images/leon.jpg" alt="里昂" className="w-8 h-8 rounded-full object-cover ring-2 ring-red-400/50" />
                      里昂
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: '身份', grace: 'FBI分析师', leon: 'DSO特工' },
                  { item: '玩法', grace: '生存恐怖', leon: '动作射击' },
                  { item: '视角', grace: '第一人称', leon: '第三人称' },
                  { item: '武器', grace: '有限，无法升级', leon: '丰富，可升级' },
                  { item: '特殊道具', grace: '溶血注射器', leon: '多种装备' },
                  { item: '战斗风格', grace: '潜行解谜', leon: '正面战斗' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                    <td className="py-4 px-4 text-text-secondary">{row.item}</td>
                    <td className="py-4 px-4 text-text-primary">{row.grace}</td>
                    <td className="py-4 px-4 text-text-primary">{row.leon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Story Context */}
      <section className="py-12">
        <div className="container-custom">
          <div className="card max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-3">
                <img src="/images/grace.jpg" alt="格蕾丝" className="w-10 h-10 rounded-full object-cover ring-2 ring-background" />
                <img src="/images/leon.jpg" alt="里昂" className="w-10 h-10 rounded-full object-cover ring-2 ring-background" />
              </div>
              <h2 className="font-heading text-2xl text-text-primary">故事背景</h2>
            </div>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                <strong className="text-text-primary">时间设定：</strong>
                {game_info.timeline}，{story.setting}
              </p>
              <p>
                <strong className="text-text-primary">剧情概要：</strong>
                {story.plot_summary}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
