'use client';

'use client';

import Link from 'next/link';
import { Github, Gamepad2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cta flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-heading text-lg text-text-primary">生化危机9攻略站</h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              为玩家提供最完整的《生化危机9：安魂曲》攻略信息，包含流程攻略、武器数据、敌人情报和收集品指南。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-text-primary mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/walkthrough/" className="text-text-secondary hover:text-primary transition-colors">
                  章节攻略
                </Link>
              </li>
              <li>
                <Link href="/weapons/" className="text-text-secondary hover:text-primary transition-colors">
                  武器图鉴
                </Link>
              </li>
              <li>
                <Link href="/enemies/" className="text-text-secondary hover:text-primary transition-colors">
                  敌人/Boss
                </Link>
              </li>
              <li>
                <Link href="/collectibles/" className="text-text-secondary hover:text-primary transition-colors">
                  收集品指南
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-heading text-text-primary mb-4">免责声明</h4>
            <p className="text-text-muted text-xs leading-relaxed">
              本站所有数据仅供学习参考，游戏版权归CAPCOM所有。本站与CAPCOM官方无任何关联。
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-cta" /> for RE fans
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/legend402/re9-guide" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
