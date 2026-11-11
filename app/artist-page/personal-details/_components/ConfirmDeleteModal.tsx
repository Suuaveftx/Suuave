import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { Button } from '../../../../components/ui/button';
import { Loader2 } from 'lucide-react';

type ConfirmDeleteModalPropType = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
  confirmLabel?: string;
  title?: string;
  message?: string;
};

export default function ConfirmDeleteModal({
  isOpen,
  onOpenChange,
  title = 'Confirm deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  isLoading,
  onConfirm,
  confirmLabel = 'Remove',
}: ConfirmDeleteModalPropType) {
  const handleOpenChange = (nextIsOpen: boolean) => {
    if (!isLoading) onOpenChange(nextIsOpen);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      isDismissable={!isLoading}
      hideCloseButton={isLoading}
      placement='center'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
        <ModalBody>
          <p className='text-sm text-[#767676]'>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            type='button'
            variant='ghost'
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={onConfirm}
            disabled={isLoading}
            className='flex items-center justify-center gap-1.5'
          >
            {isLoading && <Loader2 className='animate-spin' />}
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
