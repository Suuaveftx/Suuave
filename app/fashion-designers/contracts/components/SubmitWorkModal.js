'use client';

import React, { useState, useRef } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from '@heroui/react';
import { X, Check } from 'lucide-react';
import Image from 'next/image';

const SubmitWorkModal = ({ trigger, isResubmit = false }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // Initialize with 3 files from the design
    const [files, setFiles] = useState([
        {
            id: '1',
            name: 'Look 1.png',
            size: 1363148, // 1.3mb
            preview: '/dev-images/look-thumb.png',
        },
        {
            id: '2',
            name: 'Look 2.png',
            size: 1363148, // 1.3mb
            preview: '/dev-images/look-thumb.png',
        },
        {
            id: '3',
            name: 'Look 3.png',
            size: 1363148, // 1.3mb
            preview: '/dev-images/look-thumb.png',
        }
    ]);
    const [message, setMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            processFiles(selectedFiles);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            processFiles(droppedFiles);
        }
    };

    const processFiles = (newFiles) => {
        const validFiles = newFiles.filter(file => {
            const isValidType = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip', 'application/x-zip-compressed'].includes(file.type) || 
                                file.name.match(/\.(jpg|jpeg|png|pdf|zip)$/i);
            const isValidSize = file.size <= 200 * 1024 * 1024; // 200MB
            return isValidType && isValidSize;
        });

        const newFileObjects = validFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
            originalFile: file
        }));

        setFiles(prev => [...prev, ...newFileObjects]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0mb';
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(1)}mb`;
    };

    const handleSubmit = () => {
        console.log('Submitting work...', { files, message });
        setIsSubmitted(true);
    };

    const handleModalOpenChange = (open) => {
        if (!open) {
            setTimeout(() => setIsSubmitted(false), 300);
        }
        if (onOpenChange) {
            onOpenChange(open);
        }
    };

    const handleCloseSuccess = () => {
        if (onOpenChange) {
            onOpenChange(false);
        }
        setTimeout(() => setIsSubmitted(false), 300);
    };

    return (
        <>
            {trigger && React.cloneElement(trigger, { onClick: onOpen })}
            <Modal
                isOpen={isOpen}
                onOpenChange={handleModalOpenChange}
                placement="center"
                backdrop="opaque"
                scrollBehavior="inside"
                hideCloseButton
                classNames={{
                    backdrop: "bg-[#1B2B36]/60 backdrop-blur-none",
                    base: `bg-white rounded-[20px] md:rounded-[24px] mx-4 sm:mx-auto w-[90%] ${isSubmitted ? 'max-w-[460px]' : 'max-w-[856px]'} shadow-xl transition-all duration-300`,
                }}
            >
                <ModalContent>
                    {(onClose) => isSubmitted ? (
                        <div className="flex flex-col items-center justify-center pt-14 pb-12 px-6">
                            <div className="w-[64px] h-[64px] bg-[#008000] rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <Check className="text-white w-8 h-8" strokeWidth={4} />
                            </div>
                            <h2 className="text-[20px] md:text-[24px] font-bold text-[#111111] mb-3">
                                Work Submitted
                            </h2>
                            <p className="text-[14px] text-[#767676] text-center max-w-[320px] leading-relaxed mb-10">
                                Your work has been successfully submitted. Kindly wait for client's review and approval.
                            </p>
                            <button
                                onClick={handleCloseSuccess}
                                className="w-[180px] h-[48px] bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] hover:opacity-90 text-[#035A7A] font-[700] rounded-full shadow-sm transition-opacity flex items-center justify-center"
                            >
                                OK
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Header Section */}
                            <ModalHeader className="p-0 flex flex-col items-start w-full">
                                <div className="pt-6 px-6 md:pt-8 md:px-8 pb-3 md:pb-4 relative w-full text-left">
                                    {/* Close Button */}
                                    <button 
                                        onClick={onClose}
                                        className="absolute top-6 right-6 md:top-8 md:right-8 text-[#999999] hover:text-gray-700 transition-colors"
                                        aria-label="Close"
                                    >
                                        <X size={18} strokeWidth={2} />
                                    </button>

                                    <h2 className="text-[17px] md:text-[19px] font-bold text-[#111111] uppercase tracking-wide">
                                        SUBMIT WORK
                                    </h2>
                                    <p className="text-[12px] md:text-[13px] font-normal text-[#888888] mt-1.5 max-w-[95%]">
                                        Upload your final files and add message to your client. Once submitted the client will be notified and have 3 days to review your work.
                                    </p>
                                </div>
                            </ModalHeader>

                            {/* Body Content */}
                            <ModalBody className="px-6 md:px-8 pt-2 pb-6 w-full space-y-5">
                                
                                {/* File Upload Area */}
                                <div 
                                    className={`w-full border border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors py-6 md:py-8 ${
                                        isDragging ? 'bg-gray-50 border-gray-400' : 'bg-white hover:bg-gray-50/60'
                                    }`}
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        multiple
                                        accept=".jpg,.jpeg,.png,.pdf,.zip"
                                    />
                                    {/* Cloud upload outlined icon */}
                                    <svg className="w-7 h-7 text-[#8E8E93] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                                        <path d="m12 12-3 3" />
                                        <path d="m12 12 3 3" />
                                        <path d="M12 12v9" />
                                    </svg>
                                    <p className="text-[13px] md:text-[14px] font-bold text-[#222222]">
                                        Drag and drop file here or click to upload
                                    </p>
                                    <p className="text-[11px] text-[#8E8E93] mt-1.5">
                                        Supports JPG,PNG,PDF,ZIP (200MB)
                                    </p>
                                </div>

                                {/* Review / Feedback Cards Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Left Card: Client Message */}
                                    <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-start">
                                        <div className="flex items-center gap-2.5 mb-2.5">
                                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                                <Image
                                                    src="/dev-images/Clients.png"
                                                    alt="Josh Design"
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-[13px] font-bold text-[#222222]">
                                                Josh Design (Brand)
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-[#444444] leading-relaxed">
                                            Hello Tolu<br />
                                            The design looks nice, but can you adjust the colour of the beads to green.
                                        </p>
                                    </div>

                                    {/* Right Card: Artist Response */}
                                    <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-start">
                                        <div className="flex items-center gap-2.5 mb-2.5">
                                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                                <Image
                                                    src="/dev-images/Clients.png"
                                                    alt="Tolu Ego"
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-[13px] font-bold text-[#222222]">
                                                Tolu Ego
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-[#444444] leading-relaxed">
                                            Hello Josh,<br />
                                            Here is the final submission of the work. Kindly review and if any iteration please let me know. Thanks.
                                        </p>
                                    </div>
                                </div>

                                {/* Your Files Section */}
                                <div>
                                    <h3 className="text-[13px] md:text-[14px] font-bold text-[#222222] mb-2.5">
                                        Your Files
                                    </h3>
                                    <div className="flex flex-row flex-nowrap overflow-x-auto scrollbar-hide gap-3 pb-1">
                                        {files.map(file => (
                                            <div 
                                                key={file.id} 
                                                className="w-[100px] border border-gray-200 rounded-xl p-2 bg-white flex flex-col relative shrink-0"
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFile(file.id);
                                                    }}
                                                    className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 transition-colors z-10"
                                                >
                                                    <X size={13} strokeWidth={2.5} />
                                                </button>
                                                
                                                <div className="w-full h-[80px] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                                                    {file.preview ? (
                                                        <img 
                                                            src={file.preview} 
                                                            alt={file.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-[10px] text-gray-400 font-medium">{file.name.split('.').pop()?.toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-[12px] font-bold text-[#222222] truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-[10px] text-[#8E8E93] mt-0.5">
                                                        {formatSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Message to Client */}
                                <div>
                                    <h3 className="text-[13px] md:text-[14px] font-bold text-[#222222] mb-2.5">
                                        Message to Client (Optional)
                                    </h3>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Leave a message"
                                        className="w-full h-[100px] border border-gray-200 rounded-xl p-3.5 text-[13px] text-[#222222] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#3A98BB] resize-none"
                                    />
                                </div>
                            </ModalBody>

                            {/* Submit / Cancel Buttons */}
                            <ModalFooter className="px-6 md:px-8 pb-7 pt-2 w-full flex items-center justify-center gap-4">
                                <button
                                    onClick={onClose}
                                    className="w-[260px] h-[44px] bg-[#F4F4F5] hover:bg-gray-200 text-[#333333] text-[14px] font-semibold rounded-full transition-colors flex items-center justify-center"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="w-[260px] h-[44px] bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] hover:opacity-90 text-[#035A7A] text-[14px] font-semibold rounded-full transition-opacity shadow-sm flex items-center justify-center"
                                >
                                    {isResubmit ? 'Resubmit' : 'Resubmit'}
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default SubmitWorkModal;