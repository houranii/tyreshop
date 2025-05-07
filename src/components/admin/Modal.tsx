import React from 'react';
import { X } from 'lucide-react';
import Button from '../common/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }[size];

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClass} animate-scale-in`}>
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="border-t p-4 bg-gray-50 flex justify-end space-x-2 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;