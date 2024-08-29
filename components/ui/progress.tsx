import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
}

export const Progress: React.FC<ProgressProps> = ({ value, max, ...props }) => {
  const percentage = (value / max) * 100;
  return (
    <div {...props} className={`w-full bg-gray-200 rounded-full h-2.5 ${props.className || ''}`}>
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};
