'use client';

import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/store';

const REASONS = [
    "Client is asking for work not mentioned in the original brief.",
    "Client is requesting changes beyond our agreement",
    "Work was delivered, but the brand has ghosted the approval.",
    "The client has stopped responding for 48+ hours.",
    "Abusive or off-platform solicitation.",
    "Others"
];

export default function ReportDisputePage() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            reasons: [],
            comment: "",
            attachments: [],
            confirmation: false
        }
    });

    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);

    // Watch reasons to check if "Others" is selected
    const watchedReasons = watch("reasons");
    const isOthersSelected = watchedReasons?.includes("Others") || false;

    const router = useRouter();
    const searchParams = useSearchParams();
    const contractId = searchParams.get('contractId') || 'unknown';
    // Optionally grab reportDispute if it exists in the store
    const store = useAppStore();
    const reportDispute = store.reportDispute;

    const onSubmit = (data) => {
        // Handling form submission logic here
        console.log("Form Submitted", { ...data, files });
        if (reportDispute) {
            reportDispute(contractId);
        }
        window.location.href = '/artist-page/my-contracts?tab=ongoing';
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
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
                        Report Dispute
                    </h1>

                    {/* Intro Text */}
                    <div className="mb-5">
                        <p className="text-[#222222] font-semibold text-[14px]">
                            What's your reason for the report? You can select multiple answers.
                        </p>
                    </div>

                    {/* Reasons */}
                    <div className="flex flex-col gap-[18px] mb-[34px] pl-[2px]">
                        <Controller
                            name="reasons"
                            control={control}
                            rules={{ required: "Please select at least one reason." }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    {REASONS.map((reason) => (
                                        <div key={reason} className="flex items-center gap-[18px]">
                                            <Checkbox
                                                isSelected={value.includes(reason)}
                                                onValueChange={(isSelected) => {
                                                    if (isSelected) {
                                                        onChange([...value, reason]);
                                                    } else {
                                                        onChange(value.filter((v) => v !== reason));
                                                    }
                                                }}
                                                classNames={customCheckboxClass}
                                                radius="none"
                                                size="sm"
                                            />
                                            <span
                                                className="text-[#444444] text-[13px] cursor-pointer"
                                                onClick={() => {
                                                    const isSelected = value.includes(reason);
                                                    if (!isSelected) {
                                                        onChange([...value, reason]);
                                                    } else {
                                                        onChange(value.filter((v) => v !== reason));
                                                    }
                                                }}
                                            >
                                                {reason}
                                            </span>
                                        </div>
                                    ))}
                                </>
                            )}
                        />
                        {errors.reasons && (
                            <span className="text-red-500 text-xs mt-1">{errors.reasons.message}</span>
                        )}
                    </div>

                    {/* Dynamic Comment Field */}
                    <div className="mb-[30px] flex flex-col gap-[10px]">
                        <label htmlFor="comment" className="text-[#222222] text-[13.5px] font-medium w-fit">
                            {isOthersSelected ? "Reason" : "Additional comment"}
                        </label>
                        <Controller
                            name="comment"
                            control={control}
                            rules={{ required: isOthersSelected ? "Please provide a reason." : false }}
                            render={({ field }) => (
                                <textarea
                                    id="comment"
                                    {...field}
                                    className="w-full h-[120px] px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#035A7A] focus:border-[#035A7A] text-[13.5px] text-[#444444] resize-none bg-[#FAFAFA] placeholder:text-gray-400 placeholder:text-[13px]"
                                    placeholder="Comment"
                                />
                            )}
                        />
                        {errors.comment && (
                            <span className="text-red-500 text-xs mt-1">{errors.comment.message}</span>
                        )}
                    </div>

                    {/* Attach Files */}
                    <div className="mb-[40px] flex flex-col gap-[10px]">
                        <label className="text-[#222222] text-[13.5px] font-medium">
                            Attach File
                        </label>
                        <div
                            onDrop={handleFileDrop}
                            onDragOver={handleDragOver}
                            onClick={() => fileInputRef.current?.click()}
                            className="w-[225px] h-[115px] border-[1.5px] border-dashed border-gray-300 rounded-[8px] flex flex-col items-center justify-center bg-white cursor-pointer hover:border-[#035A7A] hover:bg-[#F3FBFE] transition-colors"
                        >
                            <p className="text-[11.5px] text-[#222222] pointer-events-none">
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
                            <div className="mt-2 flex flex-col gap-1 w-[225px]">
                                {files.map((file, i) => (
                                    <span key={i} className="text-[12px] text-[#035A7A] truncate max-w-full">
                                        {file.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="mb-[60px] pl-[2px]">
                        <Controller
                            name="confirmation"
                            control={control}
                            rules={{ required: "You must check this box to submit." }}
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
                                        I understand that Suuave Admin’s decision is final and that false reporting may lead to account suspension
                                    </label>
                                </div>
                            )}
                        />
                        {errors.confirmation && (
                            <p className="text-red-500 text-xs mt-3">{errors.confirmation.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end w-full">
                        <button
                            type="submit"
                            className="w-[110px] h-[48px] rounded-full border border-[#035A7A] text-[#111111] font-semibold text-[14px] hover:bg-[#F3FBFE] transition-colors flex items-center justify-center"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

