
import React from 'react';

interface FlowchartNodeProps {
  id: string;
  activeNode: string;
  type: 'decision' | 'action' | 'start_end' | 'io';
  children: React.ReactNode;
  className?: string;
}

export const FlowchartNode: React.FC<FlowchartNodeProps> = ({ id, activeNode, type, children, className }) => {
  const baseClasses = "border-2 p-3 text-center text-sm min-w-[120px] max-w-[200px] transition-all duration-300 shadow-md";
  const isActive = activeNode === id;
  
  let typeClasses = '';
  switch (type) {
    case 'decision':
      typeClasses = 'transform -skew-x-12 bg-indigo-800 border-indigo-500';
      break;
    case 'action':
      typeClasses = 'rounded-md bg-gray-700 border-gray-500';
      break;
    case 'start_end':
      typeClasses = 'rounded-full bg-green-800 border-green-500';
      break;
    case 'io':
        typeClasses = 'transform skew-x-12 bg-purple-800 border-purple-500'
  }

  const activeClasses = isActive ? 'border-cyan-400 scale-105 shadow-cyan-500/50 ring-2 ring-cyan-400' : 'text-gray-300';

  return (
    <div className={`${baseClasses} ${typeClasses} ${activeClasses} ${className}`}>
      <div className={type === 'decision' ? 'transform skew-x-12' : ''}>{children}</div>
    </div>
  );
};
