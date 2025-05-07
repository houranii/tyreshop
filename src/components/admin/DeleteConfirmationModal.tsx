import React from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  itemType: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  itemType
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center p-4">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <AlertTriangle size={24} className="text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Are you sure you want to delete this {itemType}?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium">{itemName}</span> will be permanently removed.
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;