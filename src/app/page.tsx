'use client';

'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import SectionCard from '@/components/SectionCard';
import { getGameData } from '@/lib/data';
import { 
  Users, 
  BookOpen, 
  Target, 
  Skull, 
  Map, 
  BarChart3,
  Calendar,
  Gamepad2,
  Building2,
  Tag
} from 'lucide-react';

export default function Home() {
  const { game_info, story } = getGameData();

  const sections = [
    {
      title: '角色介绍',
      description: '了解双主角格蕾丝与里昂的背景故事和特色玩法',
      icon: <Users className="w-6 h-6 text-white" />,
      href: '/characters/',
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: '章节攻略',
      description: '8个章节的详细流程攻略，包含收集品位置和Boss打法',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      href: '/walkthrough/',
      color: 'from-purple-600 to-purple-400',
    },
    {
      title: '武器图鉴',
      description: '25种武器的详细数据、升级路线和装备推荐',
      icon: <Target className="w-6 h-6 text-white" />,
      href: '/weapons/',
      color: 'from-red-600 to-red-400',
    },
    {
      title: '敌人/Boss',
      description: '普通敌人弱点分析和9个Boss的详细打法攻略',
      icon: <Skull className="w-6 h-6 text-white" />,
      href: '/enemies/',
      color: 'from-orange-600 to-orange-400',
    },
    {
      title: '收集品指南',
      description: '浣熊先生、文件、保险箱密码、古董币全收集指南',
      icon: <Map className="w-6 h-6 text-white" />,
      href: '/collectibles/',
      color: 'from-green-600 to-green-400',
    },
    {
      title: '数据对比',
      description: '武器对比工具和装备配置推荐',
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      href: '/compare/',
      color: 'from-cyan-600 to-cyan-400',
    },
  ];

  return (
    <Layout isHomePage={true}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Resident Evil Requiem"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay - 顶部更深的渐变帮助与导航栏融合 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          {/* 顶部额外渐变层 - 专门为导航栏区域 */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        </div>
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* 内容区域 - 添加顶部padding避开导航栏 */}
        <div className="container-custom relative z-10 text-center pt-[70px]">
          {/* Game Logo/Title */}
          <div className="mb-8">
            <p className="text-cta font-heading text-lg mb-4 tracking-widest drop-shadow-lg">
              RESIDENT EVIL REQUIEM
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-2xl" style={{ textShadow: '0 0 30px rgba(124, 58, 237, 0.5)' }}>
              生化危机9
            </h1>
            <p className="font-heading text-2xl sm:text-3xl text-white/90 drop-shadow-lg">
              安魂曲
            </p>
          </div>

          {/* Game Info Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
              <Calendar className="w-4 h-4 text-cta" />
              <span className="text-white/90 text-sm">{game_info.release_date} 发售</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
              <Building2 className="w-4 h-4 text-cta" />
              <span className="text-white/90 text-sm">{game_info.developer}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
              <Gamepad2 className="w-4 h-4 text-cta" />
              <span className="text-white/90 text-sm">{game_info.genre}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
              <Tag className="w-4 h-4 text-cta" />
              <span className="text-white/90 text-sm">{game_info.price.digital_standard}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 text-lg max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md">
            {game_info.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/walkthrough/" 
              className="bg-gradient-to-r from-primary to-cta text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-white/20"
            >
              开始攻略
            </Link>
            <Link 
              href="/weapons/" 
              className="bg-white/10 backdrop-blur-sm text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-white/20 transition-all border border-white/30"
            >
              查看武器
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>

        {/* 底部渐变过渡 - 与游戏特色部分衔接 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface via-surface/80 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface relative -mt-1">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
              游戏特色
            </h2>
            <div className="section-divider max-w-md mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {game_info.game_features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-6 bg-background border border-border rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <p className="text-text-secondary">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Character Preview */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
              双主角系统
            </h2>
            <div className="section-divider max-w-md mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {story.main_characters.map((char, index) => (
              <div
                key={index}
                className={`card card-glow overflow-hidden ${index === 0 ? 'border-blue-500/30' : 'border-red-500/30'}`}
              >
                {/* Character Image */}
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={index === 0 ? "/images/grace.jpg" : "/images/leon.jpg"}
                    alt={char.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                <div className="flex items-center gap-4 mb-4 px-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-heading overflow-hidden ${
                    index === 0
                      ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/50'
                      : 'bg-red-500/20 text-red-400 ring-2 ring-red-500/50'
                  }`}>
                    <img
                      src={index === 0 ? "/images/grace.jpg" : "/images/leon.jpg"}
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-text-primary">{char.name}</h3>
                    <p className="text-text-muted text-sm">{char.role}</p>
                  </div>
                </div>
                <div className="space-y-3 px-4 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-sm">玩法风格:</span>
                    <span className="text-text-secondary text-sm">{char.playstyle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-sm">默认视角:</span>
                    <span className="text-text-secondary text-sm">{char.default_view}</span>
                  </div>
                  <p className="text-text-secondary text-sm mt-4">{char.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/characters/" className="btn-secondary">
              查看详细角色介绍
            </Link>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-20 bg-surface">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
              攻略导航
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              选择下方类别开始探索完整的游戏攻略
            </p>
            <div className="section-divider max-w-md mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <SectionCard key={section.title} {...section} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: '武器', value: '25', color: 'text-red-400' },
              { label: '章节', value: '8', color: 'text-purple-400' },
              { label: 'Boss', value: '9', color: 'text-orange-400' },
              { label: '收集品', value: '200+', color: 'text-green-400' },
            ].map((stat) => (
              <div key={stat.label} className="card text-center">
                <div className={`font-heading text-4xl mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
