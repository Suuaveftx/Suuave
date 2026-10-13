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
import { X, CloudUpload, Check } from 'lucide-react';

const SubmitWorkModal = ({ trigger }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSubmitted, setIsSubmitted] = useState(false);
    // Initialize with the 3 exact files from the screenshot for perfect match
    const [files, setFiles] = useState([
        {
            id: '1',
            name: 'Look 1.png',
            size: 1363148, // ~1.3mb
            preview: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=200&h=200',
        },
        {
            id: '2',
            name: 'Look 2.png',
            size: 1363148, // ~1.3mb
            preview: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=200&h=200',
        },
        {
            id: '3',
            name: 'Look 3.png',
            size: 1363148, // ~1.3mb
            preview: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&q=80&w=200&h=200',
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
            fileInputRef.current.value = ''; // Reset input
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
        // Handle API submission here
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
                backdrop: "bg-[#1B2B36]/60 backdrop-blur-none", // Darkened semi-transparent overlay
                base: `bg-white rounded-[20px] md:rounded-[24px] mx-4 sm:mx-auto w-[90%] ${isSubmitted ? 'max-w-[460px]' : 'max-w-[850px]'} shadow-sm transition-all duration-300`,
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
                            <div className="pt-6 px-6 md:pt-10 md:px-10 pb-4 md:pb-6 relative w-full text-left">
                                {/* Close Button */}
                                <button 
                                    onClick={onClose}
                                    className="absolute top-6 right-6 md:top-8 md:right-10 text-[#999999] hover:text-gray-700 transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={20} strokeWidth={2} />
                                </button>

                                <h2 className="text-[18px] md:text-[22px] font-bold text-[#111111] uppercase tracking-wide">
                                    SUBMIT WORK
                                </h2>
                                <p className="text-[13px] md:text-[15px] font-normal text-[#767676] mt-2 max-w-[95%]">
                                    Upload your final files and add message to your client. Once submitted the client will be notified and have 3 days to review your work.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="w-full px-6 md:px-10">
                                <hr className="border-[#EAEAEC]" />
                            </div>
                        </ModalHeader>

                        {/* Body Content */}
                        <ModalBody className="px-6 md:px-10 pt-6 md:pt-8 pb-8 w-full">
                            
                            {/* File Upload Area */}
                            <div 
                                className={`w-full border border-[#E5E5E5] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors py-5 md:py-7 ${
                                    isDragging ? 'bg-gray-50 border-gray-400' : 'bg-white hover:bg-gray-50'
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
                                <CloudUpload className="w-6 h-6 md:w-9 md:h-9 text-[#888888] mb-3 md:mb-4" strokeWidth={1.5} />
                                <p className="text-[14px] md:text-[16px] font-semibold text-[#111111]">
                                    <span className="md:hidden">Upload File</span>
                                    <span className="hidden md:inline">Drag and drop file here or click to upload</span>
                                </p>
                                <p className="text-[12px] md:text-[13px] text-[#767676] mt-2 md:mt-2 mb-1 md:mb-0">
                                    <span className="md:hidden">Supports JPG,PNG,ZIP (200MB)</span>
                                    <span className="hidden md:inline">Supports JPG,PNG,PDF,ZIP (200MB)</span>
                                </p>
                            </div>

                            {/* Your Files Section */}
                            {files.length > 0 && (
                                <div className="mt-6 md:mt-8">
                                    <h3 className="text-[15px] md:text-[16px] font-bold text-[#111111] mb-3 md:mb-4">
                                        Your Files
                                    </h3>
                                    <div className="flex flex-row flex-nowrap overflow-x-auto scrollbar-hide gap-2 md:gap-4 pb-2">
                                        {files.map(file => (
                                            <div 
                                                key={file.id} 
                                                className="w-[90px] sm:w-[100px] md:w-[124px] border border-[#E5E5E5] rounded-xl p-[4px] md:p-[6px] bg-white flex flex-col relative shrink-0"
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFile(file.id);
                                                    }}
                                                    className="absolute top-[6px] right-[6px] md:top-[10px] md:right-[10px] w-5 h-5 bg-white rounded flex items-center justify-center shadow-sm z-10 border border-gray-100 hover:bg-gray-100"
                                                >
                                                    <X size={12} className="text-[#555555]" />
                                                </button>
                                                
                                                <div className="w-full h-[80px] sm:h-[90px] md:h-[110px] bg-[#F7F7F7] rounded-lg overflow-hidden flex items-center justify-center">
                                                    {file.preview ? (
                                                        <img 
                                                            src={file.preview} 
                                                            alt={file.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-[10px] md:text-xs text-gray-400 font-medium">{file.name.split('.').pop()?.toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div className="mt-1 md:mt-2 px-1 pb-1">
                                                    <p className="text-[11px] md:text-[13px] font-semibold text-[#111111] truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-[9px] md:text-[11px] text-[#767676] mt-[1px] md:mt-[2px]">
                                                        {formatSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Message to Client */}
                            <div className="mt-6 md:mt-8">
                                <h3 className="text-[15px] md:text-[16px] font-bold text-[#111111] mb-3 md:mb-4">
                                    Message to Client (Optional)
                                </h3>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Leave a message"
                                    className="w-full h-[100px] md:h-[120px] border border-[#E5E5E5] rounded-xl p-4 md:p-5 text-[14px] md:text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
                                />
                            </div>
                        </ModalBody>

                        {/* Submit Button */}
                        <ModalFooter className="px-6 md:px-10 pb-8 md:pb-12 pt-2 w-full flex justify-center">
                            <button
                                onClick={handleSubmit}
                                className="w-full md:w-[420px] h-[48px] md:h-[52px] bg-[#DDF4F8] hover:bg-[#cdecf3] text-[#005574] text-[14px] md:text-[15px] font-semibold rounded-full transition-colors flex items-center justify-center"
                            >
                                Submit Work
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
