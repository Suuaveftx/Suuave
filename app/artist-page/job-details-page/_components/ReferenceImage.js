"use client";
import React from "react";
import { Paperclip } from "lucide-react";
import { useAppStore } from "@/store";

const ReferenceImage = ({ jobId }) => {
    const [hasReference, setHasReference] = React.useState(false);
    const [attachments, setAttachments] = React.useState([]);

    const { projects } = useAppStore();

    React.useEffect(() => {
        // Get the most recently posted project
        const postedProject = projects.length > 0 ? projects[projects.length - 1] : null;

        // Always show for job-0, using posted data if available, otherwise default
        if (jobId === 'job-0') {
            setHasReference(true);
            if (postedProject && postedProject.referenceImg) {
                setAttachments([
                    { name: postedProject.referenceImg, size: "N/A" }
                ]);
            } else {
                setAttachments([
                    { name: "Style-Reference.png", size: "2.4 MB" },
                    { name: "Moodboard_v2.pdf", size: "1.8 MB" }
                ]);
            }
        } else {
            setHasReference(false);
        }
    }, [jobId, projects]);

    if (!hasReference) return null;

    return (
        <>
            {/* Mobile View */}
            <div className="lg:hidden mt-4">
                <h4 className="font-bold text-[15px] text-[#2E2E2E] mb-3">Reference Image</h4>
                <div className="bg-white rounded-[18px] p-5 border border-[#ECECEC] shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4">
                    <div className="space-y-4">
                        {attachments.map((file, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="bg-[#E7F3F8] p-2.5 rounded-xl">
                                    <Paperclip className="w-5 h-5 text-[#146C94]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-medium text-[#2E2E2E]">{file.name}</span>
                                    <span className="text-[13px] text-[#757575]">{file.size}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block w-full bg-[#FAFAFA] border border-[#EAEAEA] px-8 py-6 mt-4 rounded-2xl">
                <h4 className="font-bold text-[22px] text-[#222222] mb-4">Reference Image</h4>
                <div className="mt-4">
                    <div className="flex gap-6">
                        {attachments.map((file, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#EAEAEA] min-w-[240px]">
                                <div className="bg-[#CCE7F2] p-3 rounded-xl">
                                    <Paperclip className="w-6 h-6 text-[#035A7A]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-medium text-[#222222]">{file.name}</span>
                                    <span className="text-sm text-[#767676]">{file.size}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReferenceImage;
