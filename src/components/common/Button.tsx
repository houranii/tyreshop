import React, { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'link' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  type = 'button',
  onClick,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow hover:shadow-md active:shadow-sm',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow hover:shadow-md active:shadow-sm',
    accent: 'bg-accent-500 hover:bg-accent-600 text-gray-900 shadow hover:shadow-md active:shadow-sm',
    outline: 'border border-gray-300 text-gray-700 hover:text-primary-600 hover:border-primary-600 bg-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    link: 'bg-transparent text-primary-600 hover:underline p-0',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]';

  return (
    <button
      type={type}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${widthClass} 
        ${disabledClass}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} className="mr-2 animate-spin" />}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;