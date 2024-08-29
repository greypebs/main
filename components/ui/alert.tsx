import React from 'react';

export const Alert: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} className={`p-4 border rounded ${props.className || ''}`} />;
};

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return <h4 {...props} className={`text-lg font-semibold ${props.className || ''}`} />;
};

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  return <p {...props} className={`mt-1 text-sm ${props.className || ''}`} />;
};
