import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
}

export default function SectionCard({ title, description, icon, href, color = 'from-primary to-cta' }: SectionCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="card h-full card-glow">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-lg text-text-primary mb-2 group-hover:neon-text transition-all">
              {title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              {description}
            </p>
            <div className="flex items-center text-primary text-sm font-medium">
              <span>查看详情</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
