import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} className={`bg-white shadow-md rounded-lg ${props.className || ''}`} />;
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} className={`px-6 py-4 border-b ${props.className || ''}`} />;
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return <h3 {...props} className={`text-lg font-semibold ${props.className || ''}`} />;
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} className={`px-6 py-4 ${props.className || ''}`} />;
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} className={`px-6 py-4 border-t ${props.className || ''}`} />;
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  return <p {...props} className={`text-sm text-gray-500 ${props.className || ''}`} />;
};
