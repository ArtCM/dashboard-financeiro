import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const Card = ({ children, className = '', title }: CardProps) => {
  return (
    <div className={`bg-card rounded-xl p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;