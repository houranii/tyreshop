import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  id: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  id,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'py-1 text-sm',
    md: 'py-2 text-base',
    lg: 'py-3 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  
  return (
    <div className={`${widthClass}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          id={id}
          ref={ref}
          className={`
            appearance-none bg-white border ${errorClass} rounded-md shadow-sm pl-4 pr-10 
            ${sizeClasses[size]} ${widthClass}
            focus:outline-none focus:ring-2 
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;