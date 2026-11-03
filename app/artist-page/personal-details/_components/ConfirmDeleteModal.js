import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { Button } from '../../../../components/ui/button';
import { LoaderCircle } from 'lucide-react';

export default function ConfirmDeleteModal({
  isOpen,
  onOpenChange,
  title = 'Confirm deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  isLoading = false,
  onConfirm,
  confirmLabel = 'Remove',
}) {
  const handleOpenChange = (nextIsOpen) => {
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
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
