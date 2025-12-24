'use client';
import { X } from 'lucide-react';

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Item",
    message = "Are you sure you want to delete this item? This action cannot be undone."
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Gray Background Overlay */}
            <div
                className="absolute inset-0 bg-gray-600/50"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 z-10">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Modal Header */}
                <h2 className="text-xl font-semibold text-[#222222] mb-4">
                    {title}
                </h2>

                {/* Modal Body */}
                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                {/* Modal Actions */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-[#CCE7F2] text-[#222222] rounded-lg hover:bg-[#CCE7F2]/20 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-6 py-2 bg-[#CCE7F2] text-[#222222] rounded-lg hover:bg-[#CCE7F2]/80 transition-colors font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
