import type { ReactNode } from 'react';

type SectionLabelProps = {
  children: ReactNode;
  inverse?: boolean;
};

export default function SectionLabel({ children, inverse = false }: SectionLabelProps) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${inverse ? 'text-[#bdc9c4]' : 'text-[#62716d]'}`}>
      <span className="h-px w-7 bg-gold" />
      {children}
    </div>
  );
}
