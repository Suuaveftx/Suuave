import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { Button } from '../../../../components/ui/button';

export default function ConfirmDeleteModal({
  deleteModal,
  deleteMutation,
  pendingRemovalIndex,
  setPendingRemovalIndex,
  getValues,
  confirmRemoveCertification,
}) {
  const isDeleting = Boolean(deleteMutation?.isPending);

  return (
    <Modal
      isOpen={Boolean(deleteModal?.isOpen)}
      onOpenChange={deleteModal?.onOpenChange}
      isDismissable={!isDeleting}
      hideCloseButton={isDeleting}
      placement='center'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Remove certification?</ModalHeader>
        <ModalBody>
          <p className='text-sm text-[#767676]'>
            {getValues?.(`awards.${pendingRemovalIndex}.id`)
              ? 'This certification will be permanently removed from your profile.'
              : 'This unsaved certification will be removed.'}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant='light'
            onPress={() => {
              deleteModal?.onClose();
              setPendingRemovalIndex(null);
            }}
            isDisabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            color='danger'
            onPress={confirmRemoveCertification}
            isLoading={isDeleting}
          >
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
