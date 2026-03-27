interface TagProps {
  variant: 'grace' | 'leon' | 'both' | 'danger' | 'info';
  children: React.ReactNode;
}

const variantClasses = {
  grace: 'tag-grace',
  leon: 'tag-leon',
  both: 'tag-both',
  danger: 'tag-danger',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
};

export default function Tag({ variant, children }: TagProps) {
  return (
    <span className={`tag ${variantClasses[variant]} border`}>
      {children}
    </span>
  );
}
