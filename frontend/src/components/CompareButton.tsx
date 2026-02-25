import React from 'react';
import { GitCompare } from 'lucide-react';
import { useCompare } from '../contexts/CompareContext';

interface CompareButtonProps {
  onClick: () => void;
}

export default function CompareButton({ onClick }: CompareButtonProps) {
  const { compareCount } = useCompare();

  if (compareCount < 2) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gold text-matte-black font-inter font-medium text-sm px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
      aria-label={`Compare ${compareCount} properties`}
    >
      <GitCompare size={16} />
      Compare ({compareCount})
    </button>
  );
}
