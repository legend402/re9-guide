'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  Target, 
  Skull, 
  Map, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/characters/', label: '角色', icon: Users },
  { href: '/walkthrough/', label: '章节攻略', icon: BookOpen },
  { href: '/weapons/', label: '武器图鉴', icon: Target },
  { href: '/enemies/', label: '敌人/Boss', icon: Skull },
  { href: '/collectibles/', label: '收集品', icon: Map },
  { href: '/compare/', label: '数据对比', icon: BarChart3 },
];

interface NavbarProps {
  isHomePage?: boolean;
}

export default function Navbar({ isHomePage = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 首页未滚动时：透明背景 + 白色文字
  // 其他页面或滚动后：正常样式
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : scrolled 
            ? 'bg-background/90 backdrop-blur-md' 
            : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cta flex items-center justify-center shadow-lg">
              <span className="font-heading text-xl text-white">RE9</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-heading text-lg leading-tight group-hover:neon-text transition-all ${
                isTransparent ? 'text-white drop-shadow-lg' : 'text-text-primary'
              }`}>
                安魂曲
              </h1>
              <p className={`text-xs transition-colors ${
                isTransparent ? 'text-white/70' : 'text-text-muted'
              }`}>攻略站</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
                      : 'nav-link text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isTransparent 
                ? 'text-white hover:text-white/80' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${
            isTransparent 
              ? 'bg-black/80 backdrop-blur-md border-white/20' 
              : 'bg-background/95 border-border'
          }`}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
