'use client';

import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';

const ISSUES = [
    "Incorrect amount charged",
    "Delayed or pending transaction status",
    "Suspicious or unrecognised transaction",
    "Project/Payout mismatch",
    "Others"
];

export default function TransactionResolutionPage() {
    const { control, handleSubmit, watch, register, formState: { errors } } = useForm({
        defaultValues: {
            transactionId: "",
            issues: [],
            reason: "",
            acknowledgement: false
        }
    });

    const { isOpen: isSuccessOpen, onOpen: onSuccessOpen, onOpenChange: onSuccessOpenChange } = useDisclosure();

    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const watchedIssues = watch("issues");
    const isOthersSelected = watchedIssues?.includes("Others") || false;

    const router = useRouter();

    const onSubmit = (data) => {
        console.log("Transaction Resolution Submitted", { ...data, files });
        onSuccessOpen();
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles([...files, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const customCheckboxClass = {
        wrapper: "w-[16px] h-[16px] rounded-[2px] border border-gray-300 before:border-transparent after:bg-[#035A7A] group-data-[selected=true]:border-[#035A7A] text-white",
        base: "p-0 m-0 w-[16px] h-[16px]",
        icon: "text-white w-3 h-3"
    };

    return (
        <div className="w-full flex justify-center pb-24 pt-[80px]">
            <div className="w-full max-w-[680px] px-4 md:px-0">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[24px] px-6 sm:px-10 py-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                    {/* Header */}
                    <h1 className="text-center text-[24px] font-bold text-[#222222] mb-[32px]">
                        Transaction Resolution
                    </h1>

                    {/* Intro Text */}
                    <div className="mb-5">
                        <p className="text-[#222222] font-semibold text-[14px]">
                            What's your reason for the report? You can select multiple answers.
                        </p>
                    </div>

                    {/* Transaction ID */}
                    <div className="mb-[22px] flex flex-col gap-[8px]">
                        <label htmlFor="transactionId" className="text-[#222222] text-[13.5px] font-medium">
                            Transaction ID
                        </label>
                        <input
                            id="transactionId"
                            {...register("transactionId", { required: "Transaction ID is required." })}
                            className="w-full h-[38px] px-4 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#035A7A] focus:border-[#035A7A] text-[13.5px] text-[#444444] bg-white placeholder:text-gray-400 placeholder:text-[13px]"
                            placeholder="Enter Transaction ID"
                        />
                        {errors.transactionId && (
                            <span className="text-red-500 text-xs">{errors.transactionId.message}</span>
                        )}
                    </div>

                    {/* Issue Checkboxes */}
                    <div className="flex flex-col gap-[18px] mb-[26px] pl-[2px]">
                        <Controller
                            name="issues"
                            control={control}
                            rules={{ required: "Please select at least one issue." }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    {ISSUES.map((issue) => (
                                        <div key={issue} className="flex items-center gap-[18px]">
                                            <Checkbox
                                                isSelected={value.includes(issue)}
                                                onValueChange={(isSelected) => {
                                                    if (isSelected) {
                                                        onChange([...value, issue]);
                                                    } else {
                                                        onChange(value.filter((v) => v !== issue));
                                                    }
                                                }}
                                                classNames={customCheckboxClass}
                                                radius="none"
                                                size="sm"
                                            />
                                            <span
                                                className="text-[#444444] text-[13px] cursor-pointer"
                                                onClick={() => {
                                                    const isSelected = value.includes(issue);
                                                    if (!isSelected) {
                                                        onChange([...value, issue]);
                                                    } else {
                                                        onChange(value.filter((v) => v !== issue));
                                                    }
                                                }}
                                            >
                                                {issue}
                                            </span>
                                        </div>
                                    ))}
                                </>
                            )}
                        />
                        {errors.issues && (
                            <span className="text-red-500 text-xs mt-1">{errors.issues.message}</span>
                        )}
                    </div>

                    {/* Reason Textarea */}
                    <div className="mb-[26px] flex flex-col gap-[10px]">
                        <label htmlFor="reason" className="text-[#222222] text-[13.5px] font-medium w-fit">
                            {isOthersSelected ? "Reason" : "Additional comment"}
                        </label>
                        <Controller
                            name="reason"
                            control={control}
                            rules={{ required: isOthersSelected ? "Please provide a reason." : false }}
                            render={({ field }) => (
                                <textarea
                                    id="reason"
                                    {...field}
                                    className="w-full h-[80px] px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#035A7A] focus:border-[#035A7A] text-[13.5px] text-[#444444] resize-none bg-[#FAFAFA] placeholder:text-gray-400 placeholder:text-[13px]"
                                    placeholder="Comment"
                                />
                            )}
                        />
                        {errors.reason && (
                            <span className="text-red-500 text-xs mt-1">{errors.reason.message}</span>
                        )}
                    </div>

                    {/* File Upload */}
                    <div className="mb-[36px] flex flex-col gap-[10px]">
                        <label className="text-[#222222] text-[13.5px] font-medium">
                            Provide relevant proof, such as receipts or bank alert screenshots.
                        </label>
                        <div
                            onDrop={handleFileDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-[230px] h-[130px] border-[1.5px] border-dashed rounded-[8px] flex flex-col items-center justify-center bg-white cursor-pointer transition-colors ${isDragging
                                ? 'border-[#035A7A] bg-[#F3FBFE]'
                                : 'border-gray-300 hover:border-[#035A7A] hover:bg-[#F3FBFE]'
                                }`}
                        >
                            <p className="text-[11.5px] text-[#222222] pointer-events-none text-center px-4">
                                Drop file or <span className="underline decoration-gray-400">click here</span> to select file
                            </p>
                            <input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                        {files.length > 0 && (
                            <div className="mt-1 flex flex-col gap-1 w-[230px]">
                                {files.map((file, i) => (
                                    <span key={i} className="text-[12px] text-[#035A7A] truncate max-w-full">
                                        {file.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Acknowledgement Checkbox */}
                    <div className="mb-[60px] pl-[2px]">
                        <Controller
                            name="acknowledgement"
                            control={control}
                            rules={{ required: "You must acknowledge this to submit." }}
                            render={({ field: { onChange, value } }) => (
                                <div className="flex items-start gap-[16px]">
                                    <div className="pt-[4px]">
                                        <Checkbox
                                            isSelected={value}
                                            onValueChange={onChange}
                                            classNames={customCheckboxClass}
                                            radius="none"
                                            size="sm"
                                        />
                                    </div>
                                    <label
                                        onClick={() => onChange(!value)}
                                        className="text-[#444444] text-[13px] leading-[1.6] cursor-pointer select-none"
                                    >
                                        I acknowledge that submitting false transaction reports may lead to account suspension.
                                    </label>
                                </div>
                            )}
                        />
                        {errors.acknowledgement && (
                            <p className="text-red-500 text-xs mt-3">{errors.acknowledgement.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end w-full">
                        <button
                            type="submit"
                            className="w-[115px] h-[48px] rounded-full border border-[#035A7A] text-[#111111] font-semibold text-[14px] hover:bg-[#F3FBFE] transition-colors flex items-center justify-center"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            <Modal
                isOpen={isSuccessOpen}
                onOpenChange={onSuccessOpenChange}
                classNames={{
                    base: 'bg-white w-[90vw] max-w-sm',
                    backdrop: 'bg-black/50',
                    body: 'py-8 px-6',
                    footer: 'pt-2 pb-6 px-6 border-t-0',
                }}
                size='sm'
                backdrop='blur'
                hideCloseButton
                placement='center'
                isDismissable={false}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="text-center">
                                    <div className="text-5xl mb-4">✅</div>
                                    <h3 className="text-[20px] font-bold text-[#222222] mb-2 font-satoshi">Report Received</h3>
                                    <p className="text-sm font-satoshi leading-relaxed text-gray-600">
                                        Your transaction report has been received. Our team will review it and get back to you shortly.
                                    </p>
                                </div>
                            </ModalBody>
                            <ModalFooter className='w-full flex justify-center font-satoshi'>
                                <Button
                                    className='w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full border-0 shadow-sm'
                                    radius='full'
                                    size='md'
                                    onPress={() => {
                                        onClose();
                                        window.location.href = '/fashion-designers/transactions';
                                    }}
                                >
                                    Back to Transaction History
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
